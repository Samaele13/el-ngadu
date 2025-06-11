import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerService } from '@/services/authService';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    username: '',
    password: '',
    telp: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateNIK = (nik: string): string | null => {
    if (!nik) return 'NIK wajib diisi';
    if (!/^\d{16}$/.test(nik)) return 'NIK harus berupa 16 digit angka';
    return null;
  };

  const validateNama = (nama: string): string | null => {
    if (!nama) return 'Nama lengkap wajib diisi';
    if (nama.length < 2) return 'Nama minimal 2 karakter';
    if (nama.length > 100) return 'Nama maksimal 100 karakter';
    if (!/^[a-zA-Z\s'.-]+$/.test(nama)) return 'Nama hanya boleh mengandung huruf, spasi, tanda petik, titik, dan tanda hubung';
    return null;
  };

  const validateUsername = (username: string): string | null => {
    if (!username) return 'Username wajib diisi';
    if (username.length < 3) return 'Username minimal 3 karakter';
    if (username.length > 20) return 'Username maksimal 20 karakter';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username hanya boleh mengandung huruf, angka, dan underscore';
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return 'Password wajib diisi';
    if (password.length < 6) return 'Password minimal 6 karakter';
    if (password.length > 50) return 'Password maksimal 50 karakter';
    if (!/(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*\d)|(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password harus mengandung kombinasi huruf besar, huruf kecil, atau angka';
    }
    return null;
  };

  const validateTelp = (telp: string): string | null => {
    if (!telp) return 'Nomor telepon wajib diisi';
    if (!/^(\+62|62|0)[8-9]\d{8,11}$/.test(telp)) return 'Format nomor telepon tidak valid (contoh: 08123456789)';
    return null;
  };

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'nik': return validateNIK(value);
      case 'nama': return validateNama(value);
      case 'username': return validateUsername(value);
      case 'password': return validatePassword(value);
      case 'telp': return validateTelp(value);
      default: return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });

    // Real-time validation
    const error = validateField(id, value);
    setValidationErrors(prev => ({
      ...prev,
      [id]: error || ''
    }));
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Mohon perbaiki kesalahan pada form');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await registerService(formData);
      alert(data.message);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak dikenal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <img src="/assets/image.png" alt="Logo El Ngadu" className="w-20 h-20 mx-auto mb-4" />
          <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
          <CardDescription>Daftar untuk mulai membuat pengaduan.</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                placeholder="16 digit Nomor Induk Kependudukan"
                value={formData.nik}
                maxLength={16}
                pattern="\d{16}"
                inputMode="numeric"
                required
                onChange={handleChange}
                disabled={isLoading}
                className={validationErrors.nik ? 'border-red-500' : ''}
              />
              {validationErrors.nik && (
                <p className="text-xs text-red-500">{validationErrors.nik}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input
                id="nama"
                placeholder="Nama sesuai KTP"
                value={formData.nama}
                maxLength={100}
                required
                onChange={handleChange}
                disabled={isLoading}
                className={validationErrors.nama ? 'border-red-500' : ''}
              />
              {validationErrors.nama && (
                <p className="text-xs text-red-500">{validationErrors.nama}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="3-20 karakter, huruf, angka, underscore"
                value={formData.username}
                maxLength={20}
                pattern="[a-zA-Z0-9_]{3,20}"
                required
                onChange={handleChange}
                disabled={isLoading}
                className={validationErrors.username ? 'border-red-500' : ''}
              />
              {validationErrors.username && (
                <p className="text-xs text-red-500">{validationErrors.username}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimal 6 karakter dengan kombinasi huruf/angka"
                value={formData.password}
                maxLength={50}
                required
                onChange={handleChange}
                disabled={isLoading}
                className={validationErrors.password ? 'border-red-500' : ''}
              />
              {validationErrors.password && (
                <p className="text-xs text-red-500">{validationErrors.password}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="telp">Nomor Telepon</Label>
              <Input
                id="telp"
                type="tel"
                placeholder="08123456789 atau +6281234567890"
                value={formData.telp}
                maxLength={15}
                inputMode="tel"
                required
                onChange={handleChange}
                disabled={isLoading}
                className={validationErrors.telp ? 'border-red-500' : ''}
              />
              {validationErrors.telp && (
                <p className="text-xs text-red-500">{validationErrors.telp}</p>
              )}
            </div>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Daftar'}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
                Sudah punya akun?{' '}
                <Link to="/login" className="underline font-medium hover:text-primary">
                    Masuk di sini
                </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}