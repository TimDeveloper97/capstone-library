package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.PostDetail;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface OrderService {
    void save(Order order);
    List<Order> findAllByUser(String uId);
    List<Order> getOrderByStatus();
    Optional<Order> getOrderById(int oId);
}
