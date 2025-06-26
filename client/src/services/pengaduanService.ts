import api from "@/lib/api";
import axios from "axios";
import type {
  Pengaduan,
  PengaduanDetail,
  PengaduanWithPelapor,
  PaginatedResponse,
  UserStats,
} from "@/types";

interface CreatePengaduanPayload {
  judul: string;
  isi: string;
  foto_bukti?: File;
}

export const createPengaduanService = async (
  payload: CreatePengaduanPayload
) => {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  formData.append("isi", payload.isi);
  if (payload.foto_bukti) {
    formData.append("foto_bukti", payload.foto_bukti);
  }

  try {
    const response = await api.post("/pengaduan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal membuat pengaduan.");
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const getMyPengaduanService = async (): Promise<Pengaduan[]> => {
  try {
    const response = await api.get<Pengaduan[]>("/pengaduan/mine");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengambil riwayat pengaduan."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const getAllPengaduanService = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<PengaduanWithPelapor>> => {
  try {
    const response = await api.get<PaginatedResponse<PengaduanWithPelapor>>(
      `/pengaduan?page=${page}&limit=${limit}`
    );
    return response.data; // Mengembalikan seluruh objek { pagination: ..., data: ... }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengambil semua pengaduan."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const getDetailPengaduanService = async (
  id: string
): Promise<PengaduanDetail> => {
  try {
    const response = await api.get<PengaduanDetail>(`/pengaduan?id=${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengambil detail pengaduan."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const updateStatusPengaduanService = async (
  id: string,
  status: string
) => {
  try {
    const response = await api.patch(`/pengaduan?id=${id}`, { status });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal memperbarui status pengaduan."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const searchPengaduanService = async (
  query: string
): Promise<PengaduanWithPelapor[]> => {
  try {
    const response = await api.get<PengaduanWithPelapor[]>(
      `/pengaduan?q=${query}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal mencari pengaduan.");
    }
    throw new Error("Terjadi kesalahan tidak dikenal saat mencari pengaduan.");
  }
};

export const getMyStatsService = async (): Promise<UserStats> => {
  try {
    const response = await api.get<UserStats>("/pengaduan/stats-mine");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal mengambil statistik pengaduan."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};
