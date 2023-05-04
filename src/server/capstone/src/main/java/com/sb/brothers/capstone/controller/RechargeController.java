package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.PaymentDto;
import com.sb.brothers.capstone.entities.Notification;
import com.sb.brothers.capstone.entities.Payment;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.NotificationService;
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

    @Autowired
    private NotificationService notificationService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @GetMapping("/recharge")
    public ResponseEntity<?> getAllPayment(){
        logger.info("[API-Recharge] getAllPayment - START");
        logger.info("Return all notification.");
        List<Payment> payments = null;
        try{
            payments = paymentService.getAllPayments();
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            logger.info("[API-Recharge] getAllPayment - END");
            return new ResponseEntity<>(new CustomErrorType("Lấy thông tin lịch sử nạp tiền thất bại. Nguyên nhân" + ex.getCause()), HttpStatus.OK);
        }
        if(payments.isEmpty()){
            logger.warn("There are no recharge.");
            logger.info("[API-Recharge] getAllPayment - END");
            return new ResponseEntity<>(new CustomErrorType("Không có thông tin nạp tiền nào."), HttpStatus.OK);
        }
        List<PaymentDto> paymentDtos = new ArrayList<>();
        payments.stream().forEach(rec -> {
            PaymentDto recDto = new PaymentDto();
            recDto.convertPayment(rec);
            paymentDtos.add(recDto);
        });
        logger.info("[API-Recharge] getAllPayment - SUCCESS");
        return new ResponseEntity<>(new ResData<List<PaymentDto>>(0, paymentDtos), HttpStatus.OK);
    }//view all posts

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/transfer")
    public ResponseEntity<?> transfer(Authentication auth, @RequestBody PaymentDto paymentDto){
        logger.info("[API-Recharge] transfer - START");
        logger.info("Update payment.");
        User user = null;
        User manager = null;
        try{
            user = userService.getUserById(paymentDto.getUser()).get();
            manager = userService.getUserById(auth.getName()).get();
            if(user != null) {
                userService.updateBalance(user.getId(), user.getBalance() + paymentDto.getTransferAmount());
                user.setBalance(user.getBalance() + paymentDto.getTransferAmount());
                Payment payment = new Payment();
                payment.setTransferAmount(paymentDto.getTransferAmount());
                payment.setUser(user);
                if(paymentDto.getTransferAmount() < 0){
                    payment.setContent("Tài khoản " + paymentDto.getUser() + " đã rút " + paymentDto.getTransferAmount()
                            + "vnd, người thực hiện giao dịch: " + auth.getName());
                    Notification ntf = new Notification();
                    ntf.setUser(user);
                    ntf.setDescription("Bạn đã rút " + paymentDto.getTransferAmount() + "vnd, số dư hiện tại là:" + user.getBalance() +"vnd");
                    notificationService.updateNotification(ntf);
                }
                else {
                    payment.setContent("Tài khoản " + paymentDto.getUser() + " đã được nạp thêm " + paymentDto.getTransferAmount()
                            + "vnd, người thực hiện giao dịch: " + auth.getName());
                    Notification ntf = new Notification();
                    ntf.setUser(user);
                    ntf.setDescription("Bạn đã nạp " + paymentDto.getTransferAmount() + "vnd vào tài khoản, số dư hiện tại là:" + user.getBalance() +"vnd");
                    notificationService.updateNotification(ntf);
                }
                payment.setCreatedDate(new Date());
                payment.setManager(manager);
                paymentService.updatePayment(payment);
            }
            else throw new Exception("Không tìm thấy người dùng có mã: "+ user.getId());
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            logger.info("[API-Recharge] transfer - END");
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi:" + ex.getMessage() + ".\nNguyên nhân: "+ex.getCause()), HttpStatus.OK);
        }
        if(paymentDto.getTransferAmount() < 0) {
            logger.info("[API-Recharge] transfer - SUCCESS");
            return new ResponseEntity<>(new CustomErrorType(true, "Rút tiền thành công."), HttpStatus.OK);
        }
        logger.info("[API-Recharge] transfer - SUCCESS");
        return new ResponseEntity<>(new CustomErrorType(true, "Nạp tiền thành công."), HttpStatus.OK);
    }//view all posts

}
