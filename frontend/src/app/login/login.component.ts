import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  authMode: 'signin' | 'signup' = 'signin';
  showPassword = false;
  isLoading = false;

  model = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  toggleAuthMode(mode: 'signin' | 'signup') {
    this.authMode = mode;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isLoading = true;
    this.cdr.detectChanges();

    const obs = this.authMode === 'signin'
      ? this.authService.login({ email: this.model.email, password: this.model.password })
      : this.authService.register(this.model);

    obs.subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;
        this.cdr.detectChanges();

        if (this.authMode === 'signup') {
          this.toast.success('Compte créé avec succès ! Connectez-vous maintenant.');
          this.authMode = 'signin';
          this.model.password = '';
        } else {
          this.toast.success('Connexion réussie !');
          this.router.navigate(['/app']);
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        const msg = err?.error?.message || (this.authMode === 'signin' ? 'Échec de la connexion' : 'Erreur lors de la création du compte');
        this.toast.error(msg);
        console.error('Auth error:', err);
      }
    });
  }
}
