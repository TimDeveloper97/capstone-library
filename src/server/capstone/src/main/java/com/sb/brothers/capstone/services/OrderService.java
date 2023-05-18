package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.PostDetail;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface OrderService {
    void save(Order order);
    Optional<Order> findByPostId(int pId);
    List<Order> getOrderByStatus(String address);
    Optional<Order> getOrderById(int oId);
    List<Order> getOrderByStatusForUser(String userId);
    void delete(Order order);
}
