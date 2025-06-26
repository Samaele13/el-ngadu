import { Link } from "react-router-dom";
import { getMyPengaduanService } from "@/services/pengaduanService";
import { useFetchData } from "@/hooks/useFetchData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, FileText } from "lucide-react";
import { RiwayatTable } from "@/components/riwayat/RiwayatTable";
import { RiwayatCards } from "@/components/riwayat/RiwayatCards";

const LoadingState = () => (
  <div className="flex h-40 items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col h-40 items-center justify-center space-y-4 text-center">
    <AlertCircle className="h-8 w-8 text-destructive" />
    <div className="space-y-1">
      <p className="font-semibold text-destructive">Gagal Memuat Data</p>
      <p className="text-sm text-muted-foreground">{error}</p>
    </div>
    <Button variant="outline" size="sm" onClick={onRetry}>
      Coba Lagi
    </Button>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col h-40 items-center justify-center space-y-4 text-center">
    <FileText className="h-8 w-8 text-muted-foreground" />
    <p className="font-medium text-muted-foreground">
      Anda belum membuat pengaduan apapun.
    </p>
  </div>
);

export default function RiwayatPengaduanPage() {
  const {
    data: pengaduan,
    isLoading,
    error,
    refetch,
  } = useFetchData(getMyPengaduanService);

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={refetch} />;
    if (!pengaduan || pengaduan.length === 0) return <EmptyState />;

    return (
      <>
        <div className="hidden md:block">
          <RiwayatTable riwayatList={pengaduan} />
        </div>
        <div className="block md:hidden">
          <RiwayatCards riwayatList={pengaduan} />
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Riwayat Pengaduan</h1>
        <p className="text-muted-foreground">
          Kelola dan pantau semua pengaduan yang pernah Anda buat.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-y-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Daftar Pengaduan Saya</CardTitle>
              <CardDescription>
                {pengaduan
                  ? `${pengaduan.length} pengaduan ditemukan.`
                  : "Memuat..."}
              </CardDescription>
            </div>
            <Button asChild size="sm" className="w-full md:w-auto">
              <Link to="/dashboard/buat-pengaduan">
                <FileText className="w-4 h-4 mr-2" />
                Buat Pengaduan Baru
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
