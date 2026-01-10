import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem {
    id: number;
    title: string;
    category: string;
    description: string;
    fullDescription?: string;
    duration: string;
    price: string;
    popular: boolean;
    image: string;
    gallery?: string[];
    rating?: number;
    reviews?: number;
    location?: string;
    providerName?: string;
    isVerified?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:9090/api/v1/services';

    getServices(): Observable<ServiceItem[]> {
        return this.http.get<ServiceItem[]>(this.apiUrl);
    }

    getServiceById(id: number): Observable<ServiceItem> {
        return this.http.get<ServiceItem>(`${this.apiUrl}/${id}`);
    }
}
