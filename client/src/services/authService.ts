import api from "@/lib/api";
import axios from "axios";
import type { User } from "@/types";
import type { RegisterPayload } from "@/lib/validators";
import type { ProfileEditPayload } from "@/lib/validators";
import type { ChangePasswordPayload } from "@/lib/validators";

export const registerService = async (
  payload: RegisterPayload
): Promise<{ message: string }> => {
  try {
    const response = await api.post("/masyarakat/register", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Gagal melakukan registrasi."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal saat registrasi.");
  }
};

export const loginService = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const response = await api.post("/auth/unified-login", {
      username,
      password,
    });

    const userData = response.data.user;

    if (userData.nik) {
      return {
        ...userData,
        userType: "masyarakat" as const,
      };
    } else if (userData.id_petugas) {
      return {
        ...userData,
        userType: "petugas" as const,
      };
    }

    throw new Error("Invalid user data received.");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Username atau password salah."
      );
    }
    throw new Error("Terjadi kesalahan tidak dikenal saat login.");
  }
};

export const getProfileService = async (): Promise<User | null> => {
  try {
    const response = await api.get("/auth/profile");
    const userData = response.data.user;

    if (!userData) return null;

    if (userData.nik) {
      return { ...userData, userType: "masyarakat" as const };
    }

    if (userData.id_petugas) {
      return { ...userData, userType: "petugas" as const };
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    console.error("Gagal mengambil profil:", error);
    return null;
  }
};

export const changePasswordService = async (
  payload: Pick<ChangePasswordPayload, "old_password" | "new_password">
) => {
  try {
    const response = await api.post("/auth/change-password", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal mengubah password.");
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};

export const updateProfileService = async (
  payload: Partial<ProfileEditPayload>
) => {
  try {
    const response = await api.patch("/auth/update-profile", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Gagal memperbarui profil.");
    }
    throw new Error("Terjadi kesalahan tidak dikenal.");
  }
};
