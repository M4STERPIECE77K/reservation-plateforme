package com.reservationmanagement.backend.dto;

import com.reservationmanagement.backend.entity.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    private Long serviceId;
    private Double amount;
    private String currency;
    private PaymentMethod paymentMethod;

    // Pour Orange Money
    private String phoneNumber;

    // Pour Stripe
    private String stripeToken;
    private String cardholderName;
}
