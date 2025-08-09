package com.example.backend.controller;

import com.example.backend.dto.ActivityRequest;
import com.example.backend.dto.ActivityResponse;
import com.example.backend.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService service;

    @GetMapping
    public List<ActivityResponse> list() {
        return service.findAll();
    }

    @GetMapping("{id}")
    public ActivityResponse get(@PathVariable UUID id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ActivityResponse create(@RequestBody @Valid ActivityRequest request) {
        return service.create(request);
    }

    @PutMapping("{id}")
    public ActivityResponse update(@PathVariable UUID id, @RequestBody @Valid ActivityRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
