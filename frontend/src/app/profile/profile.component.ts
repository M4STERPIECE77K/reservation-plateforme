import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent, NavbarComponent],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    private authService = inject(AuthService);
    private userService = inject(UserService);
    private router = inject(Router);
    private toast = inject(ToastService);

    userProfile = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profileImageUrl: '',
        language: 'Français'
    };

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.userProfile.profileImageUrl = e.target.result;
            };
            reader.readAsDataURL(file);

            this.toast.info('Uploading image...');
            this.userService.uploadProfileImage(file).subscribe({
                next: (imageUrl) => {
                    this.userProfile.profileImageUrl = imageUrl;
                    this.toast.success('Profile image updated successfully');
                },
                error: (err) => {
                    console.error('Upload failed', err);
                    this.toast.error('Failed to upload image. Please try again.');
                }
            });
        }
    }

    languages = ['Français', 'English'];

    ngOnInit() {
        const user = this.authService.getUserDetails();
        console.log('Current User Details from JWT:', user);
        console.log('Token claims keys:', user ? Object.keys(user) : 'No user');
        if (user) {
            this.userProfile.email = user.sub || '';
            this.userProfile.firstName = user.firstName || '';
            this.userProfile.lastName = user.lastName || '';
            this.userProfile.phone = user.phoneNumber || '';
            this.userProfile.profileImageUrl = user.profileImageUrl || '';

            if (!this.userProfile.firstName || !this.userProfile.lastName) {
                console.warn('User profile data missing in token. Claims found:', Object.keys(user));
                this.toast.warning('Certaines informations sont manquantes. Veuillez vous reconnecter.');
            }
        }
        const savedLang = localStorage.getItem('app_language');
        if (savedLang) {
            this.userProfile.language = savedLang;
        }
    }

    onSave() {
        console.log('Saving profile:', this.userProfile);
        localStorage.setItem('app_language', this.userProfile.language);
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
