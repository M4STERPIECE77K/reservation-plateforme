import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
    token: string;
}

import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8089/api/v1/auth';

    login(credentials: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('auth_token', response.token);
                }
            })
        );
    }

    register(userData: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData);
    }

    logout() {
        localStorage.removeItem('auth_token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    getUserDetails(): any {
        const token = this.getToken();
        if (token) {
            try {
                return jwtDecode(token);
            } catch (e) {
                return null;
            }
        }
        return null;
    }
}
