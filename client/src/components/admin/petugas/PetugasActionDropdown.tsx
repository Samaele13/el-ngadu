import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import type { Petugas } from "@/types";

interface PetugasActionDropdownProps {
  petugas: Petugas;
  onEdit: (petugas: Petugas) => void;
  onDelete: (id: number) => void;
}

export default function PetugasActionDropdown({
  petugas,
  onEdit,
  onDelete,
}: PetugasActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Buka menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(petugas)} className="gap-2">
          <Edit className="h-4 w-4" /> Ubah
        </DropdownMenuItem>
        <ConfirmationDialog
          title="Anda Yakin?"
          description={`Akun petugas dengan nama "${petugas.nama_petugas}" akan dihapus secara permanen.`}
          onConfirm={() => onDelete(petugas.id_petugas)}
          confirmText="Ya, Hapus"
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-destructive gap-2"
          >
            <Trash2 className="h-4 w-4" /> Hapus
          </DropdownMenuItem>
        </ConfirmationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
