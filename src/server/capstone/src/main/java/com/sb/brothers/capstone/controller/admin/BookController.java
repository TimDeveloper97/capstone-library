package com.sb.brothers.capstone.controller.admin;

import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.*;
import com.sb.brothers.capstone.services.*;
import com.sb.brothers.capstone.util.CustomErrorType;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Controller
@RequestMapping("/api/admin/books")
@RestController
public class BookController {
    public static String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/imgs";

    public static final Logger logger = Logger.getLogger(BookController.class);

    @Autowired
    CategoryService categoryService;

    @Autowired
    BookService bookService;

    @Autowired
    ImageService imageService;

    //books session
    @GetMapping("")
    public ResponseEntity<?> getAllBooks(Model model){
        logger.info("Return all books");
        List<Book> books = bookService.getAllBook();
        List<BookDTO> bookDTOS = new ArrayList<>();
        for (Book book : books){
            book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
            BookDTO bookDTO = new BookDTO();
            bookDTO.convertBook(book);
            bookDTOS.add(bookDTO);
        }
        if(books.isEmpty()){
            logger.warn("no content");
            return new ResponseEntity(new CustomErrorType("No content."), HttpStatus.NOT_FOUND);
        }
        logger.info("Success!");
        return new ResponseEntity<List<BookDTO>>(bookDTOS, HttpStatus.OK);
    }//view all books

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable("id") int id, Model model){
        logger.info("Return the single book");
        if(!bookService.isBookExist(id)){
            logger.error("Book with id: " + id + " not found.");
            return new ResponseEntity(new CustomErrorType("Unable to get. A Book with id:"
                    + id +" not exist."),HttpStatus.NOT_FOUND);
        }
        Book book = bookService.getBookById(id).get();
        BookDTO bookDTO = new BookDTO();
        bookDTO.convertBook(book);
        model.addAttribute("categories", categoryService.getAllCategory());
        logger.info("Success!");
        return new ResponseEntity<BookDTO>(bookDTO, HttpStatus.OK);
    }

    /*@GetMapping("/add")
    public ResponseEntity<?> addBook(Model model){
        logger.info("Create the single Book");
        model.addAttribute("categories",categoryService.getAllCategory());
        return new ResponseEntity<Book>(new Book(), HttpStatus.CREATED);
    }// form add new book*/

    @PostMapping("/add")
    public ResponseEntity<?> createNewBook(
                                           @RequestParam(name = "author", required = false) String author,
                                           @RequestParam(name = "publisher", required = false) String publisher,
                                           @RequestParam(name = "description", required = false) String description,
                                           @RequestParam(name = "publishYear", required = false) Integer publishYear,
                                           @RequestParam(name = "name", required = false) String name,
                                           @RequestParam(name = "price", required = false) double price,
                                           @RequestParam(name = "quantity", required = false) int quantity,
                                           @RequestParam(name = "categories", required = false) String categories,
                             @RequestParam(value = "bookImage", required = false) MultipartFile fileBookImage) {
        logger.info("Creating Book:" + name);
        /*if(bookService.isBookExist(book.getId())){
            logger.error("Unable to create. A book with name:"
                    + book.getId() +" already exist.");
            return new ResponseEntity(new CustomErrorType("Unable to create. A Book with name:"
                    + book.getId() +" already exist."), HttpStatus.CONFLICT);
        }*/
        Book book = new Book();
        book.setAuthor(author);
        book.setPublisher(publisher);
        book.setPublishYear(publishYear);
        book.setDescription(description);
        book.setName(name);
        book.setPrice(price);
        book.setQuantity(quantity);
        String imageUUID = "";
        Set<Image> images = new HashSet<>();
        Image img = new Image();
        if(!fileBookImage.isEmpty()){
            imageUUID = fileBookImage.getOriginalFilename();
            Path fileNameAndPath = Paths.get(uploadDir, imageUUID);
            try {
                Files.write(fileNameAndPath, fileBookImage.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity(new CustomErrorType("Unable get data from input file"), HttpStatus.CHECKPOINT);
            }
            img.setLink(imageUUID);
            images.add(img);
            book.setImages(images);
        }
        img.setBook(book);
        String[] arrCats = categories.split("\\,");
        Set<Category> categorySet = new HashSet<>();
        for (String catName: arrCats) {
            if(categoryService.isCategoryExist(catName)){
                categorySet.add(categoryService.getCategoryById(catName).get());
            }
            else {
                return new ResponseEntity(new CustomErrorType("Category has name: "+ catName +" not found."), HttpStatus.NOT_FOUND);
            }
        }
        book.setCategories(categorySet);
        bookService.updateBook(book);
        imageService.update(img);
        BookDTO bookDTO = new BookDTO();
        bookDTO.convertBook(book);
        logger.info("Create new book - Success!");
        return new ResponseEntity(new CustomErrorType("No error. Create book - SUCCESS"), HttpStatus.CREATED);
    }//form add new book > do add

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id){
        logger.info("Fetching & Deleting book with id" + id);
        if(!bookService.isBookExist(id)){
            logger.error("Book with id:"+ id +" not found. Unable to delete.");
            return new ResponseEntity(new CustomErrorType("Book with id:"+ id +" not found. Unable to delete."),
                    HttpStatus.NOT_FOUND);
        }
        try {
            bookService.removeBookById(id);
        }
        catch (Exception e){
            logger.error("Book with id:"+ id +" has been ordered or posted. Unable to delete.");
            return new ResponseEntity(new CustomErrorType("Book with id:" + id +" has been ordered or posted. Unable to delete."),
                    HttpStatus.NOT_FOUND);
        }
        logger.info("Delete book - Success!");
        return new ResponseEntity(new CustomErrorType("No error. Delete book - SUCCESS"), HttpStatus.FOUND);
    }//delete 1 book

    @PutMapping("/update")
    public ResponseEntity<?> updateBook( @RequestBody BookDTO bookDto){
        Book currBook = bookService.getBookById(bookDto.getId()).get();
        if (currBook == null) {
            logger.error("Book with id:"+ bookDto.getId() +" not found. Unable to update.");
            return new ResponseEntity(new CustomErrorType("Book with id:"+ bookDto.getId() +" not found. Unable to update."),
                    HttpStatus.NOT_FOUND);
        }
        currBook.setName(bookDto.getName());
        currBook.setPublisher(bookDto.getPublisher());
        currBook.setPrice(bookDto.getPrice());
        currBook.setDescription(bookDto.getDescription());
        currBook.setPublishYear(bookDto.getPublishYear());
        Set<Category> catSet = new HashSet<>();
        for (String nameCode: bookDto.getCategories()){
            if(categoryService.isCategoryExist(nameCode)){
                catSet.add(categoryService.getCategoryById(nameCode).get());
            }
            else{
                logger.error("Book with id:"+ bookDto.getId() +" found. Unable to update because category has name:" + nameCode +" is not exist.");
                return new ResponseEntity(new CustomErrorType("Book with id:"+ bookDto.getId()
                        +" found. Unable to update because category has name:" + nameCode +" is not exist."), HttpStatus.NOT_FOUND);
            }
        }
        currBook.setCategories(catSet);
        currBook.setQuantity(bookDto.getQuantity());
        logger.info("Fetching & Updating Book with id: "+ bookDto.getId());
        try {
            bookService.updateBook(currBook);
        }catch (Exception e){
            logger.error("Book with id:"+ bookDto.getId() +" found but Unable to update.");
            return new ResponseEntity(new CustomErrorType("Book with id:"+ bookDto.getId() +" found but Unable to update."),
                    HttpStatus.FOUND);
        }
        logger.info("Update book - Success");
        return new ResponseEntity(new CustomErrorType("No error. Update book - SUCCESS"), HttpStatus.CREATED);
    }//form edit book, fill old data into form
}
