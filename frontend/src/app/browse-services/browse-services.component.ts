import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServicesService, ServiceItem } from '../services/services.service';
import { ToastService } from '../services/toast.service';

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
    private toastService = inject(ToastService);

    // Utilisation de Signals pour une gestion d'état fluide
    services = signal<ServiceItem[]>([]);
    activeCategory = signal<string>('Tous les Services');

    // Filtrage réactif automatique grâce à computed
    filteredServices = computed(() => {
        const s = this.services();
        const cat = this.activeCategory();
        
        if (cat === 'Tous les Services') {
            return s;
        }
        return s.filter(service => service.category?.toLowerCase() === cat.toLowerCase());
    });

    categories = [
        'Tous les Services',
        'Beauté',
        'Santé',
        'Automobile',
        'Bien-être',
        'Maison'
    ];

    ngOnInit() {
        this.servicesService.getServices().subscribe({
            next: (data) => {
                this.services.set(data);
            },
            error: (err) => {
                this.toastService.error("Erreur lors du chargement des services");
            }
        });
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
        this.activeCategory.set(category);
    }
}
