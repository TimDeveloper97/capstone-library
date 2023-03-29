package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Payment;
import com.sb.brothers.capstone.repositories.PaymentRepository;
import com.sb.brothers.capstone.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public void updatePayment(Payment payment) {
        paymentRepository.saveAndFlush(payment);
    }


}
