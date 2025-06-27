import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPetugasService } from "@/services/petugasService";
import { searchMasyarakatService } from "@/services/masyarakatService";
import { searchPengaduanService } from "@/services/pengaduanService";
import type { Petugas, Masyarakat, PengaduanWithPelapor } from "@/types";
import { getErrorMessage } from "@/lib/pengaduanUtils";
import { useAuth } from "./useAuth";

type SearchResult = (Petugas | PengaduanWithPelapor | Masyarakat)[];

export function useSearch() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const query = searchParams.get("q");
  const type = searchParams.get("type");

  const [results, setResults] = useState<SearchResult>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query || !type) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setResults([]);

      try {
        let searchData;
        if (type === "petugas") {
          searchData = await searchPetugasService(query);
        } else if (type === "masyarakat") {
          searchData = await searchMasyarakatService(query);
        } else if (type === "pengaduan") {
          searchData = await searchPengaduanService(query);
        }
        setResults(searchData || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query, type, user]);

  return { results, isLoading, error, query, type };
}
