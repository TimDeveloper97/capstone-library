package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Notification;
import com.sb.brothers.capstone.entities.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface NotificationService {
    List<Notification> getAllNotification(String userId);
    void update(int id);
    Optional<Notification> getNotificationById(int ntfId);
}
