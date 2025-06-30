import type { PengaduanWithPelapor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PengaduanAction from "./PengaduanAction"; // Impor komponen Aksi
import { getStatusVariant, formatDate } from "@/lib/pengaduanUtils"; // Impor dari utils

interface PengaduanCardsProps {
  pengaduanList: PengaduanWithPelapor[];
}

export default function PengaduanCards({ pengaduanList }: PengaduanCardsProps) {
  return (
    <div className="grid gap-4 md:hidden">
      {pengaduanList.map((item, index) => (
        <Card key={`${item.id}-${index}`}>
          <CardContent className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <span className="text-sm font-semibold">#{item.id}</span>
              <Badge variant={getStatusVariant(item.status)}>
                {item.status}
              </Badge>
            </div>
            <h3 className="mb-2 break-words text-base font-semibold">
              {item.judul}
            </h3>
            <div className="mb-4 space-y-1 text-xs text-muted-foreground">
              <p>
                Oleh: <strong>{item.nama_pelapor}</strong>
              </p>
              <p>Tanggal: {formatDate(item.created_at)}</p>
            </div>
            <PengaduanAction id={item.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
