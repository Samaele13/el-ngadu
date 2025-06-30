import type { PengaduanDetail } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Edit, Send, CheckCircle } from "lucide-react";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";

interface PetugasActionPanelProps {
  pengaduan: PengaduanDetail;
  isSubmitting: boolean;
  isiTanggapan: string;
  onStatusChange: (newStatus: "diproses" | "selesai") => void;
  onTanggapanSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onIsiTanggapanChange: (value: string) => void;
}

export function PetugasActionPanel({
  pengaduan,
  isSubmitting,
  isiTanggapan,
  onStatusChange,
  onTanggapanSubmit,
  onIsiTanggapanChange,
}: PetugasActionPanelProps) {
  if (pengaduan.status === "diajukan") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Edit className="h-4 w-4" /> Ubah Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => onStatusChange("diproses")}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Proses Pengaduan Ini"
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (pengaduan.status === "diproses" && !pengaduan.tanggapan) {
    return (
      <Card>
        <form onSubmit={onTanggapanSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Send className="h-4 w-4" /> Beri Tanggapan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Tulis tanggapan Anda di sini..."
              rows={5}
              value={isiTanggapan}
              onChange={(e) => onIsiTanggapanChange(e.target.value)}
              disabled={isSubmitting}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting || !isiTanggapan.trim()}
              className="w-full"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Kirim Tanggapan"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  if (pengaduan.status === "diproses" && pengaduan.tanggapan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle className="h-4 w-4" /> Selesaikan Pengaduan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ConfirmationDialog
            title="Selesaikan Pengaduan?"
            description="Tindakan ini akan mengubah status pengaduan menjadi 'selesai' dan tidak dapat diubah kembali."
            onConfirm={() => onStatusChange("selesai")}
            confirmText="Ya, Tandai Selesai"
          >
            <Button
              variant="outline"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Tutup & Selesaikan Laporan"
              )}
            </Button>
          </ConfirmationDialog>
        </CardContent>
      </Card>
    );
  }

  return null;
}
