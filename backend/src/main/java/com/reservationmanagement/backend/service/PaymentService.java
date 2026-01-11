package com.reservationmanagement.backend.service;

import com.reservationmanagement.backend.dto.PaymentRequest;
import com.reservationmanagement.backend.dto.PaymentResponse;
import com.reservationmanagement.backend.entity.*;
import com.reservationmanagement.backend.repository.PaymentRepository;
import com.reservationmanagement.backend.repository.ServiceRepository;
import com.reservationmanagement.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final OrangeMoneyService orangeMoneyService;
    private final StripePaymentService stripePaymentService;

    @Transactional
    public PaymentResponse initiatePayment(String userEmail, PaymentRequest request) {
        log.info("Initiating payment for user: {}, method: {}", userEmail, request.getPaymentMethod());

        // Récupérer l'utilisateur
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Récupérer le service
        com.reservationmanagement.backend.entity.Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        // Créer l'entité Payment
        Payment payment = Payment.builder()
                .user(user)
                .service(service)
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .paymentMethod(request.getPaymentMethod())
                .status(PaymentStatus.PENDING)
                .build();

        // Sauvegarder le paiement
        payment = paymentRepository.save(payment);

        // Router vers le bon service de paiement
        PaymentResponse response;
        switch (request.getPaymentMethod()) {
            case ORANGE_MONEY:
                response = orangeMoneyService.initiatePayment(request, payment);
                break;
            case STRIPE:
                response = stripePaymentService.initiatePayment(request, payment);
                break;
            default:
                throw new IllegalArgumentException("Unsupported payment method: " + request.getPaymentMethod());
        }

        // Mettre à jour le paiement avec les infos du provider
        paymentRepository.save(payment);

        return response;
    }

    public List<Payment> getUserPayments(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return paymentRepository.findByUserId(user.getId());
    }

    public Payment getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Transactional
    public void updatePaymentStatus(String transactionId, PaymentStatus status) {
        Payment payment = paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(status);
        if (status == PaymentStatus.COMPLETED) {
            payment.setCompletedAt(java.time.LocalDateTime.now());
        }

        paymentRepository.save(payment);
        log.info("Payment {} status updated to {}", transactionId, status);
    }
}
