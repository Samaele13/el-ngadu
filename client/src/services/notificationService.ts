import api from "@/lib/api";
import axios from "axios";

export const markAllNotificationsAsReadService = async () => {
  try {
    const response = await api.post("/notifications/mark-all-as-read");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal menandai semua notifikasi."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};
