export interface Masyarakat {
  nik: string;
  nama: string;
  username: string;
}

export interface Petugas {
  id_petugas: number;
  nama_petugas: string;
  username: string;
  level: 'admin' | 'petugas';
}

export type User =
  | (Masyarakat & { userType: 'masyarakat' })
  | (Petugas & { userType: 'petugas' });

