import { httpClient } from "./client";
import type {
  ClientOut,
  ClientUpdate,
  MembershipCreate,
  MembershipOut,
  MembershipVerifyResponse,
} from "@/lib/api-types";

export const clientsService = {
  list: (params?: { q?: string; client_type?: string }): Promise<ClientOut[]> =>
    httpClient<ClientOut[]>("/clients", {
      method: "GET",
      requiresAuth: true,
      params,
    }),

  getById: (clientId: number): Promise<ClientOut> =>
    httpClient<ClientOut>(`/clients/${clientId}`, {
      method: "GET",
      requiresAuth: true,
    }),

  update: (clientId: number, data: ClientUpdate): Promise<ClientOut> =>
    httpClient<ClientOut>(`/clients/${clientId}`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  addMembership: (clientId: number, data: MembershipCreate): Promise<MembershipOut> =>
    httpClient<MembershipOut>(`/clients/${clientId}/memberships`, {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  verifyMembership: (documentNumber: string): Promise<MembershipVerifyResponse> =>
    httpClient<MembershipVerifyResponse>(`/clients/verify/${encodeURIComponent(documentNumber)}`, {
      method: "GET",
    }),
};
