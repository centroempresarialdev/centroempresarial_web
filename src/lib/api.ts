import {
  httpClient,
  tokenStorage,
  ApiError,
  authService,
  leadsService,
  clientsService,
  newsService,
  eventsService,
  partnersService,
  uploadsService,
  whatsappService,
  API_BASE_URL,
} from "@/services";

export { tokenStorage, ApiError, ApiError as ApiClientError, API_BASE_URL };

export const api = {
  health: () => httpClient<{ status: string; service: string }>("/health"),
  auth: authService,
  leads: leadsService,
  clients: clientsService,
  news: newsService,
  events: eventsService,
  partners: partnersService,
  uploads: uploadsService,
  whatsapp: whatsappService,
};

export default api;
