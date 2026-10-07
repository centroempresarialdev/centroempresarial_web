import { httpClient } from "./client";

export const whatsappService = {
  send: (phone: string, message: string): Promise<{ success: boolean; data?: unknown }> =>
    httpClient<{ success: boolean; data?: unknown }>("/whatsapp/send", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify({ phone, message }),
    }),

  runReminders: (force = false): Promise<{ status: string; recordatorios_encolados: number }> =>
    httpClient<{ status: string; recordatorios_encolados: number }>(`/whatsapp/reminders/run?force=${force}`, {
      method: "POST",
      requiresAuth: true,
    }),

  sendWelcome: (clientId: number): Promise<{ success: boolean; client_id: number }> =>
    httpClient<{ success: boolean; client_id: number }>(`/whatsapp/welcome/${clientId}`, {
      method: "POST",
      requiresAuth: true,
    }),
};
