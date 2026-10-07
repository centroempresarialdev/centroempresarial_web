import { httpClient } from "./client";
import type {
  EventCreate,
  EventUpdate,
  EventOut,
} from "@/lib/api-types";

export const eventsService = {
  list: (): Promise<EventOut[]> =>
    httpClient<EventOut[]>("/events", {
      method: "GET",
    }),

  getBySlug: (slug: string): Promise<EventOut> =>
    httpClient<EventOut>(`/events/${encodeURIComponent(slug)}`, {
      method: "GET",
    }),

  create: (data: EventCreate): Promise<EventOut> =>
    httpClient<EventOut>("/events", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  update: (eventId: number, data: EventUpdate): Promise<EventOut> =>
    httpClient<EventOut>(`/events/${eventId}`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  delete: (eventId: number): Promise<{ message: string }> =>
    httpClient<{ message: string }>(`/events/${eventId}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};
