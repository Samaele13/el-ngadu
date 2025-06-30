import type { PengaduanDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import {
  getStatusVariant,
  formatDate,
  formatStatus,
} from "@/lib/pengaduanUtils";

interface PengaduanInfoCardProps {
  pengaduan: PengaduanDetail;
}

export function PengaduanInfoCard({ pengaduan }: PengaduanInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <Badge
          variant={getStatusVariant(pengaduan.status)}
          className="w-fit mb-2"
        >
          {formatStatus(pengaduan.status)}
        </Badge>
        <CardTitle className="text-2xl">{pengaduan.judul}</CardTitle>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-1">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{pengaduan.nama_pelapor}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(pengaduan.created_at)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{pengaduan.isi}</p>
      </CardContent>
    </Card>
  );
}
