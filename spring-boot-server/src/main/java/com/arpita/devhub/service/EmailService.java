package com.arpita.devhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Arpita's DevHub - Verification Code");
        message.setText("Welcome to Arpita's DevHub!\n\nYour one-time password (OTP) for verification is: " + otp + "\n\nPlease enter this code to complete your action.\n\nBuilt with excellence by Arpita.");
        mailSender.send(message);
    }
}
