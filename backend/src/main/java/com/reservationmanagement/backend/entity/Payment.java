package com.reservationmanagement.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String currency; // "MGA" pour Ariary

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod; // ORANGE_MONEY, STRIPE

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status; // PENDING, COMPLETED, FAILED, REFUNDED

    @Column(unique = true)
    private String transactionId; // ID de transaction du provider

    private String providerReference; // Référence du provider (Orange/Stripe)

    @Column(columnDefinition = "TEXT")
    private String metadata; // JSON pour stocker des infos supplémentaires

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
