import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import BuatPengaduanPage from "@/pages/BuatPengaduanPage";
import RiwayatPengaduanPage from "@/pages/RiwayatPengaduanPage";
import DetailPengaduanPage from "@/pages/DetailPengaduanPage";
import KelolaPengaduanPage from "@/pages/KelolaPengaduanPage";
import KelolaPetugasPage from "@/pages/KelolaPetugasPage";
import KelolaMasyarakatPage from "@/pages/KelolaMasyarakatPage";
import LaporanPage from "@/pages/LaporanPage";
import SearchPage from "@/pages/SearchPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilPage from "@/pages/ProfilPage";
import BantuanPage from "@/pages/BantuanPage";
import PengaturanPage from "@/pages/PengaturanPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profil" element={<ProfilPage />} />
          <Route path="bantuan" element={<BantuanPage />} />
          <Route path="pengaturan" element={<PengaturanPage />} />{" "}
          {/* Tambahkan rute baru ini */}
          <Route element={<ProtectedRoute allowedRoles={["masyarakat"]} />}>
            <Route path="buat-pengaduan" element={<BuatPengaduanPage />} />
            <Route path="riwayat" element={<RiwayatPengaduanPage />} />
            <Route path="riwayat/:id" element={<DetailPengaduanPage />} />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["petugas", "admin"]} />}
          >
            <Route path="kelola-pengaduan" element={<KelolaPengaduanPage />} />
            <Route path="pengaduan/:id" element={<DetailPengaduanPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="kelola-petugas" element={<KelolaPetugasPage />} />
            <Route
              path="kelola-masyarakat"
              element={<KelolaMasyarakatPage />}
            />
            <Route path="laporan" element={<LaporanPage />} />
          </Route>
        </Route>

        {/* Rute Alias / Fallback */}
        <Route
          path="/admin/dashboard"
          element={<Navigate to="/dashboard/kelola-pengaduan" replace />}
        />
        <Route
          path="/admin/kelola-pengaduan"
          element={<Navigate to="/dashboard/kelola-pengaduan" replace />}
        />
        <Route
          path="/petugas/kelola-pengaduan"
          element={<Navigate to="/dashboard/kelola-pengaduan" replace />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
