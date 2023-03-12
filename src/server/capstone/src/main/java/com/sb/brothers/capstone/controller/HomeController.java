package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.UserDTO;
import com.sb.brothers.capstone.entities.CustomUserDetail;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.entities.Role;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.services.RoleService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {

    private Logger logger = Logger.getLogger(HomeController.class);

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    BookService bookService;

    @GetMapping({"/", "/home"})
    public ResponseEntity<?> home(Authentication auth, Model model){
        logger.info("Get Home page.");
        model.addAttribute("cartCount", GlobalData.cart.size());
        User user = (User) auth;
        if(user != null){
            user.setRoles(roleService.getAllByUserId(user.getId()));
            UserDTO userDTO = new UserDTO();
            userDTO.convertUser(user);
            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
        }
        return new ResponseEntity(new CustomErrorType(true,"return home page."), HttpStatus.OK);
    } //index
    @GetMapping("/users/add")
    public String updateUser(Model model){
        UserDTO currentUser = new UserDTO();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails && ((UserDetails) principal).getUsername() != null) {
            String currentUsername = ((UserDetails)principal).getUsername();
            User user = userService.getUserByEmail(currentUsername).get();
            currentUser.setId(user.getId());
            currentUser.setEmail(user.getEmail());
            currentUser.setPassword("");
            currentUser.setFirstName(user.getFirstName());
            currentUser.setLastName(user.getLastName());
            List<String> roleIds = new ArrayList<>();
            for (Role item:user.getRoles()) {
                roleIds.add(item.getName());
            }
            currentUser.setRoles(roleIds);
        }//get current User runtime

        model.addAttribute("userDTO", currentUser);
        return "userRoleAdd";
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
        List<Role> roles = userService.getUserById(user.getId()).get().getRoles();
        user.setRoles(roles);

        userService.updateUser(user);
        return "index";
    }

    @GetMapping("/books")
    public String books(Model model){
        model.addAttribute("cartCount", GlobalData.cart.size());
        model.addAttribute("categories", categoryService.getAllCategory());
        model.addAttribute("books", bookService.getAllBook());
        return "books";
    } //view All Books

    @GetMapping("/books/category/{id}")
    public String booksByCat(@PathVariable String id, Model model){
        model.addAttribute("cartCount", GlobalData.cart.size());
        model.addAttribute("categories", categoryService.getAllCategory());
        model.addAttribute("books", bookService.getAllBooksByCategory(id));
        return "books";
    } //view Books By Category

    @GetMapping("/books/viewBook/{id}")
    public String viewBook(@PathVariable int id, Model model){
        model.addAttribute("cartCount", GlobalData.cart.size());
        model.addAttribute("book", bookService.getBookById(id).get());
        return "viewBook";
    } //view Book Details


}
