import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowseServicesComponent } from './browse-services/browse-services.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'app', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'services', component: BrowseServicesComponent, canActivate: [authGuard] },
  { path: 'services/:id', component: ServiceDetailComponent, canActivate: [authGuard] },
  { path: 'bookings', component: MyReservationsComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
