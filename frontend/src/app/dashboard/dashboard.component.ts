import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  userName = 'User';
  userEmail = '';
  user: any = null;

  ngOnInit() {
    this.user = this.authService.getUserDetails();
    if (this.user) {
      this.userName = this.user.firstName || 'User';
      this.userEmail = this.user.sub || '';
    }
  }

  stats = [
    {
      label: 'À venir',
      value: '3',
      unit: 'rendez-vous',
      icon: 'event',
      iconColor: 'text-primary'
    },
    {
      label: 'Total réservations',
      value: '12',
      unit: 'historique',
      icon: 'history',
      iconColor: 'text-purple-600'
    },
    {
      label: 'Points fidélité',
      value: '450',
      unit: 'pts disponibles',
      icon: 'loyalty',
      iconColor: 'text-green-600'
    }
  ];

  upcomingReservations = [
    {
      id: 1,
      provider: 'Dr. Emilie Stone',
      service: 'Dermatologue',
      icon: 'medical_services',
      iconBg: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-primary',
      serviceIcon: 'stethoscope',
      dateTime: '24 Sept, 10:00',
      status: 'Confirmé',
      statusClass: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400',
      statusDot: 'bg-green-500'
    },
    {
      id: 2,
      provider: 'Garage Prestige Auto',
      service: 'Vidange',
      icon: 'car_repair',
      iconBg: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600',
      serviceIcon: 'oil_barrel',
      dateTime: '02 Oct, 14:00',
      status: 'En attente',
      statusClass: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30 text-orange-700 dark:text-orange-400',
      statusDot: 'bg-orange-500'
    }
  ];

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

