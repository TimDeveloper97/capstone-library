package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Message;
import com.sb.brothers.capstone.repositories.ChatRepository;
import com.sb.brothers.capstone.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Set<Message> getAllMessagesByUser(String fId, String sId) {
        return chatRepository.findAllMessagesByUserId(fId, sId);
    }

    @Override
    public void save(Message message) {
        chatRepository.save(message);
    }
}
