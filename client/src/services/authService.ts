import api from '@/lib/api';
import axios from 'axios';
import type { Masyarakat, Petugas, User } from '@/types';
import type { RegisterPayload } from '@/lib/validators';

interface LoginResponse {
  message: string;
  user?: Masyarakat;
  petugas?: Petugas;
}

export const registerService = async (payload: RegisterPayload): Promise<{ message: string }> => {
  try {
    const response = await api.post('/masyarakat/register', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Gagal melakukan registrasi.');
    }
    throw new Error('Terjadi kesalahan tidak dikenal saat registrasi.');
  }
};

export const loginService = async (username: string, password: string): Promise<User> => {
  try {
    const masyarakatResponse = await api.post('/auth/login', { username, password });
    if (masyarakatResponse.data.user) {
      return { ...masyarakatResponse.data.user, userType: 'masyarakat' as const };
    }
  } catch (masyarakatError) {
    try {
      const petugasResponse = await api.post('/petugas/login', { username, password });
      if (petugasResponse.data.petugas) {
        return { ...petugasResponse.data.petugas, userType: 'petugas' as const };
      }
    } catch (petugasError) {
      console.error('Petugas login error:', petugasError);
    }
    console.error('Masyarakat login error:', masyarakatError);
  }

  throw new Error('Username atau password salah.');
};