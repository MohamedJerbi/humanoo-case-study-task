package com.example.backend.service;

import com.example.backend.dto.ActivityRequest;
import com.example.backend.dto.ActivityResponse;

import java.util.List;
import java.util.UUID;

public interface ActivityService {
    List<ActivityResponse> findAll();
    ActivityResponse findById(UUID id);
    ActivityResponse create(ActivityRequest request);
    ActivityResponse update(UUID id, ActivityRequest request);
    void delete(UUID id);
}
