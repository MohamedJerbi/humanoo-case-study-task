import type { Activity, ActivityFormData } from "@/types/activity";
import { ActivitiesAPI } from "@/utils/api";
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

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  loading: true,
  error: null,

  fetchActivities: async () => {
    set({ loading: true, error: null });
    const activities = await ActivitiesAPI.list();
    set({ loading: false, activities });
  },

  createActivity: async (activityData: ActivityFormData) => {
    set({ loading: true, error: null });

    try {
      const newActivity = await ActivitiesAPI.create(activityData);
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
      const updatedActivity = await ActivitiesAPI.update(id, activityData);
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
      await ActivitiesAPI.remove(id);
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
