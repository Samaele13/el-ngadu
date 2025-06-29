import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  getMasyarakatService,
  deleteMasyarakatService,
} from "@/services/masyarakatService";
import type { Masyarakat, Pagination } from "@/types";
import { useMediaQuery } from "@/hooks/utils/use-media-query";
import { getErrorMessage } from "@/lib/pengaduanUtils";

export function useKelolaMasyarakat() {
  const [masyarakatList, setMasyarakatList] = useState<Masyarakat[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMasyarakat, setEditingMasyarakat] = useState<Masyarakat | null>(
    null
  );

  const isDesktop = useMediaQuery("(min-width: 768px)") ?? false;

  const fetchMasyarakat = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMasyarakatService(page);
      setMasyarakatList(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMasyarakat(currentPage);
  }, [fetchMasyarakat, currentPage]);

  const handleOpenEditDialog = (masyarakat: Masyarakat) => {
    setEditingMasyarakat(masyarakat);
    setIsDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    setIsDialogOpen(false);
    setEditingMasyarakat(null);
    fetchMasyarakat(currentPage); // Fetch ulang data setelah sukses
  };

  const handleDeleteMasyarakat = async (nik: string, nama: string) => {
    try {
      await deleteMasyarakatService(nik);
      toast.success(`Akun masyarakat "${nama}" berhasil dihapus.`);
      if (masyarakatList.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchMasyarakat(currentPage);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    masyarakatList,
    pagination,
    isLoading,
    error,
    isDialogOpen,
    editingMasyarakat,
    isDesktop,
    setIsDialogOpen,
    handlePageChange,
    handleDeleteMasyarakat,
    handleOpenEditDialog,
    handleDialogSuccess,
    refetch: () => fetchMasyarakat(currentPage),
  };
}
