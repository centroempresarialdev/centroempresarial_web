import { httpClient } from "./client";
import type {
  NewsCreate,
  NewsUpdate,
  NewsOut,
} from "@/lib/api-types";

export const newsService = {
  list: (params?: { category?: string; limit?: number; offset?: number }): Promise<NewsOut[]> =>
    httpClient<NewsOut[]>("/news", {
      method: "GET",
      params,
    }),

  getBySlug: (slug: string): Promise<NewsOut> =>
    httpClient<NewsOut>(`/news/${encodeURIComponent(slug)}`, {
      method: "GET",
    }),

  create: (data: NewsCreate): Promise<NewsOut> =>
    httpClient<NewsOut>("/news", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  update: (newsId: number, data: NewsUpdate): Promise<NewsOut> =>
    httpClient<NewsOut>(`/news/${newsId}`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    }),

  delete: (newsId: number): Promise<{ message: string }> =>
    httpClient<{ message: string }>(`/news/${newsId}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};
