package com.sb.brothers.capstone.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sb.brothers.capstone.configuration.jwt.JWTFilter;
import com.sb.brothers.capstone.configuration.jwt.TokenProvider;
import com.sb.brothers.capstone.dto.LoginDto;
import com.sb.brothers.capstone.dto.LoginRespDto;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResLoginData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class AuthenticationRestController {

   @Autowired
   private UserService userService;

   private final TokenProvider tokenProvider;

   private final AuthenticationManagerBuilder authenticationManagerBuilder;

   public AuthenticationRestController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
      this.tokenProvider = tokenProvider;
      this.authenticationManagerBuilder = authenticationManagerBuilder;
   }

   @PostMapping("/login")
   public ResponseEntity<?> authorize(@Valid @RequestBody LoginDto loginDto) {

      UsernamePasswordAuthenticationToken authenticationToken =
         new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
      Authentication authentication = null;
      try {
         authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
      }catch (BadCredentialsException ex){
         return new ResponseEntity(new CustomErrorType("Username or password not correct."), HttpStatus.NOT_FOUND);
      }
      GlobalData.mapCurrPass.put(loginDto.getUsername(), loginDto.getPassword());
      SecurityContextHolder.getContext().setAuthentication(authentication);
      boolean rememberMe = (loginDto.isRememberMe() == null) ? false : loginDto.isRememberMe();
      String jwt = tokenProvider.createToken(authentication, rememberMe);
      LoginRespDto respDto = new LoginRespDto();
      respDto.convertUser(userService.getUserById(authentication.getName()).get());
      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
      return new ResponseEntity<>(new ResLoginData(0,respDto , jwt), httpHeaders, HttpStatus.OK);
   }

   /**
    * Object to return as body in JWT Authentication.
    */
   static class JWTToken {

      private String idToken;

      JWTToken(String idToken) {
         this.idToken = idToken;
      }

      @JsonProperty("token")
      String getIdToken() {
         return idToken;
      }

      void setIdToken(String idToken) {
         this.idToken = idToken;
      }
   }
}
