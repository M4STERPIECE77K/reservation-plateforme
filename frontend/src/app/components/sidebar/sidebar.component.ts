import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<string>();
  @Output() logoutEvent = new EventEmitter<void>();

  onNavigate(route: string) {
    this.navigate.emit(route);
  }

  onLogout() {
    this.logoutEvent.emit();
  }
}
