const RAW_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const CLEAN_BASE = RAW_URL.replace(/\/+$/, "");

// Si la URL no termina en /api/v1, agregar el prefijo de la versión de la API
export const API_BASE_URL = CLEAN_BASE.endsWith("/api/v1") 
  ? CLEAN_BASE 
  : `${CLEAN_BASE}/api/v1`;

const TOKEN_KEY = "ce_access_token";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const tokenStorage = {
  get: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* ignore */
    }
  },
  remove: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },
  exists: (): boolean => Boolean(tokenStorage.get()),
};

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
  requiresAuth?: boolean;
}

export async function httpClient<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { params, requiresAuth = false, headers = {}, ...rest } = config;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val));
      }
    });
    const qs = searchParams.toString();
    if (qs) {
      url += (url.includes("?") ? "&" : "?") + qs;
    }
  }

  const reqHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string>),
  };

  const isFormData = rest.body instanceof FormData;
  if (!isFormData && !reqHeaders["Content-Type"]) {
    reqHeaders["Content-Type"] = "application/json";
  }

  const token = tokenStorage.get();
  if (token) {
    reqHeaders["Authorization"] = `Bearer ${token}`;
  } else if (requiresAuth) {
    throw new ApiError("No autenticado. Por favor inicie sesión.", 401);
  }

  const response = await fetch(url, {
    ...rest,
    headers: reqHeaders,
  });

  if (!response.ok) {
    let errorMsg = `Error ${response.status}: ${response.statusText}`;
    let errorData: unknown = null;
    try {
      errorData = await response.json();
      if (errorData && typeof errorData === "object" && "detail" in errorData) {
        const detail = (errorData as { detail: unknown }).detail;
        if (typeof detail === "string") {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          errorMsg = detail.map((d: { msg?: string }) => d.msg || JSON.stringify(d)).join(", ");
        }
      }
    } catch {
      // Body no era JSON
    }

    if (response.status === 401) {
      tokenStorage.remove();
    }

    throw new ApiError(errorMsg, response.status, errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}
