package com.reservationmanagement.backend.controller;

import com.reservationmanagement.backend.dto.PaymentRequest;
import com.reservationmanagement.backend.dto.PaymentResponse;
import com.reservationmanagement.backend.entity.Payment;
import com.reservationmanagement.backend.service.OrangeMoneyService;
import com.reservationmanagement.backend.service.PaymentService;
import com.reservationmanagement.backend.service.StripePaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final OrangeMoneyService orangeMoneyService;
    private final StripePaymentService stripePaymentService;

    @PostMapping("/initiate")
    public ResponseEntity<PaymentResponse> initiatePayment(
            @RequestBody PaymentRequest request,
            Authentication authentication) {

        String userEmail = authentication.getName();
        PaymentResponse response = paymentService.initiatePayment(userEmail, request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Payment>> getPaymentHistory(Authentication authentication) {
        String userEmail = authentication.getName();
        List<Payment> payments = paymentService.getUserPayments(userEmail);
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long paymentId) {
        Payment payment = paymentService.getPaymentById(paymentId);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/webhook/orange")
    public ResponseEntity<String> handleOrangeWebhook(@RequestBody Map<String, Object> payload) {
        log.info("Received Orange Money webhook");
        orangeMoneyService.handleWebhook(payload);
        return ResponseEntity.ok("Webhook received");
    }

    @PostMapping("/webhook/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        log.info("Received Stripe webhook");
        stripePaymentService.handleWebhook(payload, sigHeader);
        return ResponseEntity.ok("Webhook received");
    }
}
