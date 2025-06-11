import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock } from "lucide-react";

interface Pengaduan {
  status: 'diajukan' | 'diproses' | 'selesai';
}

const API_URL = 'http://el-ngadu.test/api';

export function Stats() {
  const [stats, setStats] = useState({ total: 0, proses: 0, selesai: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<Pengaduan[]>(`${API_URL}/pengaduan`);
        const data = response.data;

        const total = data.length;
        const proses = data.filter(p => p.status === 'diproses').length;
        const selesai = data.filter(p => p.status === 'selesai').length;

        setStats({ total, proses, selesai });
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
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
