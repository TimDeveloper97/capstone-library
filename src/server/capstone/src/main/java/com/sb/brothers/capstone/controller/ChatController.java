package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.ChatMessage;
import com.sb.brothers.capstone.entities.Message;
import com.sb.brothers.capstone.services.ChatService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> chatHistory(@RequestBody ChatMessage chatDto){
        logger.info("[API-Chat] chatHistory - START");
        logger.info("Show chat history of users");
        if(chatDto.getSender() == null || chatDto.getReceiver() == null){
            logger.error("input not correct.");
            logger.info("[API-Chat] chatHistory - END");
            return new ResponseEntity<>(new CustomErrorType("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại."), HttpStatus.BAD_REQUEST);
        }
        Set<Message> messages = null;
        try{
            messages = chatService.getAllMessagesByUser(chatDto.getSender(), chatDto.getReceiver());
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +" when get chat history by user." + ex.getCause());
            logger.info("[API-Chat] chatHistory - END");
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi khi lấy thông tin lịch sử chat. Vui lòng kiểm tra lại."), HttpStatus.CONFLICT);
        }
        logger.info("[API-Chat] chatHistory - SUCCESS");
        return new ResponseEntity<>(new ResData<Set<Message>>(0, messages), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity<?> sendMsg(@RequestBody ChatMessage chatDto){
        logger.info("[API-Chat] sendMsg - START");
        logger.info("save chat history of users");
        if(chatDto.getSender() == null || chatDto.getReceiver() == null){
            logger.error("input not correct.");
            logger.info("[API-Chat] sendMsg - END");
            return new ResponseEntity<>(new CustomErrorType("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại."), HttpStatus.OK);
        }
        else if(!userService.isUserExist(chatDto.getSender()) || !userService.isUserExist(chatDto.getReceiver())){
            logger.error("Sender or Receiver not found.");
            logger.info("[API-Chat] sendMsg - END");
            return new ResponseEntity<>(new CustomErrorType("Không tìm thấy người nhận hoặc người gửi."), HttpStatus.OK);
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
            logger.info("[API-Chat] sendMsg - END");
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi: "+ ex.getMessage() +".\nNguyên nhân:" + ex.getCause()), HttpStatus.OK);
        }
        logger.info("[API-Chat] sendMsg - END");
        return new ResponseEntity(new CustomErrorType(true, "Tin nhắn đã được lưu thành công."),HttpStatus.CREATED);
    }
}
