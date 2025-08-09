package com.example.backend.service;

import com.example.backend.domain.Activity;
import com.example.backend.dto.ActivityRequest;
import com.example.backend.dto.ActivityResponse;
import com.example.backend.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository repo;

    @Override
    public List<ActivityResponse> findAll() {
        return repo.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public ActivityResponse findById(UUID id) {
        return repo.findById(id).map(this::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found: " + id));
    }

    @Override
    public ActivityResponse create(ActivityRequest r) {
        Activity a = Activity.builder()
                .title(r.title())
                .category(r.category())
                .durationMinutes(r.durationMinutes())
                .difficulty(r.difficulty())
                .scheduleDate(r.scheduleDate())
                .equipments(r.equipments())
                .build();
        return toDto(repo.save(a));
    }

    @Override
    public ActivityResponse update(UUID id, ActivityRequest r) {
        Activity a = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Activity not found: " + id));
        a.setTitle(r.title());
        a.setCategory(r.category());
        a.setDurationMinutes(r.durationMinutes());
        a.setDifficulty(r.difficulty());
        a.setScheduleDate(r.scheduleDate());
        a.setEquipments(r.equipments());
        return toDto(repo.save(a));
    }

    @Override
    public void delete(UUID id) {
        if (!repo.existsById(id)) throw new IllegalArgumentException("Activity not found: " + id);
        repo.deleteById(id);
    }

    private ActivityResponse toDto(Activity a) {
        return new ActivityResponse(
                a.getId(), a.getTitle(), a.getCategory(), a.getDurationMinutes(), a.getDifficulty(),
                a.getScheduleDate(), a.getEquipments(), a.getCreatedAt(), a.getUpdatedAt()
        );
    }
}

