import type { Categories } from "./enums";

export interface Activity {
  id: string;
  title: string;
  category: Categories;
  durationMinutes: number;
  difficulty: 1 | 2 | 3;
  scheduleDate: string;
  equipments: string[];
}

export type ActivityFormData = Omit<Activity, "id">;
