import { httpClient } from "./client";
import type { LeadOut, ClientOut } from "@/lib/api-types";

export interface DashboardStats {
  kpis: {
    pending_leads: number;
    converted_leads: number;
    total_leads: number;
    total_clients: number;
    active_memberships: number;
    total_news: number;
    total_events: number;
    total_partners: number;
  };
  recent_leads: LeadOut[];
  recent_clients: ClientOut[];
  server_time: string;
}

export const dashboardService = {
  getStats: (): Promise<DashboardStats> =>
    httpClient<DashboardStats>("/dashboard/stats", {
      method: "GET",
      requiresAuth: true,
    }),
};
