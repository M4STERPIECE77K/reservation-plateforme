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
        profileImageUrl: ''
    };

    selectedFile: File | null = null;

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.userProfile.profileImageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

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
    }

    onSave() {
        console.log('Saving profile:', this.userProfile);

        if (this.selectedFile) {
            this.toast.info('Téléchargement de l\'image...');
            this.userService.uploadProfileImage(this.selectedFile).subscribe({
                next: (imageUrl) => {
                    this.userProfile.profileImageUrl = imageUrl;
                    this.authService.updateProfileImage(imageUrl);
                    this.toast.success('Profil enregistré avec succès');
                    this.selectedFile = null;
                },
                error: (err) => {
                    console.error('Upload failed', err);
                    this.toast.error('Échec du téléchargement de l\'image. Veuillez réessayer.');
                }
            });
        } else {
            this.toast.success('Profil enregistré avec succès');
        }
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
