import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServicesService, ServiceItem } from '../services/services.service';

@Component({
    selector: 'app-browse-services',
    standalone: true,
    imports: [CommonModule, SidebarComponent, NavbarComponent, RouterModule],
    templateUrl: './browse-services.component.html'
})
export class BrowseServicesComponent implements OnInit {
    private router = inject(Router);
    private authService = inject(AuthService);
    private servicesService = inject(ServicesService);

    activeCategory = 'All Services';
    services: ServiceItem[] = [];

    categories = [
        'All Services',
        'Beauty',
        'Health',
        'Automotive',
        'Wellness',
        'Home'
    ];

    ngOnInit() {
        this.services = this.servicesService.getServices();
    }

    get filteredServices() {
        if (this.activeCategory === 'All Services') {
            return this.services;
        }
        return this.services.filter(s => s.category === this.activeCategory);
    }

    viewServiceDetail(id: number) {
        this.router.navigate(['/services', id]);
    }

    onNavigate(route: string) {
        if (route === 'dashboard') {
            this.router.navigate(['/app']);
        } else if (route === 'services') {
            this.router.navigate(['/services']);
        }
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    setActiveCategory(category: string) {
        this.activeCategory = category;
    }
}
