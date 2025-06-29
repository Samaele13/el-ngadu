import type { PengaduanWithPelapor } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PengaduanAction from "./PengaduanAction";
import {
  getStatusVariant,
  formatDate,
  formatStatus,
} from "@/lib/pengaduanUtils";

interface PengaduanTableProps {
  pengaduanList: PengaduanWithPelapor[];
}

export default function PengaduanTable({ pengaduanList }: PengaduanTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead className="hidden md:table-cell w-[200px]">
              Pelapor
            </TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="hidden lg:table-cell w-[150px]">
              Tanggal
            </TableHead>
            <TableHead className="w-[180px] text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pengaduanList.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">#{item.id}</TableCell>
              <TableCell className="truncate font-medium">
                {item.judul}
              </TableCell>
              <TableCell className="hidden md:table-cell truncate">
                {item.nama_pelapor}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={getStatusVariant(item.status)}>
                  {formatStatus(item.status)}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {formatDate(item.created_at)}
              </TableCell>
              <TableCell className="text-center">
                <PengaduanAction id={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
