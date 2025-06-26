import api from "@/lib/api";
import axios from "axios";
import type { AdminStats } from "@/types";

export const getAdminStatsService = async (): Promise<AdminStats> => {
  try {
    const response = await api.get<AdminStats>("/stats/admin");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengambil statistik admin."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};
