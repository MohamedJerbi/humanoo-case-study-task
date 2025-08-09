package com.example.backend.service;

import com.example.backend.domain.Activity;
import com.example.backend.domain.Category;
import com.example.backend.dto.ActivityRequest;
import com.example.backend.repository.ActivityRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class ActivityServiceImplTest {

    ActivityRepository repo = mock(ActivityRepository.class);
    ActivityService service = new ActivityServiceImpl(repo);

    @Test
    void creates_activity() {
        var req = new ActivityRequest("Yoga", Category.FITNESS, 30, 2, LocalDate.parse("2025-08-10"), List.of("Mat"));
        when(repo.save(any())).thenAnswer(inv -> {
            Activity activity = inv.getArgument(0);
            activity.setId(UUID.randomUUID());
            return activity;
        });

        var res = service.create(req);

        assertThat(res.id()).isNotNull();
        assertThat(res.title()).isEqualTo("Yoga");
    }

    @Test
    void findById_throws_when_missing() {
        var id = UUID.randomUUID();
        when(repo.findById(id)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.findById(id))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("not found");
    }
}
