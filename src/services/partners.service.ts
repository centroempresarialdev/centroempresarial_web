import { httpClient } from "./client";
import type {
  PartnerCreate,
  PartnerUpdate,
  PartnerOut,
} from "@/lib/api-types";

export const partnersService = {
  list: (): Promise<PartnerOut[]> =>
    httpClient<PartnerOut[]>("/partners", {
      method: "GET",
    }),

  create: (data: PartnerCreate): Promise<PartnerOut> =>
    httpClient<PartnerOut>("/partners", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  update: (partnerId: number, data: PartnerUpdate): Promise<PartnerOut> =>
    httpClient<PartnerOut>(`/partners/${partnerId}`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  delete: (partnerId: number): Promise<{ message: string }> =>
    httpClient<{ message: string }>(`/partners/${partnerId}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};
