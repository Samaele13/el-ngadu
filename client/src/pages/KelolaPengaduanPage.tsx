import { useEffect, useState, useCallback } from "react";
import { getAllPengaduanService } from "@/services/pengaduanService";
import type { PengaduanWithPelapor, Pagination } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/utils/use-media-query";
import PengaduanTable from "@/components/pengaduan/PengaduanTable";
import PengaduanCards from "@/components/pengaduan/PengaduanCards";
import DataTablePagination from "@/components/common/DataTablePagination";

export default function KelolaPengaduanPage() {
  const [pengaduan, setPengaduan] = useState<PengaduanWithPelapor[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const fetchPengaduan = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getAllPengaduanService(page);
      setPengaduan(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPengaduan(currentPage);
  }, [fetchPengaduan, currentPage]);

  if (isLoading || isDesktop === null) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-destructive/10 rounded-lg">
        <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
        <p className="mt-2 font-semibold text-destructive">Gagal Memuat Data</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CardHeader className="p-0">
        <CardTitle>Kelola Pengaduan</CardTitle>
        <CardDescription>
          Daftar semua pengaduan yang masuk dari masyarakat.
        </CardDescription>
      </CardHeader>
      <Card>
        <CardContent className="p-0">
          {/* Render satu komponen saja berdasarkan ukuran layar */}
          {isDesktop ? (
            <PengaduanTable pengaduanList={pengaduan} />
          ) : (
            <div className="p-4">
              <PengaduanCards pengaduanList={pengaduan} />
            </div>
          )}
        </CardContent>
        <DataTablePagination
          pagination={pagination}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
}
