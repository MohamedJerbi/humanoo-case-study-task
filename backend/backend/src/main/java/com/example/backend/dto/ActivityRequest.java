package com.example.backend.dto;

import com.example.backend.domain.Category;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

public record ActivityRequest(
        @NotBlank String title,
        @NotNull Category category,
        @NotNull @Min(1) Integer durationMinutes,
        @NotNull @Min(1) @Max(3) Integer difficulty,
        @NotNull LocalDate scheduleDate,
        @NotNull @Size(min = 0) List<@NotBlank String> equipments
) {}
