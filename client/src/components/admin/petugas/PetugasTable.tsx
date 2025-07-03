import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Phone, Shield, User as UserIcon } from "lucide-react";
import type { Petugas } from "@/types";
import PetugasActionDropdown from "./PetugasActionDropdown";
import { getLevelVariant, formatLevel } from "@/lib/petugasUtils";

interface PetugasTableProps {
  petugasList: Petugas[];
  onEdit?: (petugas: Petugas) => void;
  onDelete?: (id: number) => void;
}

export default function PetugasTable({
  petugasList,
  onEdit,
  onDelete,
}: PetugasTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Petugas</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Telepon</TableHead>
            <TableHead className="text-center">Level</TableHead>
            {onEdit && onDelete && (
              <TableHead className="text-right w-[100px]">Aksi</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {petugasList.map((petugas) => (
            <TableRow key={petugas.id_petugas}>
              <TableCell className="font-medium flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                {petugas.nama_petugas}
              </TableCell>
              <TableCell>{petugas.username}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {petugas.telp}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={getLevelVariant(petugas.level)}
                  className="gap-1"
                >
                  <Shield className="h-3 w-3" />
                  {formatLevel(petugas.level)}
                </Badge>
              </TableCell>
              {onEdit && onDelete && (
                <TableCell className="text-right">
                  <PetugasActionDropdown
                    petugas={petugas}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
