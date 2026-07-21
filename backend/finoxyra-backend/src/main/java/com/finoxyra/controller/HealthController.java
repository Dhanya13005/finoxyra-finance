package com.finoxyra.controller;

import com.finoxyra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class HealthController {

    private final UserRepository userRepository;

    @GetMapping("/api/health")
    public Map<String, Object> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("service", "Finoxyra Backend");
        status.put("status", "UP");
        long userCount = userRepository.count();
        status.put("database", "CONNECTED");
        status.put("userCount", userCount);
        return status;
    }
}
