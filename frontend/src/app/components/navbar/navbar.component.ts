import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Input() pageTitle = 'Dashboard';
    @Input() searchPlaceholder = 'Search services, providers...';

    public themeService = inject(ThemeService);

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
