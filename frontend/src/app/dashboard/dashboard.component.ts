import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  userName = 'Sarah';
  userEmail = 'sarah.j@example.com';

  stats = [
    {
      label: 'Upcoming',
      value: '3',
      unit: 'appointments',
      icon: 'event',
      iconColor: 'text-primary'
    },
    {
      label: 'Total Bookings',
      value: '12',
      unit: 'lifetime',
      icon: 'history',
      iconColor: 'text-purple-600'
    },
    {
      label: 'Loyalty Points',
      value: '450',
      unit: 'pts available',
      icon: 'loyalty',
      iconColor: 'text-green-600'
    }
  ];

  upcomingReservations = [
    {
      id: 1,
      provider: 'Dr. Emily Stone',
      service: 'Dermatologist',
      icon: 'medical_services',
      iconBg: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-primary',
      serviceIcon: 'stethoscope',
      dateTime: 'Sept 24, 10:00 AM',
      status: 'Confirmed',
      statusClass: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400',
      statusDot: 'bg-green-500'
    },
    {
      id: 2,
      provider: 'Prestige Auto Garage',
      service: 'Oil Change',
      icon: 'car_repair',
      iconBg: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600',
      serviceIcon: 'oil_barrel',
      dateTime: 'Oct 02, 2:00 PM',
      status: 'Pending',
      statusClass: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30 text-orange-700 dark:text-orange-400',
      statusDot: 'bg-orange-500'
    }
  ];

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

