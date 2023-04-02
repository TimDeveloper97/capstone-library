package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.PostDetail;
import com.sb.brothers.capstone.repositories.OrderRepository;
import com.sb.brothers.capstone.repositories.PostDetailRepository;
import com.sb.brothers.capstone.services.OrderService;
import com.sb.brothers.capstone.services.PostDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void save(Order order) {
        orderRepository.saveAndFlush(order);
    }

    @Override
    public List<Order> findAllByUser(String uId) {
        return orderRepository.findAllByUser(uId);
    }

    @Override
    public List<Order> getOrderByStatus() {
        return orderRepository.findAllOrdersByRequestStatus();
    }

    @Override
    public Optional<Order> getOrderById(int oId) {
        return orderRepository.findById(oId);
    }

    @Override
    public List<Order> getOrderByStatusForUser(String userId) {
        return orderRepository.findAllOrdersByRequestStatusForUser(userId);
    }
}
