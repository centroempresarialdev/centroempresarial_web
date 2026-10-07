import { httpClient } from "./client";
import type { UploadResponse } from "@/lib/api-types";

export const uploadsService = {
  uploadImage: (file: File, folder = "flyers"): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    return httpClient<UploadResponse>(`/uploads?folder=${encodeURIComponent(folder)}`, {
      method: "POST",
      requiresAuth: true,
      body: formData,
    });
  },
};
