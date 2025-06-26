import api from "@/lib/api";
import axios from "axios";
import type { Masyarakat, PaginatedResponse } from "@/types";
import type { MasyarakatEditPayload } from "@/lib/validators";

export const getMasyarakatService = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Masyarakat>> => {
  try {
    const response = await api.get<PaginatedResponse<Masyarakat>>(
      `/masyarakat?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengambil data masyarakat."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const searchMasyarakatService = async (
  query: string
): Promise<Masyarakat[]> => {
  try {
    const response = await api.get<Masyarakat[]>(
      `/masyarakat/search?q=${query}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal mencari masyarakat.");
    }
    throw new Error("Terjadi kesalahan tidak dikenal saat mencari masyarakat.");
  }
};

export const deleteMasyarakatService = async (nik: string) => {
  try {
    const response = await api.delete(`/masyarakat?nik=${nik}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal menghapus akun masyarakat."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const updateMasyarakatService = async (
  nik: string,
  payload: MasyarakatEditPayload
) => {
  try {
    const response = await api.patch(`/masyarakat?nik=${nik}`, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal memperbarui akun masyarakat."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};
