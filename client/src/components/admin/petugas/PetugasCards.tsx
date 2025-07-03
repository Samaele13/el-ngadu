import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Shield, User as UserIcon } from "lucide-react";
import type { Petugas } from "@/types";
import PetugasActionDropdown from "./PetugasActionDropdown";
import { getLevelVariant, formatLevel } from "@/lib/petugasUtils"; // <-- Impor dari utilitas

interface PetugasCardsProps {
  petugasList: Petugas[];
  onEdit?: (petugas: Petugas) => void;
  onDelete?: (id: number) => void;
}

export default function PetugasCards({
  petugasList,
  onEdit,
  onDelete,
}: PetugasCardsProps) {
  // Fungsi helper lokal dihapus dari sini

  return (
    <div className="grid gap-4 md:hidden">
      {petugasList.map((petugas) => (
        <Card key={petugas.id_petugas} className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                {petugas.nama_petugas}
              </p>
              <p className="text-sm text-muted-foreground">
                @{petugas.username}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {petugas.telp}
              </p>
              <Badge variant={getLevelVariant(petugas.level)} className="gap-1">
                <Shield className="h-3 w-3" />
                {formatLevel(petugas.level)}
              </Badge>
            </div>
            {onEdit && onDelete && (
              <PetugasActionDropdown
                petugas={petugas}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
