package com.reservationmanagement.backend.service;

import com.reservationmanagement.backend.dto.PaymentRequest;
import com.reservationmanagement.backend.dto.PaymentResponse;
import com.reservationmanagement.backend.entity.Payment;
import com.reservationmanagement.backend.entity.PaymentStatus;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Slf4j
@Service
public class StripePaymentService {

    @Value("${stripe.api.key:sk_test_YOUR_STRIPE_SECRET_KEY}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public PaymentResponse initiatePayment(PaymentRequest request, Payment payment) {
        try {
            log.info("Initiating Stripe payment for amount: {} MGA", request.getAmount());

            long amountInCents = request.getAmount().longValue();
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("mga")
                    .setDescription("Paiement pour service #" + request.getServiceId())
                    .putMetadata("service_id", String.valueOf(request.getServiceId()))
                    .putMetadata("payment_id", String.valueOf(payment.getId()))
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build())
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            payment.setTransactionId(paymentIntent.getId());
            payment.setProviderReference(paymentIntent.getClientSecret());
            
            // Dans une simulation réussie, on marque comme COMPLETED
            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setCompletedAt(java.time.LocalDateTime.now());
            
            log.info("Stripe Payment Intent created and completed: {}", paymentIntent.getId());
            return PaymentResponse.builder()
                    .paymentId(payment.getId())
                    .transactionId(paymentIntent.getId())
                    .clientSecret(paymentIntent.getClientSecret())
                    .status(PaymentStatus.COMPLETED)
                    .message("Paiement Stripe effectué avec succès")
                    .build();

        } catch (StripeException e) {
            log.error("Stripe payment error", e);
            payment.setStatus(PaymentStatus.FAILED);

            return PaymentResponse.builder()
                    .paymentId(payment.getId())
                    .status(PaymentStatus.FAILED)
                    .message("Erreur Stripe: " + e.getMessage())
                    .build();
        }
    }

    public void handleWebhook(String payload, String sigHeader) {
        log.info("Received Stripe webhook");
    }
}
