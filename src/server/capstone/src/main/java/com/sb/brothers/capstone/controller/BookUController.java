package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.DataDTO;
import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@RequestMapping("/api/books")
@RestController
public class BookUController {
    public static String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/bookImages";

    public static final Logger logger = Logger.getLogger(BookUController.class);

    @Autowired
    CategoryService categoryService;

    @Autowired
    BookService bookService;

    //books session
    @GetMapping("/list")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllBooksByUserId(Authentication auth){
        logger.info("Return all books");
        Set<Book> books = bookService.getListBooksOfUserId(auth.getName());
        for (Book book : books){
            book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
        }
        if(books.isEmpty()){
            logger.warn("no content");
            return new ResponseEntity<>(new CustomErrorType("List of books has empty."), HttpStatus.NOT_FOUND);
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


    //books session
    @GetMapping("/available")
    public ResponseEntity<?> getAllAvailableBooksByUserId(@RequestBody UserDTO uId){
        logger.info("Return all available books of user has id: " + uId.getId());
        Set<Book> books = bookService.getAllBooksByUserId(uId.getId());
        if(books.isEmpty()){
            logger.warn("the bookstore of user is empty.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        books.stream().forEach(book -> book.setCategories(categoryService.getAllCategoriesByBookId(book.getId())));
        Set<Book> availBooks = books.stream().filter(b-> b.getQuantity() > 0).collect(Collectors.toSet());
        logger.info("Return all available books of user has id: " + uId.getId() +" - SUCCESS.");
        return new ResponseEntity<Set<Book>>(availBooks, HttpStatus.OK);
    }//view all books

}
