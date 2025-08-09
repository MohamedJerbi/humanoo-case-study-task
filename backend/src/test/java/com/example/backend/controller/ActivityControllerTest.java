package com.example.backend.controller;

import com.example.backend.domain.Category;
import com.example.backend.dto.ActivityResponse;
import com.example.backend.service.ActivityService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ActivityController.class) // use your controller class here
class ActivityControllerTest {

    @Autowired MockMvc mvc;
    @MockitoBean
    ActivityService service;

    @Test
    void list_ok() throws Exception {
        var activity = new ActivityResponse(UUID.randomUUID(),"Yoga", Category.FITNESS,30,2,
                LocalDate.parse("2025-08-10"), List.of("Mat"), Instant.now(), Instant.now());
        when(service.findAll()).thenReturn(List.of(activity));

        mvc.perform(get("/api/activities"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Yoga"));
    }

    @Test
    void create_validation_error() throws Exception {
        mvc.perform(post("/api/activities")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
          {"title":"","category":"FITNESS","durationMinutes":0,"difficulty":4,
           "scheduleDate":"2025-08-10","equipments":[]}
        """))
                .andExpect(status().isBadRequest());
    }
}
