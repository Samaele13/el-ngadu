import api from "@/lib/api";
import axios from "axios";

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
