export interface Activity {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 1 | 2 | 3;
  scheduleDate: string;
  equipments: string[];
}

export type ActivityFormData = Omit<Activity, "id">;
