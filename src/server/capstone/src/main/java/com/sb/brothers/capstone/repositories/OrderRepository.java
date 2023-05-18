package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.PostDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    Optional<Order> findByPostId(int pId);

    @Query(value = "SELECT * FROM orders WHERE post_id IN (SELECT id FROM POST WHERE (status = 2 OR status > 30 ) AND address = :address AND user_id in (SELECT DISTINCT user_id FROM user_role WHERE role_id != 2)) order by borrowed_date"
            , nativeQuery = true)
    List<Order> findAllOrdersByRequestStatus(@Param("address") String address);

    @Query(value = "SELECT * FROM orders WHERE user_id = :userId AND post_id IN (SELECT id FROM POST WHERE (status = 2 OR status > 30 ) AND user_id in (SELECT DISTINCT user_id FROM user_role WHERE role_id != 2)) order by borrowed_date"
            , nativeQuery = true)
    List<Order> findAllOrdersByRequestStatusForUser(@Param("userId") String userId);
}
