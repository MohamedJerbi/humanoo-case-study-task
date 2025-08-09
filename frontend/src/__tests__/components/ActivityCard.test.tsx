import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Activity } from "@/types/activity";
import ActivityCard from "@/pages/ActivityList/ActivityCard/ActivityCard";
import { Categories } from "@/types/enums";
import { BrowserRouter } from "react-router";

const mockActivity: Activity = {
  id: "1",
  title: "Morning Yoga",
  category: Categories.Fitness,
  durationMinutes: 30,
  difficulty: 2,
  scheduleDate: "2024-01-15",
  equipments: ["Yoga Mat", "Blocks"],
};

describe("ActivityCard", () => {
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
    vi.clearAllMocks();
  });

  it("renders activity information correctly", () => {
    render(
      <BrowserRouter>
        <ActivityCard activity={mockActivity} onDelete={mockOnDelete} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockActivity.title)).toBeInTheDocument();
    expect(screen.getByText(mockActivity.category)).toBeInTheDocument();
    expect(
      screen.getByText(mockActivity.durationMinutes + " min")
    ).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText(mockActivity.equipments[0])).toBeInTheDocument();
    expect(screen.getByText(mockActivity.equipments[1])).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();

    render(
      <BrowserRouter>
        <ActivityCard activity={mockActivity} onDelete={onDelete} />
      </BrowserRouter>
    );

    const btn = screen.getByRole("button", { name: /delete activity/i });
    fireEvent.click(btn);

    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("displays correct difficulty badge color and text", () => {
    const easyActivity = { ...mockActivity, difficulty: 1 as const };
    const { rerender } = render(
      <BrowserRouter>
        <ActivityCard activity={easyActivity} onDelete={mockOnDelete} />
      </BrowserRouter>
    );
    expect(screen.getByText("Easy")).toBeInTheDocument();

    const hardActivity = { ...mockActivity, difficulty: 3 as const };
    rerender(
      <BrowserRouter>
        <ActivityCard activity={hardActivity} onDelete={mockOnDelete} />
      </BrowserRouter>
    );
    expect(screen.getByText("Hard")).toBeInTheDocument();
  });

  it("handles activities with no equipment", () => {
    const activityNoEquipment = { ...mockActivity, equipments: [] };
    render(
      <BrowserRouter>
        <ActivityCard activity={activityNoEquipment} onDelete={mockOnDelete} />
      </BrowserRouter>
    );

    expect(screen.queryByText("Equipment:")).not.toBeInTheDocument();
  });

  it("formats date correctly", () => {
    render(
      <BrowserRouter>
        <ActivityCard activity={mockActivity} onDelete={mockOnDelete} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Mon, Jan 15, 2024/)).toBeInTheDocument();
  });
});
