import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();
  @Output() logoutEvent = new EventEmitter<void>();

  private authService = inject(AuthService);

  isDropdownOpen = false;
  isLogoutModalOpen = false;

  userName = 'Profil Utilisateur';
  userEmail = 'utilisateur@exemple.com';
  userProfileImage = '';

  ngOnInit() {
    const user = this.authService.getUserDetails();
    if (user) {
      this.userName = user.firstName || 'Profil Utilisateur';
      this.userEmail = user.sub || '';
      this.userProfileImage = user.profileImageUrl || '';
    }

    this.authService.profileImage$.subscribe(url => {
      this.userProfileImage = url;
    });
  }

  onNavigate(route: string) {
    this.navigate.emit(route);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  openLogoutModal() {
    this.isDropdownOpen = false;
    this.isLogoutModalOpen = true;
  }

  closeLogoutModal() {
    this.isLogoutModalOpen = false;
  }

  confirmLogout() {
    this.isLogoutModalOpen = false;
    this.logoutEvent.emit();
  }
}
