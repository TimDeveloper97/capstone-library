package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.ChatMessage;
import com.sb.brothers.capstone.entities.Message;
import com.sb.brothers.capstone.services.ChatService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    private Logger logger = Logger.getLogger(ChatController.class);

    @GetMapping
    public ResponseEntity<?> chatHistory(@RequestBody ChatMessage chatDto){
        logger.info("Show chat history of users");
        if(chatDto.getSender() == null || chatDto.getReceiver() == null){
            logger.error("input not correct.");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Set<Message> messages = null;
        try{
            messages = chatService.getAllMessagesByUser(chatDto.getSender(), chatDto.getReceiver());
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +" when get chat history by user." + ex.getCause());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        logger.info("Get chat history - SUCCESS.");
        return new ResponseEntity<Set<Message>>(messages, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> sendMsg(@RequestBody ChatMessage chatDto){
        logger.info("save chat history of users");
        if(chatDto.getSender() == null || chatDto.getReceiver() == null){
            logger.error("input not correct.");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else if(!userService.isUserExist(chatDto.getSender()) || !userService.isUserExist(chatDto.getReceiver())){
            logger.error("Sender or Receiver not found.");
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Message msg = new Message();
        msg.setUser1(userService.getUserById(chatDto.getSender()).get());
        msg.setUser2(userService.getUserById(chatDto.getReceiver()).get());
        msg.setContent(chatDto.getContent());
        Date date = new Date();
        msg.setCreatedDate(date);
        try{
            chatService.save(msg);
        }catch (Exception ex){
            logger.error("Exception: "+ ex.getMessage() +" \n" + ex.getCause());
        }
        return new ResponseEntity(new CustomErrorType(true, "Save message to chat history - SUCCESS"),HttpStatus.CREATED);
    }
}
