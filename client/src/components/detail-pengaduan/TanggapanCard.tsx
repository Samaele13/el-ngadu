import type { Tanggapan } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/pengaduanUtils";

interface TanggapanCardProps {
  tanggapan: Tanggapan | null;
}

export function TanggapanCard({ tanggapan }: TanggapanCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> Tanggapan Petugas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tanggapan ? (
          <div className="space-y-4">
            <p className="text-sm whitespace-pre-wrap">
              {tanggapan.isi_tanggapan}
            </p>
            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
              <p>
                Ditanggapi oleh: <strong>{tanggapan.nama_penanggap}</strong>
              </p>
              <p>Tanggal: {formatDate(tanggapan.tgl_tanggapan)}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Belum ada tanggapan.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
