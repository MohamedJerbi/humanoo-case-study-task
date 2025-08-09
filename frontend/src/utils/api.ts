import type { Activity, ActivityFormData } from "@/types/activity";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const ActivitiesAPI = {
  list: () => http<Activity[]>("/api/activities"),
  create: (body: ActivityFormData) =>
    http<Activity>("/api/activities", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  update: (id: string, body: ActivityFormData) =>
    http<Activity>(`/api/activities/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  remove: (id: string) =>
    fetch(`${API_BASE}/api/activities/${id}`, { method: "DELETE" }).then(
      (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
      }
    ),
};

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}
