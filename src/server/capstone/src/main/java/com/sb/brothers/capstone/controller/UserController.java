package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.TokenProvider;
import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.Role;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.RoleService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/api/admin/users")
@RestController
public class UserController {

    public static final Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    //Accounts
    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers(){
        logger.info("Return all users");
        List<User> users = userService.findAllUsers();
        if(users.isEmpty()){
            logger.warn("no content");
            return new ResponseEntity(new CustomErrorType("Không có bất kỳ người dùng nào."), HttpStatus.OK);
        }
        for (User user : users){
            user.lazyLoad();
            user.setRoles(roleService.getAllByUserId(user.getId()));
        }
        logger.info("Success!");
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    //Account
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id, Model model){
        logger.info("Return the single user");
        if(!userService.isUserExist(id)){
            logger.error("User with id: " + id + " not found.");
            return new ResponseEntity(new CustomErrorType("Không tìm thấy người dùng có mã:" + id),HttpStatus.OK);
        }
        User user = userService.getUserById(id).get();
        user.lazyLoad();
        user.setRoles(roleService.getAllByUserId(user.getId()));
        logger.info("Success!");
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    /* Do not use this API

    @GetMapping("/add")
    public ResponseEntity<UserDTO> getUserAdd(Model model){
        logger.info("Create the single user");
        model.addAttribute("roles",roleService.getAllRole());
        return new ResponseEntity<UserDTO>(new UserDTO(), HttpStatus.CREATED);
    }*/
/*
    @PostMapping("/add")
    public ResponseEntity<?> postUserAdd(@RequestBody UserDTO userDTO) {
        //convert dto > entity
        logger.info("Creating User:" + userDTO.getId());
        if(userService.isUserExist(userDTO.getId())){
            logger.error("Unable to create. User with username:"
                    +userDTO.getId()+" already exist.");
            return new ResponseEntity(new CustomErrorType("Unable to create. User with username "
                    +userDTO.getId()+" already exist."), HttpStatus.CONFLICT);
        }
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setBalance(userDTO.getBalance());
        user.setPhone(userDTO.getPhone());
        user.setStatus(user.getStatus());
        List<Role> roles = new ArrayList<>();
        if(userDTO.getRoles() != null) {
            for (String item : userDTO.getRoles()) {
                roles.add(roleService.findRoleByName(item));
            }
        }
        user.setRoles(roles);
        userService.updateUser(user);
        logger.info("Create new user - Success!");
        return new ResponseEntity(new CustomErrorType(true, "Create new user - Success"), HttpStatus.CREATED);
    }*/

    /*@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id, UriComponentsBuilder ucBuilder){
        logger.info("Fetching & Deleting user with id" + id);
        if(!userService.isUserExist(id)){
            logger.error("User with id:"+ id +" not found. Unable to delete.");
            return new ResponseEntity(new CustomErrorType("Không tìm thấy người dùng có mã:" + id),
                    HttpStatus.OK);
        }
        userService.removeUserById(id);
        logger.info("Delete user - Success!");
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/admin/users").build().toUri());
        return new ResponseEntity<User>(headers, HttpStatus.OK);
    }//delete 1 user*/

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/role-update/{id}")
    public ResponseEntity<?> updateUser(Authentication auth, @PathVariable("id") String id, @RequestBody User user){
        logger.info("API update Role for other User by Admin - START");
        User currUser = userService.getUserById(id).get();
        if(currUser == null){
            logger.error("User with id:"+ id +" not found. Unable to update.");
            return new ResponseEntity(new CustomErrorType("Không tìm thấy người dùng có id:"+ id +". Cập nhật thông tin thất bại."),
                    HttpStatus.OK);
        }
        if(tokenProvider.getRoles(auth).contains("ROLE_ADMIN")){
            return new ResponseEntity(new CustomErrorType("Không thể thay đổi vai trò của Administrator. Cập nhật thông tin thất bại."),
                    HttpStatus.OK);
        }
        currUser.setModifiedBy(auth.getName());
        currUser.setModifiedDate(new Date());
        currUser.setStatus(user.getStatus());
        currUser.setRoles(user.getRoles());
        logger.info("Fetching & Updating User with id: "+ user.getId()+" by " + user.getModifiedBy() +" at "+ user.getModifiedDate());
        userService.updateUser(currUser);
        logger.info("API update Role for other User by Admin - Success");
        return new ResponseEntity<>(new CustomErrorType(true, "Cập nhật vai trò và trạng thái người dùng thành công."), HttpStatus.OK);
    }
}
