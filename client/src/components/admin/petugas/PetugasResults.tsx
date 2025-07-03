import PetugasTable from "./PetugasTable";
import PetugasCards from "./PetugasCards";
import type { Petugas } from "@/types";

interface PetugasResultsProps {
  petugasList: Petugas[];
  onEdit?: (petugas: Petugas) => void;
  onDelete?: (id: number) => void;
}

export default function PetugasResults({
  petugasList,
  onEdit,
  onDelete,
}: PetugasResultsProps) {
  return (
    <>
      <div className="hidden md:block">
        <PetugasTable
          petugasList={petugasList}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      <div className="block md:hidden">
        <PetugasCards
          petugasList={petugasList}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  );
}
