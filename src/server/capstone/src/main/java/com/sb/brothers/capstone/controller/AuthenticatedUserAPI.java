package com.sb.brothers.capstone.controller;


import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.ChangePasswordDto;
import com.sb.brothers.capstone.dto.DataDTO;
import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.services.RoleService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class AuthenticatedUserAPI {

    private Logger logger = Logger.getLogger(AuthenticatedUserAPI.class);

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private BookService bookService;

    @Autowired
    private CategoryService categoryService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(Authentication auth, @RequestBody UserDTO userDto){
        if(!userService.isUserExist(auth.getName())){
            return new ResponseEntity<>(new CustomErrorType("Request user not correct."), HttpStatus.UNAUTHORIZED);
        }
        User currUser = userService.getUserById(userDto.getId()).get();
        if(currUser == null){
            logger.error("User with id:"+ userDto.getId() +" not found. Unable to update.");
            return new ResponseEntity(new CustomErrorType("User with id:"+ userDto.getId() +" not found. Unable to update."),
                    HttpStatus.NOT_FOUND);
        }
        try {
            userService.updateProfile(userDto.getId(), userDto.getAddress(), userDto.getEmail(), userDto.getFirstName(), userDto.getLastName(), userDto.getModifiedDate(), userDto.getPhone());
        }catch (Exception ex){
            return new ResponseEntity(new CustomErrorType("Exception: "+ex.getMessage() +".\n"+ex.getCause()), HttpStatus.CONFLICT);
        }
        logger.info("Fetching & Updating User with id: "+ userDto.getId()+" by " + userDto.getModifiedBy() +" at "+ userDto.getModifiedDate());
        return new ResponseEntity(new CustomErrorType(true, "Update user profile with id:" + userDto.getId() +" - SUCCESS."), HttpStatus.OK);

    }

    //Account

    /**
     * View User Profile
     * @param dataDto must have user Id
     * @return
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/view-profile")
    public ResponseEntity<?> viewProfile(@RequestBody DataDTO dataDto){
        logger.info("Return user profile has id:" + dataDto.getValue());
        if(!userService.isUserExist(dataDto.getValue())){
            logger.error("User with id: " + dataDto.getValue() + " not found.");
            return new ResponseEntity(new CustomErrorType("Unable to get. A User with id:"
                    + dataDto.getValue() +" not exist."),HttpStatus.NOT_FOUND);
        }
        User user = null;
        UserDTO userDto = new UserDTO();
        try {
            user = userService.getUserById(dataDto.getValue()).get();
            user.setRoles(roleService.getAllByUserId(user.getId()));
            userDto.convertUser(user);
        }catch (Exception ex){
            logger.error("Exception:" + ex.getMessage() + ".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Exception:" + ex.getMessage() + ".\n" + ex.getCause()), HttpStatus.CONFLICT);
        }
        logger.info("Load user profile: SUCCESS");
        return new ResponseEntity<>(new ResData<UserDTO>(0, userDto), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication auth, @RequestBody ChangePasswordDto data){
        if(!data.getOldPass().equals(GlobalData.mapCurrPass.get(auth.getName()))){
            return new ResponseEntity<>(new CustomErrorType("Old password is incorrect."), HttpStatus.BAD_GATEWAY);
        }
        if(!userService.isUserExist(auth.getName())){
            return new ResponseEntity<>(new CustomErrorType("User request is incorrect."), HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
        logger.info("Change password for the single user");
        User user = userService.getUserById(auth.getName()).get();
        if(user == null){
            return new ResponseEntity(new CustomErrorType("Username or password is incorrect."), HttpStatus.NOT_FOUND);
        }
        try {
            user.setModifiedDate(new Date());
            user.setPassword(bCryptPasswordEncoder.encode(data.getNewPass()));
            userService.updateUser(user);
            GlobalData.mapCurrPass.put(auth.getName(), data.getNewPass());
        }catch (Exception ex){
            logger.info("Exception: "+ ex.getMessage() + ".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Exception: "+ ex.getMessage() + ".\n" + ex.getCause()), HttpStatus.CONFLICT);
        }
        logger.info("Success. A password of user who has name: " + auth.getName() + " has been change.");
        return new ResponseEntity(new CustomErrorType(true, "A password of user who has name: "
                + auth.getName() + " has been change."), HttpStatus.OK);
    }

    //books session
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/search-comic")
    public ResponseEntity<?> searchComic(@RequestBody DataDTO dataDto){
        logger.info("Return all books has contains : " + dataDto.getValue());
        Set<Book> books = null;
        if(dataDto.getValue() == "")
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        else
            books = bookService.searchBookByName(dataDto.getValue());
        if(books.isEmpty()){
            logger.warn("The book with the title containing:"+ dataDto.getValue() +" could not be found");
            return new ResponseEntity(new CustomErrorType("The book with the title containing:"+ dataDto.getValue() +" could not be found"), HttpStatus.NOT_FOUND);
        }
        books.stream().forEach(book -> book.setCategories(categoryService.getAllCategoriesByBookId(book.getId())));
        //Set<Book> availBooks = books.stream().filter(b-> b.getQuantity() > 0).collect(Collectors.toSet());
        Set<BookDTO> bookDTOS = new HashSet<>();
        for (Book book : books){
            BookDTO bDto = new BookDTO();
            bDto.convertBook(book);
            bookDTOS.add(bDto);
        }
        logger.info("Return all books with the title containing:" + dataDto.getValue() +" - SUCCESS.");
        return new ResponseEntity<Set<BookDTO>>(bookDTOS, HttpStatus.OK);
    }//view all books

}
