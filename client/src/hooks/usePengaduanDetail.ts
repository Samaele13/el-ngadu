import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  getDetailPengaduanService,
  updateStatusPengaduanService,
} from "@/services/pengaduanService";
import { createTanggapanService } from "@/services/tanggapanService";
import type { PengaduanDetail, Tanggapan } from "@/types";
import { getErrorMessage } from "@/lib/pengaduanUtils";

export function usePengaduanDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [pengaduan, setPengaduan] = useState<PengaduanDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isiTanggapan, setIsiTanggapan] = useState("");

  const fetchDetail = useCallback(async () => {
    if (!id) {
      setError("ID Pengaduan tidak valid.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDetailPengaduanService(id);
      setPengaduan(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleStatusChange = async (newStatus: "diproses" | "selesai") => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateStatusPengaduanService(id, newStatus);
      setPengaduan((prev) => (prev ? { ...prev, status: newStatus } : null));
      toast.success("Status berhasil diubah!");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTanggapanSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !isiTanggapan.trim() || user?.userType !== "petugas") return;

    setIsSubmitting(true);
    try {
      await createTanggapanService({
        id_pengaduan: id,
        isi_tanggapan: isiTanggapan,
      });
      toast.success("Tanggapan berhasil dikirim!");

      const newTanggapan: Tanggapan = {
        id_tanggapan: Date.now(),
        isi_tanggapan: isiTanggapan,
        nama_penanggap: user.nama_petugas,
        tgl_tanggapan: new Date().toISOString(),
      };
      setPengaduan((prev) =>
        prev ? { ...prev, tanggapan: newTanggapan, status: "selesai" } : null
      );
      setIsiTanggapan("");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    pengaduan,
    isLoading,
    error,
    isSubmitting,
    isiTanggapan,
    setIsiTanggapan,
    handleStatusChange,
    handleTanggapanSubmit,
    refetch: fetchDetail,
  };
}
