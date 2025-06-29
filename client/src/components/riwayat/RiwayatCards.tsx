import type { Pengaduan } from "@/types";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Hash } from "lucide-react";
import {
  getStatusVariant,
  formatDate,
  formatStatus,
} from "@/lib/pengaduanUtils";

interface RiwayatCardsProps {
  riwayatList: Pengaduan[];
}

export function RiwayatCards({ riwayatList }: RiwayatCardsProps) {
  return (
    <div className="space-y-4">
      {riwayatList.map((item) => (
        <Card key={item.id} className="shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  <span>{item.id}</span>
                </div>
                <Badge variant={getStatusVariant(item.status)}>
                  {formatStatus(item.status)}
                </Badge>
              </div>
              <h3 className="font-semibold leading-tight">{item.judul}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1.5" />
                {formatDate(item.created_at)}
              </div>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to={`/dashboard/riwayat/${item.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Detail
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
