import { z } from "zod";

const passwordValidation = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/);

export const RegisterSchema = z.object({
  nik: z
    .string()
    .min(1, { message: "NIK wajib diisi" })
    .regex(/^\d{16}$/, { message: "NIK harus berupa 16 digit angka" }),

  nama: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter" })
    .max(100, { message: "Nama lengkap maksimal 100 karakter" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Nama lengkap hanya boleh mengandung huruf dan spasi",
    }),

  username: z
    .string()
    .min(5, { message: "Username minimal 5 karakter" })
    .max(20, { message: "Username maksimal 20 karakter" })
    .regex(/^[a-zA-Z0-9._]+$/, {
      message:
        "Username hanya boleh mengandung huruf, angka, titik, dan underscore",
    }),

  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .max(32, { message: "Password maksimal 32 karakter" })
    .regex(passwordValidation, {
      message: "Password harus mengandung kombinasi huruf dan angka",
    }),

  telp: z
    .string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .max(15, { message: "Nomor telepon maksimal 15 digit" })
    .regex(/^\d+$/, { message: "Nomor telepon hanya boleh berisi angka" }),
});

export type RegisterPayload = z.infer<typeof RegisterSchema>;

export const PetugasSchema = z.object({
  nama_petugas: z
    .string()
    .min(3, { message: "Nama petugas minimal 3 karakter." }),
  username: z.string().min(5, { message: "Username minimal 5 karakter." }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter." })
    .regex(passwordValidation, {
      message: "Password harus mengandung huruf dan angka.",
    })
    .optional()
    .or(z.literal("")), // Kosongkan jika tidak ingin mengubah password saat edit
  telp: z.string().min(10, { message: "Nomor telepon minimal 10 digit." }),
  level: z.enum(["admin", "petugas"], {
    required_error: "Level wajib dipilih.",
  }),
});

export type PetugasPayload = z.infer<typeof PetugasSchema>;

export const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(1, { message: "Password lama wajib diisi." }),
    new_password: z
      .string()
      .min(8, { message: "Password baru minimal 8 karakter." })
      .regex(passwordValidation, {
        message: "Password harus mengandung huruf dan angka.",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Konfirmasi password tidak cocok.",
    path: ["confirm_password"],
  });

export type ChangePasswordPayload = z.infer<typeof ChangePasswordSchema>;

export const MasyarakatEditSchema = z.object({
  nama: z.string().min(3, { message: "Nama lengkap minimal 3 karakter." }),
  username: z.string().min(5, { message: "Username minimal 5 karakter." }),
  telp: z.string().min(10, { message: "Nomor telepon minimal 10 digit." }),
});

export type MasyarakatEditPayload = z.infer<typeof MasyarakatEditSchema>;

export const ProfileEditSchema = z.object({
  nama: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter." })
    .optional(),
  nama_petugas: z
    .string()
    .min(3, { message: "Nama petugas minimal 3 karakter." })
    .optional(),
  username: z.string().min(5, { message: "Username minimal 5 karakter." }),
  telp: z.string().min(10, { message: "Nomor telepon minimal 10 digit." }),
});

export type ProfileEditPayload = z.infer<typeof ProfileEditSchema>;
