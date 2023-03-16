package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.Role;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.EmailService;
import com.sb.brothers.capstone.services.RoleService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LoginController {

    private Logger logger = Logger.getLogger(LoginController.class);

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPass(@RequestBody UserDTO userDTO){
        logger.info("Forgot password the single user");
        Optional<User> userFP = userService.getUserByEmailAndId(userDTO.getEmail(), userDTO.getId());
        if(userFP.isPresent()){
            User user = userFP.get();
            user.setPassword(bCryptPasswordEncoder.encode("1"));
            userService.updateUser(user);
            emailService.sendMessage(userDTO.getEmail(), GlobalData.getSubject(), GlobalData.getContent("1"), null);
            logger.error("Success. A password of user who has name: "
                    + userDTO.getId() +", Email: "+userDTO.getEmail()+" has been reset.");
            return new ResponseEntity(new CustomErrorType(true, "A password of user who has name: "
                    + userDTO.getId() +", Email: "+userDTO.getEmail()+" has been reset."), HttpStatus.OK);
        }
        logger.error("Unable to forgot password. A User with name: "
                + userDTO.getId() +", Email: "+userDTO.getEmail()+" isn't exist.");
        return new ResponseEntity(new CustomErrorType("Unable to reset password. User with name:"
                + userDTO.getId() +", Email: "+userDTO.getEmail()+" isn't exist."), HttpStatus.NOT_FOUND);
    }

}
