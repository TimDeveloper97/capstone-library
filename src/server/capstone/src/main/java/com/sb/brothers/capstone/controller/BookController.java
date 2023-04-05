package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.TokenProvider;
import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.ImageDto;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Category;
import com.sb.brothers.capstone.entities.Image;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.services.ImageService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/books")
@RestController
public class BookController {
    public static String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/imgs";

    public static final Logger logger = Logger.getLogger(BookController.class);

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BookService bookService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> createNewBook(Authentication auth, @RequestBody BookDTO bookDto) {
        logger.info("Creating Book:" + bookDto.getName());
        Book book = new Book();
        bookDto.convertBookDto(book);
        Set<Category> categorySet = new HashSet<>();

        for (String catName: bookDto.getCategories()) {
            if(categoryService.isCategoryExist(catName)){
                categorySet.add(categoryService.getCategoryById(catName).get());
            }
            else {
                return new ResponseEntity(new CustomErrorType("Thể loại sách: "+ catName +" không tồn tại."), HttpStatus.OK);
            }
        }
        book.setCategories(categorySet);
        book.setUser(userService.getUserById(auth.getName()).get());
        if(tokenProvider.getRoles(auth).contains("ROLE_ADMIN")){
            book.setInStock(book.getQuantity());
            book.setQuantity(0);
        }
        bookService.updateBook(book);
        addImages(bookDto, book);
        logger.info("Create new book - Success!");
        return new ResponseEntity(new CustomErrorType(true, "Đã thêm sách thành công"), HttpStatus.CREATED);
    }//form add new book > do add

    //books session
    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllBooksByUserId(Authentication auth){
        logger.info("Return list books");
        Set<Book> books = bookService.getListBooksOfUserId(auth.getName());
        for (Book book : books){
            book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
        }
        if(books.isEmpty()){
            logger.warn("This user's book list is empty.");
            return new ResponseEntity<>(new CustomErrorType("Kho sách của bạn trống."), HttpStatus.OK);
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


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUser(Authentication auth, @PathVariable("id") int id){
        logger.info("Fetching & Deleting book with id" + id);
        try {
            Set<Book> books = bookService.getListBooksOfUserId(auth.getName());
            if(books.stream().filter(b -> (b.getId() == id)).collect(Collectors.toSet()).isEmpty()){
                logger.error("Book with id:"+ id +" not found. Unable to delete.");
                return new ResponseEntity(new CustomErrorType("Người dùng có id:"+ auth.getName() +" không sở hữu cuốn sách này. Xóa sách không thành công."),
                        HttpStatus.OK);
            }
            else bookService.removeBookById(id);
        }
        catch (Exception e){
            logger.error("Book with id:"+ id +" has been ordered or posted. Unable to delete.");
            return new ResponseEntity(new CustomErrorType("Cuốn sách có id:" + id +" đã được đặt hàng hoặc đăng cho thuê/ ký gửi. Xóa sách không thành công."),
                    HttpStatus.OK);
        }
        logger.info("Delete book - Success!");
        return new ResponseEntity(new CustomErrorType(true, "Delete book - SUCCESS"), HttpStatus.FOUND);
    }//delete 1 book


    //books session
    @GetMapping("")
    public ResponseEntity<?> getAllBooks(){
        logger.info("Return all books");
        List<Book> books = bookService.getAllBook();
        List<BookDTO> bookDTOS = new BookDTO().convertAllBooks(books.stream().collect(Collectors.toSet()));
        if(books.isEmpty()){
            logger.warn("The list of books is empty.");
            return new ResponseEntity(new CustomErrorType("Kho sách trống."), HttpStatus.OK);
        }
        logger.info("Return all books - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable("id") int id){
        logger.info("Return the single book");
        if(!bookService.isBookExist(id)){
            logger.error("Book with id: " + id + " not found.");
            return new ResponseEntity(new CustomErrorType("Không tìm thấy cuốn sách có mã:"
                    + id),HttpStatus.OK);
        }
        Book book = null;
        try {
            book = bookService.getBookById(id).get();
        }catch (Exception ex){
            logger.error("Exception: "+ ex.getMessage() +"\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Không tìm thấy cuốn sách có mã:" + id),HttpStatus.OK);
        }
        BookDTO bookDTO = new BookDTO();
        bookDTO.convertBook(book);
        logger.info("Return the single book with id:" + id +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<BookDTO>(0, bookDTO), HttpStatus.OK);
    }

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
            return new ResponseEntity(new CustomErrorType("Người dùng có id:"+ auth.getName() +" không sở hữu cuốn sách này."),
                    HttpStatus.OK);
        }
        Book currBook = books.iterator().next();
        if (currBook == null) {
            logger.error("Book with id:"+ bookDto.getId() +" not found. Unable to update.");
            return new ResponseEntity(new CustomErrorType("Cuốn sách có tên:'"+ bookDto.getName() +"' không tồn tại. Cập nhật thông tin sách không thành công."),
                    HttpStatus.OK);
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
                return new ResponseEntity(new CustomErrorType("Cuốn sách có mã:"+ bookDto.getId()
                        +" cập nhật không thành công do thể loại sách:" + nameCode +" không đúng."), HttpStatus.OK);
            }
        }
        currBook.setCategories(catSet);
        currBook.setQuantity(bookDto.getQuantity());
        currBook.setUser(userService.getUserById(auth.getName()).get());
        logger.info("Fetching & Updating Book with id: "+ bookDto.getId());
        try {
            bookService.updateBook(currBook);
            addImages(bookDto, currBook);
        }catch (Exception e){
            logger.error("Book with id:"+ bookDto.getId() +" found but Unable to update.");
            return new ResponseEntity(new CustomErrorType("Cuốn sách có mã:"+ bookDto.getId() +" xảy ra lỗi khi cập nhật."),
                    HttpStatus.OK);
        }
        logger.info("Update book - Success");
        return new ResponseEntity(new CustomErrorType(true, "Cập nhật thông tin sách thành công."), HttpStatus.CREATED);
    }//form edit book, fill old data into form


    void addImages(BookDTO bookDto, Book currBook){
        try {
            for (ImageDto img : bookDto.getImgs()) {
                Image image = new Image();
                try {
                    byte[] decodedBytes = Base64.getDecoder().decode(img.getData());
                    Date d = new Date();
                    String link[] = img.getFileName().split("\\.");
                    uploadDir = new File(".").getCanonicalPath() + "/images";
                    File directory = new File(uploadDir);
                    if (! directory.exists()){
                        directory.mkdir();
                        // If you require it to make the entire directory path including parents,
                        // use directory.mkdirs(); here instead.
                    }
                    Path fileNameAndPath = Paths.get(uploadDir, ( d.getTime() +"." + link[link.length - 1]));
                    Files.write(fileNameAndPath, decodedBytes);
                    image.setBook(currBook);
                    image.setLink("/images/"+(d.getTime() +"." + link[link.length - 1]));
                    imageService.update(image);
                }
                catch (Exception e){
                    logger.error("File or path not exists.");
                }
            }
        }catch (Exception e){
            logger.warn("Image is empty.");
        }
    }
}
