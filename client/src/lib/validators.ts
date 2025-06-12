import { z } from 'zod';

const passwordValidation = new RegExp(
  /^(?=.*[a-zA-Z])(?=.*\d).+$/
);

export const RegisterSchema = z.object({
  nik: z.string()
    .min(1, { message: 'NIK wajib diisi' })
    .regex(/^\d{16}$/, { message: 'NIK harus berupa 16 digit angka' }),

  nama: z.string()
    .min(3, { message: 'Nama lengkap minimal 3 karakter' })
    .max(100, { message: 'Nama lengkap maksimal 100 karakter' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Nama lengkap hanya boleh mengandung huruf dan spasi' }),

  username: z.string()
    .min(5, { message: 'Username minimal 5 karakter' })
    .max(20, { message: 'Username maksimal 20 karakter' })
    .regex(/^[a-zA-Z0-9._]+$/, { message: 'Username hanya boleh mengandung huruf, angka, titik, dan underscore' }),

  password: z.string()
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(32, { message: 'Password maksimal 32 karakter' })
    .regex(passwordValidation, {
      message: 'Password harus mengandung kombinasi huruf dan angka',
    }),

  telp: z.string()
    .min(10, { message: 'Nomor telepon minimal 10 digit' })
    .max(15, { message: 'Nomor telepon maksimal 15 digit' })
    .regex(/^\d+$/, { message: 'Nomor telepon hanya boleh berisi angka' }),
});

export type RegisterPayload = z.infer<typeof RegisterSchema>;
