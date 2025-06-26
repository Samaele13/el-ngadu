import { Link } from "react-router-dom";
import { useRegisterForm } from "@/hooks/useRegisterForm"; // <-- Impor hook baru kita
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
import { CheckCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const {
    formData,
    errors,
    isLoading,
    showSuccessDialog,
    handleChange,
    handleRegister,
    setShowSuccessDialog,
    handleDialogRedirect,
  } = useRegisterForm();

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
        <Card className="w-full max-w-md">
          <CardHeader className="p-6 text-center">
            <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
            <CardDescription>
              Daftar untuk mulai membuat pengaduan.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="grid gap-4 p-6 pt-0">
              {/* NIK */}
              <div className="grid gap-2">
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
              {/* Nama Lengkap */}
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
              {/* Username */}
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
              {/* Password */}
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
              {/* Nomor Telepon */}
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
              {/* General Form Error */}
              {errors.form && (
                <p className="text-center text-sm font-medium text-destructive">
                  {errors.form}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-6">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Memproses..." : "Daftar"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="font-medium underline hover:text-primary"
                >
                  Masuk di sini
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent
          className="sm:max-w-md"
          aria-describedby="register-success-description"
        >
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="mt-4 text-center">
              Registrasi Berhasil!
            </DialogTitle>
            <DialogDescription
              id="register-success-description"
              className="text-center"
            >
              Akun Anda telah berhasil dibuat. Silakan lanjut untuk masuk.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button type="button" onClick={handleDialogRedirect}>
              Lanjut ke Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
