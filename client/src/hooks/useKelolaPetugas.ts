import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  getPetugasService,
  deletePetugasService,
} from "@/services/petugasService";
import type { Petugas, Pagination } from "@/types";
import { getErrorMessage } from "@/lib/pengaduanUtils";

export function useKelolaPetugas() {
  const [petugasList, setPetugasList] = useState<Petugas[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPetugas, setEditingPetugas] = useState<Petugas | null>(null);

  const fetchPetugas = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPetugasService(page);
      setPetugasList(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPetugas(currentPage);
  }, [fetchPetugas, currentPage]);

  const handleOpenAddDialog = () => {
    setEditingPetugas(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (petugas: Petugas) => {
    setEditingPetugas(petugas);
    setIsDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    setIsDialogOpen(false);
    setEditingPetugas(null);
    fetchPetugas(currentPage);
  };

  const handleDeletePetugas = async (id: number) => {
    try {
      const petugasToDelete = petugasList.find((p) => p.id_petugas === id);
      await deletePetugasService(id);
      toast.success(
        `Akun petugas "${petugasToDelete?.nama_petugas}" berhasil dihapus.`
      );
      if (petugasList.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchPetugas(currentPage);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    petugasList,
    pagination,
    isLoading,
    error,
    isDialogOpen,
    editingPetugas,
    setIsDialogOpen,
    handlePageChange,
    handleDeletePetugas,
    handleOpenEditDialog,
    handleOpenAddDialog,
    handleDialogSuccess,
    refetch: () => fetchPetugas(currentPage),
  };
}
