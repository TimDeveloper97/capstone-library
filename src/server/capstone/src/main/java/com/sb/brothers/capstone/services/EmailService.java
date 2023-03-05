package com.sb.brothers.capstone.services;

public interface EmailService {

    public void sendMessage(String to, String subject, String text, String pathToAttachment);

}
