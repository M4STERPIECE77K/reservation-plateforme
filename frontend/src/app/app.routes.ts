import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'app', component: MainLayoutComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
