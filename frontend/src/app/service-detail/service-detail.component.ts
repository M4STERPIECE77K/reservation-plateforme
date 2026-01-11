import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ServicesService, ServiceItem } from '../services/services.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { PaymentService, PaymentRequest } from '../services/payment.service';

@Component({
    selector: 'app-service-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, NavbarComponent],
    templateUrl: './service-detail.component.html'
})
export class ServiceDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private servicesService = inject(ServicesService);
    private authService = inject(AuthService);
    private toastService = inject(ToastService);
    private paymentService = inject(PaymentService);
    service = signal<ServiceItem | undefined>(undefined);    
    isBooking = signal<boolean>(false);
    isPayment = signal<boolean>(false);
    currentDate = new Date();
    currentMonth = signal<Date>(new Date());    
    selectedDate = signal<Date | null>(null);
    selectedTime = signal<string>('11:30');
    selectedPaymentMethod = signal<'ORANGE_MONEY' | 'STRIPE'>('ORANGE_MONEY');
    phoneNumber = '';
    cardholderName = '';
    cardNumber = '';
    expiryDate = '';
    cvv = '';
    showStripeCardForm = signal<boolean>(false);
    isProcessing = signal<boolean>(false);

    displayMonth = computed(() => {
        const date = this.currentMonth();
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    });

    isSelectedDateSunday = computed(() => {
        const date = this.selectedDate();
        return date ? date.getDay() === 0 : false;
    });

    calendarDays = computed(() => {
        const date = this.currentMonth();
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDayOfWeek = firstDay.getDay();
        
        const days: Date[] = [];
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push(new Date(year, month - 1, daysInPrevMonth - i));
        }        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }        
        const totalCells = 42;
        const remainingCells = totalCells - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push(new Date(year, month + 1, i));
        }
        
        return days;
    });

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
                this.loadService(id);
            } else {
                this.toastService.error("ID de service invalide");
                this.router.navigate(['/services']);
            }
        });
    }

    private loadService(id: number) {
        this.servicesService.getServiceById(id).subscribe({
            next: (data) => {
                this.service.set(data);
            },
            error: (err) => {
                this.toastService.error("Impossible de charger les détails du service");
                this.router.navigate(['/services']);
            }
        });
    }

    toggleBooking() {
        this.isBooking.set(!this.isBooking());
        if (!this.isBooking()) {
            this.isPayment.set(false);
        }
    }

    confirmBooking() {
        if (!this.selectedDate()) {
            this.toastService.error("Veuillez sélectionner une date");
            return;
        }
        if (!this.selectedTime()) {
            this.toastService.error("Veuillez sélectionner un horaire");
            return;
        }
        this.isBooking.set(false);
        this.isPayment.set(true);
    }

    previousMonth() {
        const current = this.currentMonth();
        this.currentMonth.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
    }

    nextMonth() {
        const current = this.currentMonth();
        this.currentMonth.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
    }

    selectDate(date: Date) {
        if (date && this.isDateSelectable(date)) {
            this.selectedDate.set(date);
        }
    }

    isDateSelectable(date: Date): boolean {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const checkDate = new Date(date);
        const dateMonth = checkDate.getMonth();
        const dateYear = checkDate.getFullYear();
        if (dateYear > currentYear) return true;
        if (dateYear === currentYear && dateMonth >= currentMonth) return true;
        
        return false;
    }

    isDateSelected(date: Date): boolean {
        if (!date || !this.selectedDate()) return false;
        const selected = this.selectedDate()!;
        return date.getDate() === selected.getDate() &&
               date.getMonth() === selected.getMonth() &&
               date.getFullYear() === selected.getFullYear();
    }

    isCurrentMonth(date: Date): boolean {
        const current = this.currentMonth();
        return date.getMonth() === current.getMonth() && 
               date.getFullYear() === current.getFullYear();
    }

    selectTime(time: string) {
        this.selectedTime.set(time);
    }

    selectPaymentMethod(method: 'ORANGE_MONEY' | 'STRIPE') {
        if (this.selectedPaymentMethod() !== method) {
            this.selectedPaymentMethod.set(method);
            this.showStripeCardForm.set(false);
        }
    }

    processPayment(event?: Event) {
        // Empêcher le comportement par défaut si un événement est fourni
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        const service = this.service();
        if (!service || !this.selectedDate()) return;

        if (this.selectedPaymentMethod() === 'ORANGE_MONEY' && !this.phoneNumber) {
            this.toastService.error("Veuillez entrer votre numéro Orange Money");
            return;
        }

        if (this.selectedPaymentMethod() === 'STRIPE') {
            if (!this.cardholderName) {
                this.toastService.error("Veuillez entrer le nom du titulaire de la carte");
                return;
            }
            if (!this.showStripeCardForm()) {
                this.showStripeCardForm.set(true);
                return;
            }
            if (!this.cardNumber || !this.expiryDate || !this.cvv) {
                this.toastService.error("Veuillez remplir toutes les informations de la carte");
                return;
            }
        }

        this.isProcessing.set(true);
        const priceStr = service.price.replace(/[^\d]/g, '');
        const amount = parseFloat(priceStr);

        const request: PaymentRequest = {
            serviceId: service.id,
            amount: amount,
            currency: 'MGA',
            paymentMethod: this.selectedPaymentMethod(),
            phoneNumber: this.selectedPaymentMethod() === 'ORANGE_MONEY' ? this.phoneNumber : undefined,
            cardholderName: this.selectedPaymentMethod() === 'STRIPE' ? this.cardholderName : undefined
        };

        this.paymentService.initiatePayment(request).subscribe({
            next: (response) => {
                this.isProcessing.set(false);
                
                if (response.status === 'PENDING' || response.status === 'COMPLETED') {
                    this.toastService.success(response.message);
                    setTimeout(() => {
                        this.router.navigate(['/bookings'], {
                            state: { payment: response }
                        });
                    }, 2000);
                } else {
                    this.toastService.error(response.message);
                }
            },
            error: (err) => {
                this.isProcessing.set(false);
                this.toastService.error("Erreur lors du paiement: " + (err.error?.message || err.message));
            }
        });
    }

    cancelPayment() {
        this.isPayment.set(false);
        this.isBooking.set(true);
        this.showStripeCardForm.set(false);
    }

    onNavigate(route: string) {
        if (route === 'dashboard') {
            this.router.navigate(['/app']);
        } else if (route === 'services') {
            this.router.navigate(['/services']);
        } else if (route === 'bookings') {
            this.router.navigate(['/bookings']);
        }
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}