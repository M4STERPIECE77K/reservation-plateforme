import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  onNavigate(route: string) {
    console.log('Navigating to:', route);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

