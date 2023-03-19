package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.PostDetail;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    void save(Order order);
    List<Order> findAllByUser(String uId);
}
