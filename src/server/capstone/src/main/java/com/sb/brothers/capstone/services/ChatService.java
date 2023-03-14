package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Message;
import com.sb.brothers.capstone.entities.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface ChatService {
    Set<Message> getAllMessagesByUser(String fId, String sId);
    void save(Message message);
}
