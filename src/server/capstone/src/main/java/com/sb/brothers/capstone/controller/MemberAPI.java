package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.JWTFilter;
import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.RentDto;
import com.sb.brothers.capstone.services.PostService;
import com.sb.brothers.capstone.util.ResData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MemberAPI {

    private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);

    @Autowired
    private PostService postService;

    //books session
    @GetMapping("/rent-book")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getAllBooks(Authentication auth, @RequestBody RentDto rentDto){
        logger.info("Return rent books");
        List<BookDTO> bookDTOS = new ArrayList<>();

        logger.info("Return all books - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<BookDTO>>(0, bookDTOS), HttpStatus.OK);
    }//view all books

}
