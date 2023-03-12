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

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam("error") boolean error){
        logger.info("Clear cart.");
        GlobalData.cart.clear();
        if(error == true) {
            logger.info("username or password is wrong.");
            return new ResponseEntity(new CustomErrorType("username or password is wrong."), HttpStatus.NOT_FOUND);
        }
        logger.info("Get login page.");
        return new ResponseEntity(HttpStatus.OK);
    }//page login

    /*@GetMapping("/forgotpassword")
    public ResponseEntity<?> forgotPass(){
        logger.info("Forgot password the single user");
        return new ResponseEntity<UserDTO>(new UserDTO(), HttpStatus.BAD_REQUEST);
    }*/

    @PostMapping("/forgotpassword")
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
            return new ResponseEntity(new CustomErrorType("No error. A password of user who has name: "
                    + userDTO.getId() +", Email: "+userDTO.getEmail()+" has been reset."), HttpStatus.OK);
        }
        logger.error("Unable to forgot password. A User with name: "
                + userDTO.getId() +", Email: "+userDTO.getEmail()+" isn't exist.");
        return new ResponseEntity(new CustomErrorType("Unable to reset password. User with name:"
                + userDTO.getId() +", Email: "+userDTO.getEmail()+" isn't exist."), HttpStatus.NOT_FOUND);
    }

    /*@GetMapping("/register")
    public ResponseEntity<UserDTO> registerGet(Model model){
        logger.info("Register the single user - GET");
        return new ResponseEntity<UserDTO>(new UserDTO(), HttpStatus.CREATED);
    } //page register*/

    @PostMapping("/register")
    public ResponseEntity<?> registerPost(@RequestBody UserDTO userModel){
        //chuyen password tu form dki thanh dang ma hoa
        logger.info("Register the single user - POST");
        if(userService.isUserExist(userModel.getId())){
            logger.error("Unable to register. User with username:"
                    +userModel.getId()+" already exist.");
            return new ResponseEntity(new CustomErrorType("Unable to register. User with username "
                    +userModel.getId()+" already exist."), HttpStatus.CONFLICT);
        }
        User newUser = new User();
        userModel.convertUserDto(newUser);
        newUser.setPassword(bCryptPasswordEncoder.encode(userModel.getPassword()));
        //set mac dinh role user
        List<Role> roles = new ArrayList<>();
        roles.add(roleService.findRoleByName("ROLE_USER"));
        userService.updateUser(newUser);
        return new ResponseEntity(new CustomErrorType("No error. New account registration - SUCCESS"), HttpStatus.CREATED);
    }//after register success
}
