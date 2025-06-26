export interface Tanggapan {
  id_tanggapan: number;
  tgl_tanggapan: string;
  isi_tanggapan: string;
  nama_penanggap: string;
}

export interface Pengaduan {
  id: number;
  judul: string;
  isi: string;
  status: "diajukan" | "diproses" | "selesai";
  foto_bukti: string | null;
  created_at: string;
  nik_masyarakat: string;
}

export interface PengaduanDetail extends Pengaduan {
  nama_pelapor: string;
  tanggapan: Tanggapan | null;
}

export interface Masyarakat {
  nik: string;
  nama: string;
  username: string;
  telp: string;
  created_at: string;
}

export interface Petugas {
  id_petugas: number;
  nama_petugas: string;
  username: string;
  telp: string;
  level: "admin" | "petugas";
}

export type User =
  | (Masyarakat & { userType: "masyarakat" })
  | (Petugas & { userType: "petugas" });

export interface Notification {
  id: number;
  user_identifier: string;
  user_type: "masyarakat" | "petugas";
  message: string;
  link_url: string | null;
  is_read: boolean | number;
  created_at: string;
}

export interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

export interface PengaduanWithPelapor {
  id: number;
  judul: string;
  status: "diajukan" | "diproses" | "selesai";
  created_at: string;
  nama_pelapor: string;
}

export interface Laporan {
  id: number;
  judul: string;
  isi: string;
  status: "diajukan" | "diproses" | "selesai";
  tgl_pengaduan: string;
  nik_pelapor: string;
  nama_pelapor: string;
  id_tanggapan: number | null;
  tgl_tanggapan: string | null;
  isi_tanggapan: string | null;
  nama_petugas_penanggap: string | null;
}

export interface UserStats {
  diajukan: number;
  diproses: number;
  selesai: number;
  total: number;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_records: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  pagination: Pagination;
  data: T[];
}

export interface AdminStats {
  pengaduan_diajukan: number;
  pengaduan_diproses: number;
  pengaduan_selesai: number;
  total_masyarakat: number;
  total_petugas: number;
}
