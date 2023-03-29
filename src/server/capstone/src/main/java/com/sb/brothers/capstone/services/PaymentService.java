package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Payment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PaymentService {
    List<Payment> getAllPayments();
    void updatePayment(Payment payment);
}
