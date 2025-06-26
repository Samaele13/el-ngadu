import type { Petugas, Masyarakat, PengaduanWithPelapor } from "@/types";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import PetugasResults from "@/components/admin/petugas/PetugasResults";
import MasyarakatResults from "@/components/admin/masyarakat/MasyarakatResults";
import PengaduanResults from "@/components/pengaduan/PengaduanResults";

const LoadingState = () => (
  <div className="flex justify-center items-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <AlertCircle className="h-10 w-10 text-destructive mb-2" />
    <p className="font-semibold text-destructive">Gagal Melakukan Pencarian</p>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

const NoResultsState = ({ query }: { query: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Search className="h-10 w-10 text-muted-foreground mb-2" />
    <p className="font-semibold">Tidak Ada Hasil</p>
    <p className="text-sm text-muted-foreground">
      Tidak ditemukan hasil untuk pencarian{" "}
      <span className="font-bold">"{query}"</span>.
    </p>
  </div>
);

const InitialState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Search className="h-10 w-10 text-muted-foreground mb-2" />
    <p className="font-semibold">Mulai Mencari</p>
    <p className="text-sm text-muted-foreground">
      Gunakan bilah pencarian di atas untuk menemukan data.
    </p>
  </div>
);

export default function SearchPage() {
  const { results, isLoading, error, query, type } = useSearch();

  const renderResults = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    if (!query) return <InitialState />;

    if (results.length === 0) return <NoResultsState query={query} />;

    switch (type) {
      case "petugas":
        return <PetugasResults petugasList={results as Petugas[]} />;
      case "masyarakat":
        return <MasyarakatResults masyarakatList={results as Masyarakat[]} />;
      case "pengaduan":
        return (
          <PengaduanResults pengaduanList={results as PengaduanWithPelapor[]} />
        );
      default:
        return (
          <p className="text-center text-muted-foreground">
            Tipe pencarian tidak dikenal.
          </p>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Hasil Pencarian</h1>
        {query && (
          <p className="text-muted-foreground mt-1">
            Menampilkan hasil untuk:{" "}
            <span className="font-semibold text-foreground">"{query}"</span>
          </p>
        )}
      </div>
      <div className="mt-6">{renderResults()}</div>
    </div>
  );
}
