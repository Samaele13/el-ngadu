import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyStatsService } from "@/services/pengaduanService";
import { getAdminStatsService } from "@/services/statsService";
import type { UserStats, AdminStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  FileText,
  History,
  CheckCircle,
  AlertCircle,
  Users,
  ShieldCheck,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const [stats, setStats] = useState<UserStats | AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading || !user) {
      if (!isAuthLoading) setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (user.userType === "masyarakat") {
          const data = await getMyStatsService();
          setStats(data);
        } else if (user.userType === "petugas" && user.level === "admin") {
          const data = await getAdminStatsService();
          setStats(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal memuat statistik."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (
      user.userType === "masyarakat" ||
      (user.userType === "petugas" && user.level === "admin")
    ) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, [user, isAuthLoading]);

  const renderGreeting = () => (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">
        Selamat Datang,{" "}
        {user?.userType === "masyarakat"
          ? user.nama
          : user?.nama_petugas || "Pengguna"}
        !
      </h1>
      <p className="mt-1 text-muted-foreground">
        Berikut adalah ringkasan aktivitas sistem El-Ngadu.
      </p>
    </div>
  );

  const renderMasyarakatStats = (data: UserStats) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Diajukan"
        value={data.diajukan}
        icon={<FileText className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Sedang Diproses"
        value={data.diproses}
        icon={<History className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Laporan Selesai"
        value={data.selesai}
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );

  const renderAdminStats = (data: AdminStats) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard
        title="Pengaduan Diajukan"
        value={data.pengaduan_diajukan}
        icon={<FileText className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Pengaduan Diproses"
        value={data.pengaduan_diproses}
        icon={<History className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Total Masyarakat"
        value={data.total_masyarakat}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Total Petugas"
        value={data.total_petugas}
        icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Pengaduan Selesai"
        value={data.pengaduan_selesai}
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderGreeting()}
      {error && (
        <div className="p-4 text-center bg-destructive/10 rounded-lg text-sm text-destructive flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {stats &&
        user?.userType === "masyarakat" &&
        renderMasyarakatStats(stats as UserStats)}
      {stats &&
        user?.userType === "petugas" &&
        user.level === "admin" &&
        renderAdminStats(stats as AdminStats)}

      {user?.userType === "petugas" && user.level === "petugas" && (
        <p className="text-muted-foreground pt-4">
          Silakan kelola pengaduan yang masuk melalui menu di samping.
        </p>
      )}
    </div>
  );
}
