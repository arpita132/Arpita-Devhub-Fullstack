package com.arpita.devhub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, String> index() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "Online");
        response.put("project", "Arpita's DevHub API");
        response.put("author", "Arpita");
        response.put("message", "Welcome to the DevHub API. Access courses at /api/courses");
        return response;
    }
}
