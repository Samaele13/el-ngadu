import api from '@/lib/api';
import axios from 'axios'; // <-- DI-IMPORT DI SINI
import type { Masyarakat, Petugas, User } from '@/types';

interface LoginResponse {
  message: string;
  user?: Masyarakat;
  petugas?: Petugas;
}

interface RegisterPayload {
  nik: string;
  nama: string;
  username: string;
  password: string;
  telp: string;
}

export const loginService = async (username: string, password: string): Promise<User> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });
    if (response.data.user) {
      return { ...response.data.user, userType: 'masyarakat' };
    }
    throw new Error("Tipe user tidak dikenal dari respons masyarakat");
  } catch (error) {
    try {
      const response = await api.post<LoginResponse>('/petugas/login', { username, password });
      if (response.data.petugas) {
        return { ...response.data.petugas, userType: 'petugas' };
      }
      throw new Error("Tipe user tidak dikenal dari respons petugas");
    } catch (finalError) {
      throw new Error('Username atau password salah.');
    }
  }
};

export const registerService = async (payload: RegisterPayload): Promise<{ message: string }> => {
  try {
    const response = await api.post('/masyarakat/register', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Sekarang kita bisa dengan aman mengakses error.response
      throw new Error(error.response.data.error || 'Gagal melakukan registrasi.');
    }
    throw new Error('Terjadi kesalahan tidak dikenal saat registrasi.');
  }
};
