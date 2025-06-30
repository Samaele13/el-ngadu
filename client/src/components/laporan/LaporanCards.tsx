import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Laporan } from "@/types";
import {
  getStatusVariant,
  formatDate,
  formatStatus,
} from "@/lib/pengaduanUtils";

interface LaporanCardsProps {
  laporanList: Laporan[];
}

export default function LaporanCards({ laporanList }: LaporanCardsProps) {
  return (
    <div className="space-y-3">
      {laporanList.map((item) => (
        <Card
          key={`laporan-card-${item.id}-${item.id_tanggapan || "null"}`}
          className="w-full"
        >
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-sm font-semibold break-words line-clamp-2 flex-1">
                  {item.judul}
                </CardTitle>
                <Badge
                  variant={getStatusVariant(item.status)}
                  className="text-xs flex-shrink-0"
                >
                  {formatStatus(item.status)}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                <div className="flex flex-col gap-1">
                  <span>{formatDate(item.tgl_pengaduan)}</span>
                  <span className="font-medium">{item.nama_pelapor}</span>
                </div>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-xs">
                <p className="font-medium text-muted-foreground mb-1">
                  Pengaduan:
                </p>
                <p className="text-foreground line-clamp-3">{item.isi}</p>
              </div>
              <hr className="border-border" />
              <div className="text-xs">
                <p className="font-medium text-muted-foreground mb-2">
                  Tanggapan:
                </p>
                {item.isi_tanggapan ? (
                  <div className="space-y-2">
                    <div className="bg-muted/50 p-3 rounded-md border-l-2 border-primary/50">
                      <p className="text-foreground text-xs leading-relaxed">
                        {item.isi_tanggapan}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="font-medium">
                        {item.nama_petugas_penanggap}
                      </span>
                      <span>{formatDate(item.tgl_tanggapan)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/30 p-3 rounded-md text-center">
                    <p className="text-xs text-muted-foreground italic">
                      Belum ada tanggapan
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
