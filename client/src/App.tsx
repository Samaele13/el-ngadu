import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import BuatPengaduanPage from "./pages/BuatPengaduanPage";

function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rute Terlindungi untuk Masyarakat */}
      <Route element={<ProtectedRoute allowedRoles={["masyarakat"]} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="buat-pengaduan" element={<BuatPengaduanPage />} />
          {/* <Route path="riwayat" element={<RiwayatPage />} /> */}
        </Route>
      </Route>

      {/* Rute untuk Admin dan Petugas bisa ditambahkan di sini nanti */}
    </Routes>
  );
}

export default App;
