import type { Activity, ActivityFormData } from "@/types/activity";
import { create } from "zustand";

export interface ActivityStore {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
  createActivity: (activity: ActivityFormData) => Promise<void>;
  updateActivity: (id: string, activity: ActivityFormData) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useActivityStore = create<ActivityStore>((set, get) => ({
  activities: [],
  loading: false,
  error: null,

  fetchActivities: async () => {
    set({ loading: true, error: null });
    setTimeout(() => {
      set({
        loading: false,
        activities: [
          {
            id: "1",
            title: "Activity 1",
            category: "Wellness",
            durationMinutes: 30,
            difficulty: 2,
            scheduleDate: "2023-10-01",
            equipments: ["Yoga Mat"],
          },
        ],
      });
    }, 1000);
  },

  createActivity: async (activityData: ActivityFormData) => {},

  updateActivity: async (id: string, activityData: ActivityFormData) => {},

  deleteActivity: async (id: string) => {},

  clearError: () => set({ error: null }),
}));
