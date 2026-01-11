package com.reservationmanagement.backend.dto;

import com.reservationmanagement.backend.entity.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private Long paymentId;
    private String transactionId;
    private PaymentStatus status;
    private String message;
    private String redirectUrl; // Pour Stripe checkout
    private String clientSecret; // Pour Stripe Payment Intent
}
