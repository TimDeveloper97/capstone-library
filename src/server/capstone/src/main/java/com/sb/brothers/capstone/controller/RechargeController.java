package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.PaymentDto;
import com.sb.brothers.capstone.entities.Payment;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.PaymentService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RechargeController {

    private Logger logger = Logger.getLogger(CommonController.class);

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/recharge")
    public ResponseEntity<?> getAllPayment(){
        logger.info("Return all notification.");
        List<Payment> payments = null;
        try{
            payments = paymentService.getAllPayments();
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Lấy thông tin lịch sử nạp tiền thất bại. Nguyên nhân" + ex.getCause()), HttpStatus.OK);
        }
        if(payments.isEmpty()){
            logger.warn("There are no recharge.");
            return new ResponseEntity<>(new CustomErrorType("Không có thông tin nạp tiền nào."), HttpStatus.OK);
        }
        List<PaymentDto> paymentDtos = new ArrayList<>();
        payments.stream().forEach(rec -> {
            PaymentDto recDto = new PaymentDto();
            recDto.convertPayment(rec);
            paymentDtos.add(recDto);
        });
        return new ResponseEntity<>(new ResData<List<PaymentDto>>(0, paymentDtos), HttpStatus.OK);
    }//view all posts

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/transfer")
    public ResponseEntity<?> seenNotification(Authentication auth, @RequestBody PaymentDto paymentDto){
        logger.info("Update payment.");
        User user = null;
        User manager = null;
        try{
            user = userService.getUserById(paymentDto.getUser()).get();
            manager = userService.getUserById(auth.getName()).get();
            if(user != null) {
                userService.updateBalance(user.getId(), user.getBalance() + paymentDto.getTransferAmount());
                Payment payment = new Payment();
                payment.setTransferAmount(paymentDto.getTransferAmount());
                payment.setUser(user);
                payment.setContent("Tài khoản "+ paymentDto.getUser() +" đã được nạp thêm "+ paymentDto.getTransferAmount()
                        +"vnd. Số dư hiện tại là "+(user.getBalance() + paymentDto.getTransferAmount())+"vnd.");
                payment.setCreatedDate(new Date());
                payment.setManager(manager);
                paymentService.updatePayment(payment);
            }
            else throw new Exception("Không tìm thấy người dùng có mã: "+ user.getId());
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi:" + ex.getMessage() + ".\nNguyên nhân: "+ex.getCause()), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Nạp tiền thành công."), HttpStatus.OK);
    }//view all posts
}
