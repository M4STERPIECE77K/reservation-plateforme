import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ServicesService, ServiceItem } from '../services/services.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-service-detail',
    standalone: true,
    imports: [CommonModule, SidebarComponent, NavbarComponent, RouterModule],
    templateUrl: './service-detail.component.html'
})
export class ServiceDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private servicesService = inject(ServicesService);
    private authService = inject(AuthService);

    service?: ServiceItem;

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.service = this.servicesService.getServiceById(id);
            if (!this.service) {
                this.router.navigate(['/services']);
            }
        });
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
}
