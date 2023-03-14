package com.sb.brothers.capstone.controller.admin;

import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Category;
import com.sb.brothers.capstone.entities.Image;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.services.ImageService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/books")
@RestController
public class BookController {
    //public static String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/imgs";

    public static final Logger logger = Logger.getLogger(BookController.class);

    @Autowired
    CategoryService categoryService;

    @Autowired
    BookService bookService;

    @Autowired
    ImageService imageService;

    @Autowired
    private UserService userService;

    /*@PostMapping("/add")
    public ResponseEntity<?> createNewBook(
               @RequestParam(name = "author", required = false) String author,
               @RequestParam(name = "publisher", required = false) String publisher,
               @RequestParam(name = "description", required = false) String description,
               @RequestParam(name = "publishYear", required = false) Integer publishYear,
               @RequestParam(name = "name", required = false) String name,
               @RequestParam(name = "price", required = false) double price,
               @RequestParam(name = "quantity", required = false) int quantity,
               @RequestParam(name = "categories", required = false) String categories,
               @RequestParam(value = "bookImage", required = false) MultipartFile fileBookImage,
               @RequestParam(value = "bookImage1", required = false) MultipartFile fileBookImage1,
               @RequestParam(value = "bookImage2", required = false) MultipartFile fileBookImage2,
               @RequestParam(value = "bookImage3", required = false) MultipartFile fileBookImage3,
               @RequestParam(value = "bookImage4", required = false) MultipartFile fileBookImage4) {
        logger.info("Creating Book:" + name);
        Book book = new Book();
        book.setAuthor(author);
        book.setPublisher(publisher);
        book.setPublishYear(publishYear);
        book.setDescription(description);
        book.setName(name);
        book.setPrice(price);
        book.setQuantity(quantity);
        Set<Image> images = new HashSet<>();
        String[] arrCats = categories.split("\\,");
        Set<Category> categorySet = new HashSet<>();

        byte[] fileContent = FileUtils.readFileToByteArray(new File("C:\\Users\\son-28f\\Pictures\\thanh_giong.jpeg"));
        String encodedString = Base64.getEncoder().encodeToString(fileContent);

        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        FileUtils.writeByteArrayToFile(new File("C:\\Users\\son-28f\\Pictures\\thanh_giong2.jpeg"), decodedBytes);

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
        if(fileBookImage != null && !fileBookImage.isEmpty()) {
            Image img = addImages(fileBookImage, images, book);
            imageService.update(img);
        }
        if(fileBookImage1 != null && !fileBookImage1.isEmpty()) {
            Image img1 = addImages(fileBookImage1, images, book);
            imageService.update(img1);
        }
        if(fileBookImage2 != null && !fileBookImage2.isEmpty()) {
            Image img2 = addImages(fileBookImage2, images, book);
            imageService.update(img2);
        }
        if(fileBookImage3 != null && !fileBookImage3.isEmpty()) {
            Image img3 = addImages(fileBookImage3, images, book);
            imageService.update(img3);
        }
        if(fileBookImage4 != null && !fileBookImage4.isEmpty()) {
            Image img4 = addImages(fileBookImage4, images, book);
            imageService.update(img4);
        }
        book.setImages(images);
        BookDTO bookDTO = new BookDTO();
        bookDTO.convertBook(book);
        logger.info("Create new book - Success!");
        return new ResponseEntity(new CustomErrorType(true, "Create book - SUCCESS"), HttpStatus.CREATED);
    }//form add new book > do add*/

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> createNewBook(Authentication auth, @RequestBody BookDTO bookDto) {
        logger.info("Creating Book:" + bookDto.getName());
        Book book = new Book();
        bookDto.convertBookDto(book);

        Set<Image> images = new HashSet<>();
        Set<Category> categorySet = new HashSet<>();

        for (String catName: bookDto.getCategories()) {
            if(categoryService.isCategoryExist(catName)){
                categorySet.add(categoryService.getCategoryById(catName).get());
            }
            else {
                return new ResponseEntity(new CustomErrorType("Category has name: "+ catName +" not found."), HttpStatus.NOT_FOUND);
            }
        }
        book.setCategories(categorySet);
        book.setUser(userService.getUserById(auth.getName()).get());
        bookService.updateBook(book);
        try {
            for (String img : bookDto.getImgs()) {
                Image image = new Image();
                image.setBook(book);
                image.setLink(img);
                imageService.update(image);
                images.add(image);
            }
        }catch (Exception e){
            logger.warn("Image is empty.");
        }
        book.setImages(images);
        BookDTO bookDTO = new BookDTO();
        bookDTO.convertBook(book);
        logger.info("Create new book - Success!");
        return new ResponseEntity(new CustomErrorType(true, "Create book - SUCCESS"), HttpStatus.CREATED);
    }//form add new book > do add

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUser(Authentication auth, @PathVariable("id") int id){
        logger.info("Fetching & Deleting book with id" + id);
        try {
            Set<Book> books = bookService.getListBooksOfUserId(auth.getName());
            if(books.stream().filter(b -> (b.getId() == id)).collect(Collectors.toSet()).isEmpty()){
                logger.error("Book with id:"+ id +" not found. Unable to delete.");
                return new ResponseEntity(new CustomErrorType("Use with id:"+ auth.getName() +" does not have this book."),
                        HttpStatus.OK);
            }
            else bookService.removeBookById(id);
        }
        catch (Exception e){
            logger.error("Book with id:"+ id +" has been ordered or posted. Unable to delete.");
            return new ResponseEntity(new CustomErrorType("Book with id:" + id +" has been ordered or posted. Unable to delete."),
                    HttpStatus.OK);
        }
        logger.info("Delete book - Success!");
        return new ResponseEntity(new CustomErrorType(true, "Delete book - SUCCESS"), HttpStatus.FOUND);
    }//delete 1 book

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> updateBook(Authentication auth, @RequestBody BookDTO bookDto){
        Set<Book> books = null;
        try {
            books = bookService.getListBooksOfUserId(auth.getName());
            books = books.stream().filter(b -> (b.getId() == bookDto.getId())).collect(Collectors.toSet());
        }catch (Exception ex){
            return new ResponseEntity(new CustomErrorType(ex.getMessage() + ".\n" + ex.getCause()),
                    HttpStatus.OK);
        }
        if(books == null || books.isEmpty()){
            logger.error("Book with id:"+ bookDto.getId() +" not found. Unable to update.");
            return new ResponseEntity(new CustomErrorType("Use with id:"+ auth.getName() +" does not have this book."),
                    HttpStatus.OK);
        }
        Book currBook = books.iterator().next();
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
                        +" found. Unable to update because category has name:" + nameCode +" is not exist."), HttpStatus.OK);
            }
        }
        currBook.setCategories(catSet);
        currBook.setQuantity(bookDto.getQuantity());
        currBook.setUser(userService.getUserById(auth.getName()).get());
        logger.info("Fetching & Updating Book with id: "+ bookDto.getId());
        try {
            bookService.updateBook(currBook);
        }catch (Exception e){
            logger.error("Book with id:"+ bookDto.getId() +" found but Unable to update.");
            return new ResponseEntity(new CustomErrorType("Book with id:"+ bookDto.getId() +" found but Unable to update."),
                    HttpStatus.FOUND);
        }
        logger.info("Update book - Success");
        return new ResponseEntity(new CustomErrorType(true, "Update book - SUCCESS"), HttpStatus.CREATED);
    }//form edit book, fill old data into form
/*
    Image addImages(MultipartFile fileBookImage, Set<Image> images, Book book){
        Image img = new Image();
        String imageUUID = fileBookImage.getOriginalFilename();
        Path fileNameAndPath = Paths.get(uploadDir, imageUUID);
        try {
            Files.write(fileNameAndPath, fileBookImage.getBytes());
        } catch (IOException e) {
            logger.error("IOException:" + e.getMessage() +".\n" + e.getCause());
        }
        img.setLink(imageUUID);
        images.add(img);
        img.setBook(book);
        return img;
    }*/
}
