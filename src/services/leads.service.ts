import { httpClient } from "./client";
import type {
  LeadCreate,
  LeadOut,
  LeadConvertRequest,
  ClientOut,
} from "@/lib/api-types";

export const leadsService = {
  create: (data: LeadCreate): Promise<LeadOut> =>
    httpClient<LeadOut>("/leads", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  list: (params?: { is_converted?: boolean; only_assigned?: boolean }): Promise<LeadOut[]> =>
    httpClient<LeadOut[]>("/leads", {
      method: "GET",
      requiresAuth: true,
      params,
    }),

  resend: (leadId: number): Promise<{ message: string }> =>
    httpClient<{ message: string }>(`/leads/${leadId}/resend`, {
      method: "POST",
      requiresAuth: true,
    }),

  convert: (leadId: number, data: LeadConvertRequest): Promise<ClientOut> =>
    httpClient<ClientOut>(`/leads/${leadId}/convert`, {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),
};
