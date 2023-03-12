package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Component
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    /**
     * @funcion sendMessage
     * @param to
     * @param subject
     * @param text
     * @param pathToAttachment if(path != null) send mail with attachment and else.
     */

    @Override
    public void sendMessage(
            String to, String subject,
            String text, String pathToAttachment) {

        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            if(pathToAttachment != null) {
                FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
                helper.addAttachment(file.getFilename(), file);
            }
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        emailSender.send(message);
    }
}