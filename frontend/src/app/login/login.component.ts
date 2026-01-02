import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authMode: 'signin' | 'signup' = 'signin';
  showPassword = false;

  model = {
    email: '',
    password: ''
  };

  toggleAuthMode(mode: 'signin' | 'signup') {
    this.authMode = mode;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('Form submitted:', this.authMode, this.model);
  }
}
