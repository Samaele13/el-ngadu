import api from "@/lib/api";
import axios from "axios";
import type { Laporan } from "@/types";

export const getLaporanService = async (): Promise<Laporan[]> => {
  try {
    const response = await api.get<Laporan[]>("/laporan/generate");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengambil data laporan."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};
