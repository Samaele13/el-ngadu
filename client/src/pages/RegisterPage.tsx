import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { registerService } from "@/services/authService";
import { RegisterSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/common/PasswordInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

type FormErrors = {
  [key: string]: string | undefined;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    username: "",
    password: "",
    telp: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let filteredValue = value;

    switch (id) {
      case "nik":
        filteredValue = value.replace(/[^0-9]/g, "").slice(0, 16);
        break;
      case "telp":
        filteredValue = value.replace(/[^0-9]/g, "").slice(0, 13);
        break;
      case "nama":
        filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
        break;
    }
    setFormData({ ...formData, [id]: filteredValue });
    if (errors[id]) {
      setErrors({ ...errors, [id]: undefined });
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = RegisterSchema.parse(formData);
      await registerService(validatedData);
      setShowSuccessDialog(true);
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: FormErrors = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0]] = error.message;
          }
        });
        setErrors(newErrors);
      } else if (err instanceof Error) {
        setErrors({ form: err.message });
      } else {
        setErrors({ form: "Terjadi kesalahan tidak dikenal." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center p-6">
            <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
            <CardDescription>
              Daftar untuk mulai membuat pengaduan.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="p-6 grid gap-4">
              <div className="-mt-10 grid gap-2">
                <Label htmlFor="nik">NIK</Label>
                <Input
                  id="nik"
                  placeholder="16 digit NIK"
                  required
                  value={formData.nik}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.nik && (
                  <p className="text-xs text-destructive">{errors.nik}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  placeholder="Nama sesuai KTP"
                  required
                  value={formData.nama}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.nama && (
                  <p className="text-xs text-destructive">{errors.nama}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Buat username unik"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-xs text-destructive">{errors.username}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  placeholder="Minimal 8 karakter"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telp">Nomor Telepon</Label>
                <Input
                  id="telp"
                  type="tel"
                  placeholder="081234567890"
                  required
                  value={formData.telp}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.telp && (
                  <p className="text-xs text-destructive">{errors.telp}</p>
                )}
              </div>
              {errors.form && (
                <p className="text-sm font-medium text-destructive text-center">
                  {errors.form}
                </p>
              )}
            </CardContent>
            <CardFooter className="p-6 flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Daftar"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="underline font-medium hover:text-primary"
                >
                  Masuk di sini
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center mt-4">
              Registrasi Berhasil!
            </DialogTitle>
            <DialogDescription className="text-center">
              Akun Anda telah berhasil dibuat
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button type="button" onClick={() => navigate("/login")}>
              Lanjut ke Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
