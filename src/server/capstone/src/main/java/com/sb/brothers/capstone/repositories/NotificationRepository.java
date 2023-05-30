package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Notification;
import com.sb.brothers.capstone.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    @Query(value = "SELECT * FROM notification WHERE user_id = :userId",
            nativeQuery = true)
    List<Notification> getNotificationByUserId(@Param("userId") String userId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE notification SET `status` = 1 WHERE id = :id",
            nativeQuery = true)
    void update(@Param("id") int id);
}
