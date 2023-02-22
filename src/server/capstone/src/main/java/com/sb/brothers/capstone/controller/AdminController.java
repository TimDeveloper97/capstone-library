package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.Category;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Role;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.RoleService;
import com.sb.brothers.capstone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/admin")
@RestController
public class AdminController {
    public static String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/bookImages";
    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    CategoryService categoryService;

    @Autowired
    BookService bookService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @GetMapping("")
    public String adminHome(){
        return "adminHome";
    }//page admin home

    //Accounts
    @GetMapping("/users")
    public List<User> getAcc(Model model){
        //model.addAttribute("users", userService.getAllUser());
        //model.addAttribute("roles", roleService.getAllRole());
        return userService.getAllUser();
    }
    @GetMapping("/users/add")
    public UserDTO getUserAdd(Model model){
        //model.addAttribute("userDTO", new UserDTO());
        model.addAttribute("roles",roleService.getAllRole());
        return new UserDTO();
    }
    @PostMapping("/users/add")
    public String postUserAdd(@ModelAttribute("userDTO") UserDTO userDTO) {
        //convert dto > entity
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        List<Role> roles = new ArrayList<>();
        for (String item: userDTO.getRoleIds()) {
            roles.add(roleService.findRoleById(item).get());
        }
        user.setRoles(roles);

        userService.updateUser(user);
        return "redirect:/users";
    }
    @GetMapping("/users/delete/{id}")
    public String deleteUser(@PathVariable String id){
        userService.removeUserById(id);
        return "redirect:/admin/users";
    }//delete 1 user

    @GetMapping("/users/update/{id}")
    public String updateUser(@PathVariable String id, Model model){
        Optional<User> opUser = userService.getUserById(id);
        if (opUser.isPresent()){
            User user = opUser.get();
            //convert entity > dto
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setEmail(user.getEmail());
            userDTO.setPassword("");
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            List<Integer> roleIds = new ArrayList<>();
            for (Role item:user.getRoles()) {
                roleIds.add(item.getId());
            }

            model.addAttribute("userDTO", userDTO);
            model.addAttribute("roles", roleService.getAllRole());
            return "usersAdd";
        }else {
            return "404";
        }

    }

    //Categories session
    @GetMapping("/categories")
    public String getCat(Model model){
        model.addAttribute("categories", categoryService.getAllCategory());
        return "categories";
    }//view all categories

    @GetMapping("/categories/add")
    public String getCatAdd(Model model){
        model.addAttribute("category", new Category());
        return "categoriesAdd";
    }//form add new category

    @PostMapping("/categories/add")
    public String postCatAdd(@ModelAttribute("category") Category category){
        categoryService.updateCategory(category);
        return "redirect:/admin/categories";
    }//form add new category > do add

    @GetMapping("/categories/delete/{id}")
    public String deleteCat(@PathVariable int id){
        categoryService.removeCategoryById(id);
        return "redirect:/admin/categories";
    }//delete 1 category

    @GetMapping("/categories/update/{id}")
    public String updateCat(@PathVariable int id, Model model){
        Optional<Category> category = categoryService.getCategoryById(id);
        if(category.isPresent()){
            model.addAttribute("category", category.get());
            return "categoriesAdd";
        }else {
            return "404";
        }
    }//form edit category, fill old data into form

    //books session
    @GetMapping("/books")
    public String getPro(Model model){
        model.addAttribute("books", bookService.getAllBook());
        return "books";
    }//view all books

    @GetMapping("/books/add")
    public String getProAdd(Model model){
        model.addAttribute("bookDTO", new BookDTO());
        model.addAttribute("categories", categoryService.getAllCategory());
        return "booksAdd";
    }// form add new book

    @PostMapping("/books/add")
    public String postProAdd(@ModelAttribute("bookDTO") BookDTO bookDTO,
                             @RequestParam("bookImage") MultipartFile fileBookImage,
                             @RequestParam("imgName") String imgName) throws IOException {
        //convert dto > entity
        Book book = new Book();
        book.setId(bookDTO.getId());
        book.setName(bookDTO.getName());
        book.setCategoryId(bookDTO.getCategoryId());
        book.setPrice(bookDTO.getPrice());
        book.setDescription(bookDTO.getDescription());
        String imageUUID;
        if(!fileBookImage.isEmpty()){
            imageUUID = fileBookImage.getOriginalFilename();
            Path fileNameAndPath = Paths.get(uploadDir, imageUUID);
            Files.write(fileNameAndPath, fileBookImage.getBytes());
        }else {
            imageUUID = imgName;
        }//save image
        book.setImageName(imageUUID);

        bookService.updateBook(book);
        return "redirect:/admin/books";
    }//form add new book > do add

    @GetMapping("/books/delete/{id}")
    public String deletePro(@PathVariable int id){
        bookService.removeBookById(id);
        return "redirect:/admin/books";
    }//delete 1 book

    @GetMapping("/books/update/{id}")
    public String updatePro(@PathVariable int id, Model model){
        Optional<Book> opBook = bookService.getBookById(id);
        if (opBook.isPresent()){
            Book book = opBook.get();
            //convert entity > dto
            BookDTO bookDTO = new BookDTO();
            bookDTO.setId(book.getId());
            bookDTO.setName(book.getName());
            bookDTO.setCategoryId(book.getCategoryId());
            bookDTO.setPrice(book.getPrice());
            bookDTO.setDescription(book.getDescription());
            bookDTO.setImageName(book.getImageName());

            model.addAttribute("bookDTO", bookDTO);
            model.addAttribute("categories", categoryService.getAllCategory());
            return "booksAdd";
        }else {
            return "404";
        }

    }//form edit book, fill old data into form
}
