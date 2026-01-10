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
    @Input() pageTitle = 'Tableau de Bord';
    @Input() searchPlaceholder = 'Rechercher des services, prestataires...';

    public themeService = inject(ThemeService);

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
