package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Notification;
import com.sb.brothers.capstone.repositories.NotificationRepository;
import com.sb.brothers.capstone.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<Notification> getAllNotification(String userId) {
        return notificationRepository.getNotificationByUserId(userId);
    }

    @Override
    public void update(int id) {
        notificationRepository.update(id);
    }

    @Override
    public Optional<Notification> getNotificationById(int ntfId) {
        return notificationRepository.findById(ntfId);
    }
}
