import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastComponent],
  template: `
    <app-toast></app-toast>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend');
}
