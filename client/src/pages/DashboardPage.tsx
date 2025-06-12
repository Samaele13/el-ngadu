import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  const getUserName = () => {
    if (!user) return "Tamu";

    if (user.userType === "masyarakat") {
      return user.nama;
    }

    if (user.userType === "petugas") {
      return user.nama_petugas;
    }

    return "Pengguna";
  };

  return (
    <div>
      <h1 className="-mt-4 text-3xl font-bold">Selamat Datang, {getUserName()}!</h1>
      <p className="mt-2 text-muted-foreground">
        Ini adalah halaman dashboard Anda.
      </p>
    </div>
  );
}
