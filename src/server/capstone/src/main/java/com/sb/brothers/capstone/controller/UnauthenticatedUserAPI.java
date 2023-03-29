package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.DataDTO;
import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Role;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.services.RoleService;
import com.sb.brothers.capstone.services.UserService;
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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userModel){
        //chuyen password tu form dki thanh dang ma hoa
        logger.info("Register the single user - POST");
        if(userService.isUserExist(userModel.getId())){
            logger.error("Unable to register. User with username:"
                    +userModel.getId()+" already exist.");
            return new ResponseEntity(new CustomErrorType("Unable to register. User with username "
                    +userModel.getId()+" already exist."), HttpStatus.CONFLICT);
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
        return new ResponseEntity(new CustomErrorType(true,"New account registration - SUCCESS"), HttpStatus.CREATED);
    }//after register success


    //books session
    @GetMapping("/books/search-by-author")
    public ResponseEntity<?> searchByAuthorName(@RequestBody BookDTO bookDto){
        logger.info("Return all books of Author: " + bookDto.getAuthor());
        Set<Book> books = null;
        if(bookDto.getAuthor() == "")
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        else
            books = bookService.searchBookByAuthor(bookDto.getAuthor());
        if(books.size() == 0){
            logger.warn("Author's books:"+ bookDto.getName()+" could not be found");
            return new ResponseEntity(new CustomErrorType("The books of Author:"+ bookDto.getName()+" could not be found"), HttpStatus.NOT_FOUND);
        }
        List<BookDTO> bookDTOS = bookDto.convertAllBooks(books);
        logger.info("Return all books of author:" + bookDto.getName() +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books by author

    //books session
    @GetMapping("/books/search-by-location")
    public ResponseEntity<?> searchByPostLocation(@RequestBody DataDTO dataDto){
        logger.info("Return all books with poster's location: " + dataDto.getValue());
        Set<Book> books = null;
        if(dataDto.getValue() == "")
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        else
            books = bookService.searchBookByPostLocation(dataDto.getValue());
        if(books.isEmpty()){
            logger.warn("Books with poster's location: "+ dataDto.getValue()+" could not be found");
            return new ResponseEntity(new CustomErrorType("Books with poster's location: "+ dataDto.getValue()+" could not be found"), HttpStatus.NOT_FOUND);
        }
        Set<BookDTO> bookDTOS = new HashSet<>();
        for (Book book : books){
            book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
            BookDTO bDto = new BookDTO();
            bDto.convertBook(book);
            bookDTOS.add(bDto);
        }
        logger.info("Return all books with poster's location: "+ dataDto.getValue() +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<Set<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books with location

    //books session
    @GetMapping("/books/suggest")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> suggestBook(Authentication auth){
        logger.info("Return all suggest books for user: " + auth.getName());
        Set<Book> books = bookService.searchBySuggest(auth.getName());
        if(books == null){
            books = bookService.getAllBook().stream().collect(Collectors.toSet());
        }
        if(books.isEmpty()){
            logger.warn("Books with poster's location: "+ auth.getName()+" could not be found");
            return new ResponseEntity(new CustomErrorType("Books with poster's location: "+ auth.getName()+" could not be found"), HttpStatus.NOT_FOUND);
        }
        List<BookDTO> bookDTOS = BookDTO.convertAllBooks(books);
        logger.info("Return all books with poster's location: "+ auth.getName() +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books with location

    //books session
    @GetMapping("/books")
    public ResponseEntity<?> getAllBooks(){
        logger.info("Return all books");
        List<Book> books = bookService.getAllBook();
        List<BookDTO> bookDTOS = new BookDTO().convertAllBooks(books.stream().collect(Collectors.toSet()));
        if(books.isEmpty()){
            logger.warn("The list of books is empty.");
            return new ResponseEntity(new CustomErrorType("The list of books is empty."), HttpStatus.OK);
        }
        logger.info("Return all books - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books

    @GetMapping("/books/{id}")
    public ResponseEntity<?> getBookById(@PathVariable("id") int id){
        logger.info("Return the single book");
        if(!bookService.isBookExist(id)){
            logger.error("Book with id: " + id + " not found.");
            return new ResponseEntity(new CustomErrorType("Unable to get. A Book with id:"
                    + id +" not exist."),HttpStatus.NOT_FOUND);
        }
        Book book = null;
        try {
            book = bookService.getBookById(id).get();
        }catch (Exception ex){
            logger.error("Exception: "+ ex.getMessage() +"\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Unable to get. A Book with id:"
                    + id +" not exist."),HttpStatus.NOT_FOUND);
        }
        BookDTO bookDTO = new BookDTO();
        bookDTO.convertBook(book);
        logger.info("Return the single book with id:" + id +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<BookDTO>(0, bookDTO), HttpStatus.OK);
    }
}
