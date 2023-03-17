package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.util.CustomErrorType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ AccessDeniedException.class })
    public ResponseEntity<Object> handleAccessDeniedException(
            Exception ex, WebRequest request) {
        return new ResponseEntity<>(
                new CustomErrorType("Full authentication is required to access this resource."), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({AuthorizationServiceException.class})
    public ResponseEntity<Object> handleAuthenticationEntryPoint(
            Exception ex, WebRequest request) {
        return new ResponseEntity<>(
                new CustomErrorType(ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }
}
