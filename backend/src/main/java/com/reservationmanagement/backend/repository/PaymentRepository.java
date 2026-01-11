package com.reservationmanagement.backend.repository;

import com.reservationmanagement.backend.entity.Payment;
import com.reservationmanagement.backend.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByUserId(Long userId);

    Optional<Payment> findByTransactionId(String transactionId);

    List<Payment> findByStatus(PaymentStatus status);

    List<Payment> findByUserIdAndStatus(Long userId, PaymentStatus status);
}
