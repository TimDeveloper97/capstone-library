package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.JWTFilter;
import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.OrderDto;
import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.entities.*;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.*;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class MemberAPI {

    private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);

    @Autowired
    private PostService postService;

    @Autowired
    private BookService bookService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostDetailService postDetailService;

    //books session
    @PostMapping("/checkout")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getAllBooks(Authentication auth){
        logger.info("Return rent books");
        List<PostDto> postDtos = GlobalData.cart.get(auth.getName());
        if(postDtos == null || postDtos.isEmpty()){
            logger.warn("The cart of user:"+ auth.getName()+" is empty.");
            return new ResponseEntity<>(new CustomErrorType("The cart of user:"+ auth.getName()+" is empty."), HttpStatus.OK);
        }
        int total = 0;
        List<Order> orders = new ArrayList<>();
        User user = null;
        for(PostDto postDto : postDtos){
            Order order = new Order();
            Post post = postService.getPostById(postDto.getId()).get();
            user = userService.getUserById(auth.getName()).get();
            order.setPost(post);
            order.setUser(user);
            List<PostDetail> postDetails = postDetailService.findAllByPostId(postDto.getId());
            for(PostDetail postDetail : postDetails){
                total += postDetail.getBook().getPrice();
            }
            total += postDto.getFee();
            orders.add(order);
        }
        if(total < user.getBalance()){
            orders.stream().forEach(order -> {
                orderService.save(order);
            });
        }
        else{
            return new ResponseEntity<>(new CustomErrorType("User "+ auth.getName() + " dosen't have enough money."), HttpStatus.OK);
        }
        logger.info("Return all books - SUCCESS.");
        return new ResponseEntity<>(new CustomErrorType(true, "User "+ auth.getName() + " checkout - SUCCESS."), HttpStatus.OK);
    }//view all books


    //books session
    @GetMapping("/books/list")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllBooksByUserId(Authentication auth){
        logger.info("Return list books");
        Set<Book> books = bookService.getListBooksOfUserId(auth.getName());
        for (Book book : books){
            book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
        }
        if(books.isEmpty()){
            logger.warn("This user's book list is empty.");
            return new ResponseEntity<>(new CustomErrorType("This user's book list is empty."), HttpStatus.OK);
        }
        Set<BookDTO> bookDTOS = new HashSet<BookDTO>();
        for (Book book : books){
            book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
            BookDTO bDto = new BookDTO();
            bDto.convertBook(book);
            bookDTOS.add(bDto);
        }
        logger.info("Return all books of user:" + auth.getName() +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<Set<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books

}
