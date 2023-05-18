package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.DataDTO;
import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Role;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.*;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.CustomStatus;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UnauthenticatedUserAPI {

    Logger logger = Logger.getLogger(UnauthenticatedUserAPI.class);

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleService roleService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userModel){
        logger.info("[API-Unauthenticated] register - START");
        //chuyen password tu form dki thanh dang ma hoa
        logger.info("Register the single user - POST");
        if(userService.isUserExist(userModel.getId())){
            logger.error("Unable to register. User with username:"
                    +userModel.getId()+" already exist.");
            logger.info("[API-Unauthenticated] register - END");
            return new ResponseEntity(new CustomErrorType("Đăng ký thất bại. Username "
                    +userModel.getId()+" đã tồn tại."), HttpStatus.OK);
        }
        User newUser = new User();
        userModel.setStatus(CustomStatus.ACTIVATE);
        userModel.convertUserDto(newUser);
        newUser.setPassword(bCryptPasswordEncoder.encode(userModel.getPassword()));
        //default role is USER
        List<Role> roles = new ArrayList<>();
        roles.add(roleService.findRoleByName("ROLE_USER"));
        newUser.setRoles(roles);
        userService.updateUser(newUser);
        logger.info("[API-Unauthenticated] register - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true,"Đăng ký tài khoản thành công."), HttpStatus.OK);
    }//after register success

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPass(@RequestBody UserDTO userDTO){
        logger.info("[API-Unauthenticated] forgotPass - START");
        logger.info("Forgot password the single user");
        Optional<User> userFP = userService.getUserByEmailAndId(userDTO.getEmail(), userDTO.getId());
        if(userFP.isPresent()){
            User user = userFP.get();
            user.setPassword(bCryptPasswordEncoder.encode("1"));
            userService.updateUser(user);
            emailService.sendMessage(userDTO.getEmail(), GlobalData.getSubject(), GlobalData.getContent("1"), null);
            logger.error("Success. A password of user who has name: "
                    + userDTO.getId() +", Email: "+userDTO.getEmail()+" has been reset.");
            logger.info("[API-Unauthenticated] forgotPass - END");
            return new ResponseEntity(new CustomErrorType(true, "Mật khẩu của bạn đã được thay đổi. Vui lòng " +
                    "kiểm tra hòm thư e-mail của bạn: "+userDTO.getEmail()), HttpStatus.OK);
        }
        logger.error("Unable to forgot password. A User with name: "
                + userDTO.getId() +", Email: "+userDTO.getEmail()+" isn't exist.");
        logger.info("[API-Unauthenticated] forgotPass - END");
        return new ResponseEntity(new CustomErrorType("Quên mật khẩu thất bại."
                + " Email đăng ký không chính xác."), HttpStatus.OK);
    }

    //books session
    @GetMapping("/books/search-by-author")
    public ResponseEntity<?> searchByAuthorName(@RequestBody BookDTO bookDto){
        logger.info("[API-Unauthenticated] searchByAuthorName - START");
        logger.info("Return all books of Author: " + bookDto.getAuthor());
        Set<Book> books = null;
        if(bookDto.getAuthor() == "")
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        else
            books = bookService.searchBookByAuthor(bookDto.getAuthor());
        if(books.size() == 0){
            logger.warn("Author's books:"+ bookDto.getName()+" could not be found");
            logger.info("[API-Unauthenticated] searchByAuthorName - END");
            return new ResponseEntity(new CustomErrorType("Không tìm thấy sách của tác giả:"+ bookDto.getName()), HttpStatus.NOT_FOUND);
        }
        List<BookDTO> bookDTOS = bookDto.convertAllBooks(books);
        logger.info("Return all books of author:" + bookDto.getName());
        logger.info("[API-Unauthenticated] searchByAuthorName - SUCCESS");
        return new ResponseEntity<>(new ResData<List<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books by author

    //books session
    @GetMapping("/books/search-by-location")
    public ResponseEntity<?> searchByPostLocation(@RequestBody DataDTO dataDto){
        logger.info("[API-Unauthenticated] searchByPostLocation - START");
        logger.info("Return all books with poster's location: " + dataDto.getValue());
        Set<Book> books = null;
        if(dataDto.getValue() == "")
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        else
            books = bookService.searchBookByPostLocation(dataDto.getValue());
        if(books.isEmpty()){
            logger.warn("Books with poster's location: "+ dataDto.getValue()+" could not be found");
            logger.info("[API-Unauthenticated] searchByPostLocation - END");
            return new ResponseEntity(new CustomErrorType("Bài đăng có địa chỉ: "+ dataDto.getValue() + " không tìm thấy."), HttpStatus.OK);
        }
        Set<BookDTO> bookDTOS = new HashSet<>();
        for (Book book : books){
            book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
            BookDTO bDto = new BookDTO();
            bDto.convertBook(book);
            bookDTOS.add(bDto);
        }
        logger.info("Return all books with poster's location: "+ dataDto.getValue());
        logger.info("[API-Unauthenticated] searchByPostLocation - SUCCESS");
        return new ResponseEntity<>(new ResData<Set<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books with location

    //books session
    @GetMapping("/books/suggest")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> suggestBook(Authentication auth){
        logger.info("[API-Unauthenticated] suggestBook - START");
        logger.info("Return all suggest books for user: " + auth.getName());
        Set<Book> books = bookService.searchBySuggest(auth.getName());
        if(books == null){
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        }
        if(books.isEmpty()){
            logger.warn("Books with poster's location: "+ auth.getName()+" could not be found");
            logger.info("[API-Unauthenticated] suggestBook - END");
            return new ResponseEntity(new CustomErrorType("Books with poster's location: "+ auth.getName()+" could not be found"), HttpStatus.OK);
        }
        List<BookDTO> bookDTOS = BookDTO.convertAllBooks(books);
        logger.info("Return all books with poster's location: "+ auth.getName());
        logger.info("[API-Unauthenticated] suggestBook - SUCCESS");
        return new ResponseEntity<>(new ResData<List<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books with location

}
