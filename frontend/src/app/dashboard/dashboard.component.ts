import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold">Dashboard</h2>
      <p class="text-sm text-slate-600">Bienvenue sur le dashboard.</p>
    </div>
  `
})
export class DashboardComponent {}

