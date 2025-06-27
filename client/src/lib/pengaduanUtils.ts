import type { Pengaduan, Laporan } from "@/types";

type Status = Pengaduan["status"] | Laporan["status"];

export const getStatusVariant = (
  status: Status
): "secondary" | "default" | "success" | "destructive" => {
  switch (status) {
    case "diajukan":
      return "secondary";
    case "diproses":
      return "default";
    case "selesai":
      return "success";
    default:
      return "destructive";
  }
};

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatStatus = (status: string): string => {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan tidak dikenal.";
};
