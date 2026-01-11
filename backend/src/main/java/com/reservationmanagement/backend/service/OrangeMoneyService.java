package com.reservationmanagement.backend.service;

import com.reservationmanagement.backend.dto.PaymentRequest;
import com.reservationmanagement.backend.dto.PaymentResponse;
import com.reservationmanagement.backend.entity.Payment;
import com.reservationmanagement.backend.entity.PaymentStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrangeMoneyService {

    @Value("${orange.money.api.url:https://api.orange.com/orange-money-webpay/dev/v1}")
    private String apiUrl;

    @Value("${orange.money.merchant.key:YOUR_MERCHANT_KEY}")
    private String merchantKey;

    @Value("${orange.money.merchant.id:YOUR_MERCHANT_ID}")
    private String merchantId;

    private final RestTemplate restTemplate = new RestTemplate();

    public PaymentResponse initiatePayment(PaymentRequest request, Payment payment) {
        try {
            log.info("Initiating Orange Money payment for amount: {} MGA", request.getAmount());
            
            // Générer un ID de transaction unique
            String transactionId = "OM-" + UUID.randomUUID().toString();
            payment.setTransactionId(transactionId);

            // Préparer la requête Orange Money API
            Map<String, Object> orangeRequest = new HashMap<>();
            orangeRequest.put("merchant_key", merchantKey);
            orangeRequest.put("currency", "MGA");
            orangeRequest.put("order_id", transactionId);
            orangeRequest.put("amount", request.getAmount().intValue());
            orangeRequest.put("return_url", "http://localhost:4200/payment/callback");
            orangeRequest.put("cancel_url", "http://localhost:4200/payment/cancel");
            orangeRequest.put("notif_url", "http://localhost:9090/api/v1/payments/webhook/orange");
            orangeRequest.put("lang", "fr");
            orangeRequest.put("reference", "Service-" + request.getServiceId());

            // Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + merchantKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(orangeRequest, headers);

            // TODO: Appel réel à l'API Orange Money
            // ResponseEntity<Map> response = restTemplate.postForEntity(
            // apiUrl + "/webpayment", entity, Map.class
            // );

            // SIMULATION pour le développement
            log.info("Orange Money payment simulation - Transaction ID: {}", transactionId);

            return PaymentResponse.builder()
                    .paymentId(payment.getId())
                    .transactionId(transactionId)
                    .status(PaymentStatus.PENDING)
                    .message("Paiement Orange Money initié. Veuillez composer *144# pour confirmer.")
                    .build();

        } catch (Exception e) {
            log.error("Error initiating Orange Money payment", e);
            payment.setStatus(PaymentStatus.FAILED);

            return PaymentResponse.builder()
                    .paymentId(payment.getId())
                    .status(PaymentStatus.FAILED)
                    .message("Erreur lors de l'initiation du paiement Orange Money: " + e.getMessage())
                    .build();
        }
    }

    public void handleWebhook(Map<String, Object> webhookData) {
        log.info("Received Orange Money webhook: {}", webhookData);
        // TODO: Traiter le webhook et mettre à jour le statut du paiement
    }
}
