package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.util.CustomErrorType;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    private Logger logger = Logger.getLogger(CartController.class);

    @Autowired
    BookService bookService;

    @GetMapping("/cart")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> cartGet(Authentication auth){
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list == null || list.isEmpty()){
            return new ResponseEntity<>(new CustomErrorType("Cart of user with id:" + auth.getName() +" is empty."), HttpStatus.OK);
        }
        return new ResponseEntity<>(GlobalData.cart.get(auth.getName()), HttpStatus.OK);
    }//page cart

    @PutMapping("/order-books")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> addToCart(Authentication auth, @RequestBody PostDto orderDto){
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list == null)
            list = new ArrayList<>();
        list.add(orderDto);
        GlobalData.cart.put(auth.getName(), list);
        return new ResponseEntity(new CustomErrorType(true, "Add to cart - SUCCESS."), HttpStatus.CREATED);
    }//click add from page viewProduct

    @DeleteMapping("/cart/remove-item/")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> cartItemRemove(Authentication auth, @RequestBody PostDto postDto){
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list != null) {
            try {
                GlobalData.cart.get(auth.getName()).removeIf(n -> (n.getId() == postDto.getId()));
            }catch (Exception ex){
                logger.error("This item not exists in your cart.");
                return new ResponseEntity<>(new CustomErrorType("This item not exists in your cart."), HttpStatus.OK);
            }
            return new ResponseEntity(new CustomErrorType(true, "Remove item - SUCCESS."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("No item in your cart."), HttpStatus.OK);
    } // delete 1 product
}
