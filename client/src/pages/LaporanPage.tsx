import { toast } from "sonner";
import { getLaporanService } from "@/services/laporanService";
import { useFetchData } from "@/hooks/useFetchData";
import { exportToCsv } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, FileSpreadsheet, Download } from "lucide-react";
import { LaporanTable } from "@/components/laporan/LaporanTable";
import LaporanCards from "@/components/laporan/LaporanCards";

export default function LaporanPage() {
  const {
    data: laporanList,
    isLoading,
    error,
    refetch,
  } = useFetchData(getLaporanService);

  const handleExport = () => {
    if (laporanList && laporanList.length > 0) {
      const date = new Date().toISOString().slice(0, 10);
      const filename = `laporan-el-ngadu-${date}.csv`;
      const dataToExport = laporanList.map((item) => ({
        "ID Pengaduan": item.id,
        Judul: item.judul,
        "Isi Pengaduan": item.isi.replace(/\n/g, " "),
        Status: item.status,
        "Tanggal Pengaduan": item.tgl_pengaduan,
        "NIK Pelapor": item.nik_pelapor,
        "Nama Pelapor": item.nama_pelapor,
        "ID Tanggapan": item.id_tanggapan,
        "Tanggal Tanggapan": item.tgl_tanggapan,
        "Isi Tanggapan": item.isi_tanggapan
          ? item.isi_tanggapan.replace(/\n/g, " ")
          : "",
        "Nama Penanggap": item.nama_petugas_penanggap,
      }));
      exportToCsv(filename, dataToExport);
      toast.success("Laporan berhasil diekspor!");
    } else {
      toast.error("Tidak ada data untuk diekspor.");
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8 text-center bg-destructive/10 rounded-lg">
          <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
          <p className="mt-2 font-semibold text-destructive">
            Gagal Memuat Data
          </p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            className="mt-4"
          >
            Coba Lagi
          </Button>
        </div>
      );
    }

    if (!laporanList || laporanList.length === 0) {
      return (
        <div className="text-center py-12">
          <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Belum ada data laporan
          </p>
          <p className="text-sm text-muted-foreground">
            Data akan muncul setelah ada pengaduan yang masuk.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="block lg:hidden">
          <LaporanCards laporanList={laporanList} />
        </div>
        <div className="hidden lg:block">
          <LaporanTable laporanList={laporanList} />
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <FileSpreadsheet className="h-7 w-7 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold tracking-tight">
              Generate Laporan
            </h2>
            <p className="text-muted-foreground">
              Rekapitulasi semua pengaduan dan tanggapan.
            </p>
          </div>
        </div>
        <Button
          onClick={handleExport}
          disabled={!laporanList || laporanList.length === 0}
          className="w-full sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Cetak Laporan (CSV)</span>
          <span className="sm:hidden">Cetak CSV</span>
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}
