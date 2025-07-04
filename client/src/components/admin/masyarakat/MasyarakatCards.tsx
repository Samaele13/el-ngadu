import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  User as UserIcon,
  Fingerprint,
  MoreHorizontal,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import type { Masyarakat } from "@/types";
import { formatDate } from "@/lib/pengaduanUtils"; // <-- Perubahan di sini

interface MasyarakatCardsProps {
  masyarakatList: Masyarakat[];
  onDelete?: (nik: string, nama: string) => void;
  onEdit?: (masyarakat: Masyarakat) => void;
}

export default function MasyarakatCards({
  masyarakatList,
  onDelete,
  onEdit,
}: MasyarakatCardsProps) {
  // Fungsi formatDate lokal dihapus dari sini

  return (
    <div className="grid gap-4 md:hidden">
      {masyarakatList.map((m) => (
        <Card key={m.nik}>
          <CardContent className="p-4 flex justify-between items-start">
            <div className="space-y-3 flex-1 min-w-0">
              <div className="font-semibold flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                {m.nama}
              </div>
              <div className="text-sm text-muted-foreground space-y-2 pl-6">
                <p>@{m.username}</p>
                <p className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" />
                  {m.nik}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {m.telp}
                </p>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t mt-2">
                Terdaftar: {formatDate(m.created_at)}
              </p>
            </div>
            {(onDelete || onEdit) && (
              <div className="ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEdit && (
                      <DropdownMenuItem
                        onClick={() => onEdit(m)}
                        className="gap-2 cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                        Ubah
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <ConfirmationDialog
                        title="Anda Yakin?"
                        description={`Akun "${m.nama}" akan dihapus.`}
                        onConfirm={() => onDelete(m.nik, m.nama)}
                        confirmText="Ya, Hapus"
                      >
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive gap-2 cursor-pointer focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </ConfirmationDialog>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
