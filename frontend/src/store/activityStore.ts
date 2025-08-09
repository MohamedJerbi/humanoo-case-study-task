import type { Activity, ActivityFormData } from "@/types/activity";
import { Categories } from "@/types/enums";
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
  loading: true,
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
            category: Categories.Fitness,
            durationMinutes: 30,
            difficulty: 2,
            scheduleDate: "2023-10-01",
            equipments: ["Yoga Mat"],
          },
        ],
      });
    }, 1000);
  },

  createActivity: async (activityData: ActivityFormData) => {
    set({ loading: true, error: null });

    try {
      const newActivity = await new Promise<Activity>((resolve) => {
        setTimeout(() => {
          resolve({
            id: Math.random().toString(36).substring(2, 15),
            ...activityData,
          });
        }, 1000);
      });
      set((state) => ({
        activities: [...state.activities, newActivity],
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create activity",
        loading: false,
      });
      throw error;
    }
  },

  updateActivity: async (id: string, activityData: ActivityFormData) => {
    set({ loading: true, error: null });
    try {
      const updatedActivity = { ...activityData, id };
      set((state) => ({
        activities: state.activities.map((activity) =>
          activity.id === id ? updatedActivity : activity
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update activity",
        loading: false,
      });
      throw error;
    }
  },

  deleteActivity: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // TODO API CALL
      set((state) => ({
        activities: state.activities.filter((activity) => activity.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete activity",
        loading: false,
      });
      throw error;
    }
  },
  clearError: () => set({ error: null }),
}));
