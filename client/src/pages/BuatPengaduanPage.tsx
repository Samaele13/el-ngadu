import { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPengaduanService } from "@/services/pengaduanService";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle, User } from "lucide-react";

export default function BuatPengaduanPage() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (!authLoading && user && user.userType !== "masyarakat") {
      setError("Akses ditolak. Anda harus login sebagai masyarakat.");
      return;
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || user.userType !== "masyarakat") {
      setError("Akses ditolak. Anda harus login sebagai masyarakat.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createPengaduanService({
        judul,
        isi,
        foto_bukti: foto || undefined,
      });
      alert("Pengaduan berhasil dikirim!");
      navigate("/dashboard/riwayat");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan tidak dikenal."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />
          <p>Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  // Show access denied if user doesn't have correct role
  if (!isAuthenticated || !user || user.userType !== "masyarakat") {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-sm border">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
                <div>
                  <h2 className="text-lg font-semibold text-destructive">
                    Akses Ditolak
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Anda harus login sebagai masyarakat untuk mengakses halaman ini.
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Kembali ke Beranda
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-sm border">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-2 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    Buat Pengaduan Baru
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Silakan isi detail pengaduan Anda di bawah ini. Jelaskan masalah
                    dengan rinci.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    Login sebagai: {user.nama}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Role: {user.userType}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-sm font-medium">
                  Judul Pengaduan
                </Label>
                <Input
                  id="judul"
                  type="text"
                  placeholder="Masukkan judul pengaduan..."
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  disabled={isLoading}
                  className="transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isi" className="text-sm font-medium">
                  Isi Pengaduan
                </Label>
                <Textarea
                  id="isi"
                  placeholder="Jelaskan detail masalah yang ingin Anda laporkan..."
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  disabled={isLoading}
                  rows={6}
                  className="transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto_bukti" className="text-sm font-medium">
                  Foto Bukti (Opsional)
                </Label>
                <Input
                  id="foto_bukti"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="transition-colors file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-4"
                />
                {foto && (
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">
                      File terpilih: {foto.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ukuran: {(foto.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <p className="text-sm font-medium text-destructive">
                      {error}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="px-6 pb-6">
              <Button
                type="submit"
                className="w-full transition-colors hover:bg-primary/90"
                disabled={isLoading || !judul.trim() || !isi.trim()}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Mengirim..." : "Kirim Pengaduan"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}