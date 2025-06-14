import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (user && user.userType === "petugas") {
      navigate("/dashboard/kelola-pengaduan", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (user?.userType !== "masyarakat") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Mengarahkan...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="-mt-4 text-2xl md:text-3xl font-bold">
        Selamat Datang, {user.nama}!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Ini adalah halaman dashboard Anda.
      </p>
    </div>
  );
}
