package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.PostDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findAllByUser(String uId);
}
