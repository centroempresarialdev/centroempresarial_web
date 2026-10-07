import { httpClient, tokenStorage } from "./client";
import type { Token, UserOut } from "@/lib/api-types";

export const authService = {
  login: async (username: string, password: string): Promise<Token> => {
    const body = new URLSearchParams({ username, password });
    const res = await httpClient<Token>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (res.access_token) {
      tokenStorage.set(res.access_token);
    }
    return res;
  },

  me: (): Promise<UserOut> =>
    httpClient<UserOut>("/auth/me", {
      requiresAuth: true,
    }),

  logout: () => tokenStorage.remove(),
  isAuthenticated: () => tokenStorage.exists(),
  getToken: () => tokenStorage.get(),
};
