import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private router = inject(Router);

  model = {
    email: '',
    password: ''
  };

  loading = false;
  error = '';

  async onSubmit() {
    this.error = '';
    if (!this.model.email || !this.model.password) {
      this.error = 'Veuillez remplir l\'email et le mot de passe.';
      return;
    }

    this.loading = true;
    await new Promise((r) => setTimeout(r, 700));
    this.loading = false;
    this.router.navigate(['/app']);
  }
}

