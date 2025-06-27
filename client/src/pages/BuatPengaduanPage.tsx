import { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createPengaduanService } from "@/services/pengaduanService";
import { useAuth } from "@/hooks/useAuth";
import { useFileUpload } from "@/hooks/useFileUpload";
import { getErrorMessage } from "@/lib/pengaduanUtils";

import { PageLoader } from "@/components/common/PageLoader";
import { AccessDenied } from "@/components/common/AccessDenied";
import { FileUploadInput } from "@/components/pengaduan/FileUploadInput";

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
import { Loader2, AlertCircle } from "lucide-react";

export default function BuatPengaduanPage() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const {
    file,
    dragActive,
    handleFileSelect,
    handleDrag,
    handleDrop,
    removeFile,
  } = useFileUpload();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (user?.userType !== "masyarakat") {
      const msg = "Hanya masyarakat yang dapat membuat pengaduan.";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    setFormError(null);

    try {
      await createPengaduanService({
        judul,
        isi,
        foto_bukti: file || undefined,
      });
      toast.success("Pengaduan berhasil dikirim!");
      navigate("/dashboard/riwayat");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated || user?.userType !== "masyarakat") {
    return <AccessDenied />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <Card className="border shadow-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-xl font-semibold">
                Buat Pengaduan Baru
              </CardTitle>
              <CardDescription>
                Silakan isi detail pengaduan Anda di bawah ini. Jelaskan masalah
                dengan rinci.
              </CardDescription>
            </CardHeader>
            <CardContent className="-mt-2 space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="judul">Judul Pengaduan</Label>
                <Input
                  id="judul"
                  type="text"
                  placeholder="Masukkan judul pengaduan..."
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isi">Isi Pengaduan</Label>
                <Textarea
                  id="isi"
                  placeholder="Jelaskan detail masalah yang ingin Anda laporkan..."
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  disabled={isLoading}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Foto Bukti (Opsional)</Label>
                <FileUploadInput
                  file={file}
                  dragActive={dragActive}
                  isLoading={isLoading}
                  onDrag={handleDrag}
                  onDrop={handleDrop}
                  onFileSelect={handleFileSelect}
                  onRemoveFile={removeFile}
                />
                <p className="text-xs text-muted-foreground">
                  Upload foto bukti untuk memperkuat pengaduan Anda.
                </p>
              </div>

              {formError && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <p className="text-sm font-medium text-destructive">
                      {formError}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button
                type="submit"
                className="w-full"
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
