import { Link } from "react-router-dom";
import { usePengaduanDetail } from "@/hooks/usePengaduanDetail";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { PengaduanInfoCard } from "@/components/detail-pengaduan/PengaduanInfoCard";
import { BuktiFotoCard } from "@/components/detail-pengaduan/BuktiFotoCard";
import { TanggapanCard } from "@/components/detail-pengaduan/TanggapanCard";
import { PetugasActionPanel } from "@/components/detail-pengaduan/PetugasActionPanel";

export default function DetailPengaduanPage() {
  const {
    user,
    pengaduan,
    isLoading,
    error,
    refetch,
    isSubmitting,
    isiTanggapan,
    setIsiTanggapan,
    handleStatusChange,
    handleTanggapanSubmit,
  } = usePengaduanDetail();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !pengaduan) {
    return (
      <div className="text-center p-8 bg-destructive/10 rounded-lg max-w-md mx-auto">
        <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
        <p className="mt-4 font-semibold text-destructive">
          {error || "Data tidak ditemukan."}
        </p>
        <Button asChild variant="link" className="mt-4" onClick={refetch}>
          <Link to="/dashboard">Kembali ke Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-2 space-y-6">
        <PengaduanInfoCard pengaduan={pengaduan} />
        {pengaduan.foto_bukti && (
          <BuktiFotoCard fotoUrl={pengaduan.foto_bukti} />
        )}
      </div>

      <div className="lg:col-span-1 space-y-6">
        <TanggapanCard tanggapan={pengaduan.tanggapan} />
        {user?.userType === "petugas" && (
          <PetugasActionPanel
            pengaduan={pengaduan}
            isSubmitting={isSubmitting}
            isiTanggapan={isiTanggapan}
            onStatusChange={handleStatusChange}
            onTanggapanSubmit={handleTanggapanSubmit}
            onIsiTanggapanChange={setIsiTanggapan}
          />
        )}
      </div>
    </div>
  );
}
