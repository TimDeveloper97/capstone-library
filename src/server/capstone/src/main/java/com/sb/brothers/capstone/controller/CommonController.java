package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.NotificationDto;
import com.sb.brothers.capstone.entities.Notification;
import com.sb.brothers.capstone.services.*;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
public class CommonController {

    private Logger logger = Logger.getLogger(CommonController.class);

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = null;

        // Try to determine file's content type
        String contentType = null;
        try {
            String uploadDir = new File(".").getCanonicalPath() + "\\images\\";
            resource = new FileUrlResource(uploadDir+fileName);
            /*System.out.println("_----------------------------------------");
            System.out.println(uploadDir+fileName);
            System.out.println("------------------------------------------");*/
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (Exception ex) {
            logger.info("Could not determine file type. " + ex.getMessage() +".\n"+ex.getCause());
            return new ResponseEntity(new CustomErrorType("File not found " + fileName), HttpStatus.OK);
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/api/notification")
    public ResponseEntity<?> getAllNotification(Authentication auth){
        logger.info("Return all notification.");
        List<Notification> notifications = null;
        try{
            notifications = notificationService.getAllNotification(auth.getName());
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Get all notification with exception. No content to return."), HttpStatus.OK);
        }
        if(notifications.isEmpty()){
            logger.warn("There are no notification.");
            return new ResponseEntity<>(new CustomErrorType("There are no notification."), HttpStatus.OK);
        }
        List<NotificationDto> ntfDtos = new ArrayList<>();
        notifications.stream().forEach(ntf -> {
            NotificationDto ntfDto = new NotificationDto();
            ntfDto.convertNotification(ntf);
            ntfDtos.add(ntfDto);
        });
        return new ResponseEntity<>(new ResData<List<NotificationDto>>(0, ntfDtos), HttpStatus.OK);
    }//view all posts

    /**
     * @TODO api xac nhan lay sach
     *       api tra sach
     *
     */

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/api/notification/{id}")
    public ResponseEntity<?> seenNotification(Authentication auth, @PathVariable("id") int id){
        logger.info("Return all notification.");
        Notification notification = null;
        try{
            notification = notificationService.getNotificationById(id).get();
            if(notification.getUser().getId().compareTo(auth.getName()) == 0) {
                notificationService.update(id);
            }
            else throw new Exception("Notification not sent to user with id:"+ auth.getName());
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Get all notification with exception. No content to return."), HttpStatus.OK);
        }
        if(notification == null){
            logger.warn("There are no notification.");
            return new ResponseEntity<>(new CustomErrorType("There are no notification."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Change notification status - SUCCESS."), HttpStatus.OK);
    }//view all posts
}
