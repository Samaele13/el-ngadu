// CLIENT/src/components/landing/Stats.tsx

import { useEffect, useState } from "react";
import api from "@/lib/api"; // Perhatikan impor ini
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock } from "lucide-react";

interface StatsData {
  total: number;
  proses: number;
  selesai: number;
}

export function Stats() {
  const [stats, setStats] = useState<StatsData>({ total: 0, proses: 0, selesai: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get<StatsData>('/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<BarChart className="h-8 w-8 text-blue-500" />} title="Total Pengaduan" value={stats.total} />
          <StatCard icon={<Clock className="h-8 w-8 text-yellow-500" />} title="Pengaduan Diproses" value={stats.proses} />
          <StatCard icon={<CheckCircle className="h-8 w-8 text-green-500" />} title="Pengaduan Selesai" value={stats.selesai} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}