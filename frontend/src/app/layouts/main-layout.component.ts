import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, DashboardComponent],
  template: `
    <div class="min-h-screen flex">
      <app-sidebar></app-sidebar>
      <div class="flex-1 flex flex-col">
        <app-dashboard></app-dashboard>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class MainLayoutComponent {}

