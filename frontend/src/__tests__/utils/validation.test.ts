import { validateActivity, hasValidationErrors } from "@/utils/validation";
import type { ActivityFormData } from "@/types/activity";
import { describe, it, expect } from "vitest";
import { Categories } from "@/types/enums";

describe("validateActivity", () => {
  const futureDate = new Date(new Date().getTime() + 1000000)
    .toISOString()
    .split("T")[0];

  const validActivity: ActivityFormData = {
    title: "Test Activity",
    category: Categories.Fitness,
    durationMinutes: 30,
    difficulty: 2,
    scheduleDate: futureDate,
    equipments: [],
  };

  it("should return no errors for valid activity", () => {
    const errors = validateActivity(validActivity);
    expect(hasValidationErrors(errors)).toBe(false);
  });

  it("should return error for empty title", () => {
    const activity = { ...validActivity, title: "" };
    const errors = validateActivity(activity);
    expect(errors.title).toBe("Title is required");
  });

  it("should return error for short title", () => {
    const activity = { ...validActivity, title: "Hi" };
    const errors = validateActivity(activity);
    expect(errors.title).toBe("Title must be at least 3 characters");
  });

  it("should return error for empty category", () => {
    const activity = { ...validActivity, category: "" };
    const errors = validateActivity(activity);
    expect(errors.category).toBe("Category is required");
  });

  it("should return error for invalid duration", () => {
    const activity = { ...validActivity, durationMinutes: 0 };
    const errors = validateActivity(activity);
    expect(errors.durationMinutes).toBe("Duration must be greater than 0");
  });

  it("should return error for excessive duration", () => {
    const activity = { ...validActivity, durationMinutes: 500 };
    const errors = validateActivity(activity);
    expect(errors.durationMinutes).toBe("Duration cannot exceed 8 hours");
  });

  it("should return error for invalid difficulty", () => {
    const activity = { ...validActivity, difficulty: 4 as any };
    const errors = validateActivity(activity);
    expect(errors.difficulty).toBe("Difficulty must be 1, 2, or 3");
  });

  it("should return error for past schedule date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const activity = {
      ...validActivity,
      scheduleDate: yesterday.toISOString().split("T")[0],
    };
    const errors = validateActivity(activity);
    expect(errors.scheduleDate).toBe("Schedule date cannot be in the past");
  });
});
