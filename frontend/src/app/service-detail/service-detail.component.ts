import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ServicesService, ServiceItem } from '../services/services.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-service-detail',
    standalone: true,
    imports: [CommonModule, SidebarComponent, NavbarComponent, RouterModule],
    templateUrl: './service-detail.component.html'
})
export class ServiceDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private servicesService = inject(ServicesService);
    private authService = inject(AuthService);
    private toastService = inject(ToastService);

    // Utilisation d'un signal pour le service
    service = signal<ServiceItem | undefined>(undefined);
    
    // État pour savoir si on est en train de réserver
    isBooking = signal<boolean>(false);
    
    // Date actuelle et calendrier
    currentDate = new Date();
    currentMonth = signal<Date>(new Date());
    
    // États pour la sélection
    selectedDate = signal<Date | null>(null);
    selectedTime = signal<string>('11:30');

    // Computed pour le mois et l'année affichés
    displayMonth = computed(() => {
        const date = this.currentMonth();
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    });

    // Computed pour vérifier si la date sélectionnée est un dimanche
    isSelectedDateSunday = computed(() => {
        const date = this.selectedDate();
        return date ? date.getDay() === 0 : false;
    });

    // Computed pour générer les jours du calendrier (toutes les semaines du mois)
    calendarDays = computed(() => {
        const date = this.currentMonth();
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDayOfWeek = firstDay.getDay(); // 0 = dimanche, 1 = lundi, etc.
        
        const days: Date[] = [];
        
        // Ajouter les jours du mois précédent (pour compléter la première semaine)
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push(new Date(year, month - 1, daysInPrevMonth - i));
        }
        
        // Ajouter les jours du mois actuel
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }
        
        // Ajouter les jours du mois suivant (pour compléter la dernière semaine)
        const totalCells = 42; // 6 semaines * 7 jours
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

    confirmBooking() {
        this.toastService.success("Réservation effectuée avec succès ! (Simulation)");
        this.isBooking.set(false);
    }

    onNavigate(route: string) {
        if (route === 'dashboard') {
            this.router.navigate(['/app']);
        } else if (route === 'services') {
            this.router.navigate(['/services']);
        }
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}