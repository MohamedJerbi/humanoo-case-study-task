package com.example.backend.dto;

import com.example.backend.domain.Category;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record ActivityResponse(
        UUID id,
        String title,
        Category category,
        Integer durationMinutes,
        Integer difficulty,
        LocalDate scheduleDate,
        List<String> equipments,
        Instant createdAt,
        Instant updatedAt
) {}
