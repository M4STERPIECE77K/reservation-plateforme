import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PaymentService, Payment } from '../services/payment.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, RouterModule],
  templateUrl: './my-reservations.component.html'
})
export class MyReservationsComponent implements OnInit {
  private paymentService = inject(PaymentService);
  private authService = inject(AuthService);
  private router = inject(Router);

  reservations = signal<Payment[]>([]);
  isLoading = signal<boolean>(true);
  currentTab = signal<'UPCOMING' | 'PENDING' | 'HISTORY'>('UPCOMING');
  
  // Pagination
  currentPage = signal<number>(1);
  pageSize = 5;

  filteredReservations = computed(() => {
    const all = this.reservations();
    const tab = this.currentTab();
    
    let filtered = [];
    if (tab === 'UPCOMING') {
      filtered = all.filter(r => r.status === 'COMPLETED');
    } else if (tab === 'PENDING') {
      filtered = all.filter(r => r.status === 'PENDING');
    } else {
      filtered = all.filter(r => r.status === 'FAILED' || r.status === 'REFUNDED');
    }
    return filtered;
  });

  paginatedReservations = computed(() => {
    const filtered = this.filteredReservations();
    const start = (this.currentPage() - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredReservations().length / this.pageSize);
  });

  upcomingCount = computed(() => {
    return this.reservations().filter(r => r.status === 'COMPLETED').length;
  });

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.isLoading.set(true);
    this.paymentService.getPaymentHistory().subscribe({
      next: (data) => {
        const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.reservations.set(sorted);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading reservations', err);
        this.isLoading.set(false);
      }
    });
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  changeTab(tab: 'UPCOMING' | 'PENDING' | 'HISTORY') {
    this.currentTab.set(tab);
    this.currentPage.set(1);
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
