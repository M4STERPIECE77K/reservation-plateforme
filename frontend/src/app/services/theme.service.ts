import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkMode = signal<boolean>(this.getInitialTheme());

    isDarkMode = this.darkMode.asReadonly();

    constructor() {
        this.applyTheme();
    }

    toggleTheme() {
        this.darkMode.set(!this.darkMode());
        this.applyTheme();
        localStorage.setItem('theme', this.darkMode() ? 'dark' : 'light');
    }

    private applyTheme() {
        if (this.darkMode()) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    private getInitialTheme(): boolean {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
