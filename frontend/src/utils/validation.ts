import type { ActivityFormData } from "@/types/activity";

export interface ValidationErrors {
  title?: string;
  category?: string;
  durationMinutes?: string;
  difficulty?: string;
  scheduleDate?: string;
}

export const validateActivity = (
  data: Partial<ActivityFormData>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.title?.trim()) {
    errors.title = "Title is required";
  } else if (data.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (!data.category?.trim()) {
    errors.category = "Category is required";
  }

  if (!data.durationMinutes || data.durationMinutes <= 0) {
    errors.durationMinutes = "Duration must be greater than 0";
  } else if (data.durationMinutes > 480) {
    errors.durationMinutes = "Duration cannot exceed 8 hours";
  }

  if (!data.difficulty || ![1, 2, 3].includes(data.difficulty)) {
    errors.difficulty = "Difficulty must be 1, 2, or 3";
  }

  if (!data.scheduleDate) {
    errors.scheduleDate = "Schedule date is required";
  } else {
    const selectedDate = new Date(data.scheduleDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.scheduleDate = "Schedule date cannot be in the past";
    }
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
