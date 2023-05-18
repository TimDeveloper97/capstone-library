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
        logger.info("[API-Authenticated] Update user profile - START");
        if(!userService.isUserExist(auth.getName())){
            logger.info("[API-Authenticated] Update user profile - END");
            return new ResponseEntity<>(new CustomErrorType("Yêu cầu cập nhật của người dùng không hợp lệ."), HttpStatus.OK);
        }
        User currUser = userService.getUserById(userDto.getId()).get();
        if(currUser == null){
            logger.error("User with id:"+ userDto.getId() +" not found. Unable to update.");
            logger.info("[API-Authenticated] Update user profile - END");
            return new ResponseEntity(new CustomErrorType("Người dùng với id:"+ userDto.getId() +" không tồn tại. Cập nhật hồ sơ người dùng thất bại."),
                    HttpStatus.OK);
        }
        try {
            userService.updateProfile(userDto.getId(), userDto.getAddress(), userDto.getEmail(), userDto.getFirstName(), userDto.getLastName(), new Date(), userDto.getPhone());
        }catch (Exception ex){
            logger.info("[API-Authenticated] Update user profile - END");
            return new ResponseEntity(new CustomErrorType("Xảy ra lỗi: "+ex.getMessage() +". \nNguyên nhân: "+ex.getCause()), HttpStatus.OK);
        }
        logger.info("Fetching & Updating User with id: "+ userDto.getId() +" at "+ new Date());
        logger.info("[API-Authenticated] Update user profile - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true, "Hoàn tất việc cập nhật hồ sơ người dùng id:" + userDto.getId()), HttpStatus.OK);

    }

    //Account

    /**
     * View User Profile
     * @param userId must have user Id
     * @return
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/view-profile/{userId}")
    public ResponseEntity<?> viewProfile(@PathVariable("userId") String userId){
        logger.info("[API-Authenticated] viewProfile - START");
        logger.info("Return user profile has id:" + userId);
        if(!userService.isUserExist(userId)){
            logger.error("User with id: " + userId + " not found.");
            logger.info("[API-Authenticated] viewProfile - END");
            return new ResponseEntity(new CustomErrorType("Người dùng có id:" + userId +" không tồn tại."),HttpStatus.OK);
        }
        User user = null;
        UserDTO userDto = new UserDTO();
        try {
            user = userService.getUserById(userId).get();
            user.setRoles(roleService.getAllByUserId(user.getId()));
            userDto.convertUser(user);
        }catch (Exception ex){
            logger.error("Exception:" + ex.getMessage() + ".\n" + ex.getCause());
            logger.info("[API-Authenticated] viewProfile - END");
            return new ResponseEntity(new CustomErrorType("Xảy ra lỗi: " + ex.getMessage() + ". \n Nguyên nhân: " + ex.getCause()), HttpStatus.OK);
        }
        logger.info("[API-Authenticated] viewProfile - SUCCESS");
        return new ResponseEntity<>(new ResData<UserDTO>(0, userDto), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication auth, @RequestBody ChangePasswordDto data){
        logger.info("[API-Authenticated] changePassword - START");
        if(!data.getOldPass().equals(GlobalData.mapCurrPass.get(auth.getName()))){
            logger.info("[API-Authenticated] changePassword - END");
            return new ResponseEntity<>(new CustomErrorType("Mật khẩu cũ không chính xác."), HttpStatus.OK);
        }
        if(!userService.isUserExist(auth.getName())){
            logger.info("[API-Authenticated] changePassword - END");
            return new ResponseEntity<>(new CustomErrorType("Yêu cầu của bạn không hợp lệ."), HttpStatus.OK);
        }
        User user = userService.getUserById(auth.getName()).get();
        if(user == null){
            logger.info("[API-Authenticated] changePassword - END");
            return new ResponseEntity(new CustomErrorType("Tài khoản hoặc mật khẩu cũ không chính xác. Vui lòng kiểm tra lại."), HttpStatus.OK);
        }
        try {
            user.setModifiedDate(new Date());
            user.setPassword(bCryptPasswordEncoder.encode(data.getNewPass()));
            userService.updateUser(user);
            GlobalData.mapCurrPass.put(auth.getName(), data.getNewPass());
        }catch (Exception ex){
            logger.info("Exception: "+ ex.getMessage() + ".\n" + ex.getCause());
            logger.info("[API-Authenticated] changePassword - END");
            return new ResponseEntity(new CustomErrorType("Exception: "+ ex.getMessage() + ".\n" + ex.getCause()), HttpStatus.CONFLICT);
        }
        logger.info("A password of user who has name: " + auth.getName() + " has been change.");
        logger.info("[API-Authenticated] changePassword - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true, "Mật khẩu của bạn đã được thay đổi."), HttpStatus.OK);
    }

    //books session
    //@PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/search-comic")
    public ResponseEntity<?> searchComic(@RequestBody DataDTO dataDto){
        logger.info("[API-Authenticated] searchComic - START");
        logger.info("Return all books has contains : " + dataDto.getValue());
        Set<Book> books = null;
        if(dataDto.getValue() == "")
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        else
            books = bookService.searchBookByName(dataDto.getValue());
        if(books.isEmpty()){
            logger.warn("The book with the title containing:"+ dataDto.getValue() +" could not be found");
            logger.info("[API-Authenticated] searchComic - END");
            return new ResponseEntity(new CustomErrorType("Không tìm thấy sách có tên: "+ dataDto.getValue()), HttpStatus.OK);
        }
        books.stream().forEach(book -> book.setCategories(categoryService.getAllCategoriesByBookId(book.getId())));
        //Set<Book> availBooks = books.stream().filter(b-> b.getQuantity() > 0).collect(Collectors.toSet());
        Set<BookDTO> bookDTOS = new HashSet<>();
        for (Book book : books){
            BookDTO bDto = new BookDTO();
            bDto.convertBook(book);
            bookDTOS.add(bDto);
        }
        logger.info("Return all books with the title containing:" + dataDto.getValue());
        logger.info("[API-Authenticated] searchComic - SUCCESS");
        return new ResponseEntity<Set<BookDTO>>(bookDTOS, HttpStatus.OK);
    }//view all books

}
