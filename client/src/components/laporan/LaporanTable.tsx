import type { Laporan } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  getStatusVariant,
  formatDate,
  formatStatus,
} from "@/lib/pengaduanUtils";

interface LaporanTableProps {
  laporanList: Laporan[];
}

export function LaporanTable({ laporanList }: LaporanTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Pengaduan</TableHead>
                <TableHead className="w-[180px]">Pelapor</TableHead>
                <TableHead className="w-[120px] text-center">Status</TableHead>
                <TableHead className="w-[300px]">Tanggapan</TableHead>
                <TableHead className="w-[180px]">Penanggap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laporanList.map((item) => (
                <TableRow
                  key={`laporan-${item.id}-${item.id_tanggapan || "null"}`}
                >
                  <TableCell>
                    <p className="font-medium">{item.judul}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.tgl_pengaduan)}
                    </p>
                  </TableCell>
                  <TableCell>{item.nama_pelapor}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(item.status)}>
                      {formatStatus(item.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.isi_tanggapan || (
                      <span className="text-muted-foreground italic">
                        Belum ditanggapi
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <p>{item.nama_petugas_penanggap || "-"}</p>
                    {item.tgl_tanggapan && (
                      <p className="text-xs text-muted-foreground">
                        {formatDate(item.tgl_tanggapan)}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
