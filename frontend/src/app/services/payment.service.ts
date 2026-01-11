import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceItem } from './services.service';

export interface PaymentRequest {
    serviceId: number;
    amount: number;
    currency: string;
    paymentMethod: 'ORANGE_MONEY' | 'STRIPE';
    phoneNumber?: string;
    stripeToken?: string;
    cardholderName?: string;
}

export interface PaymentResponse {
    paymentId: number;
    transactionId: string;
    status: string;
    message: string;
    redirectUrl?: string;
    clientSecret?: string;
}

export interface Payment {
    id: number;
    service: ServiceItem;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
    transactionId: string;
    createdAt: string;
    completedAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:9090/api/v1/payments';

    initiatePayment(request: PaymentRequest): Observable<PaymentResponse> {
        return this.http.post<PaymentResponse>(`${this.apiUrl}/initiate`, request);
    }

    getPaymentHistory(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${this.apiUrl}/history`);
    }

    getPayment(paymentId: number): Observable<Payment> {
        return this.http.get<Payment>(`${this.apiUrl}/${paymentId}`);
    }
}
