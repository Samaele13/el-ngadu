import MasyarakatTable from "./MasyarakatTable";
import MasyarakatCards from "./MasyarakatCards";
import type { Masyarakat } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface MasyarakatResultsProps {
  masyarakatList: Masyarakat[];
  onDelete?: (nik: string, nama: string) => void;
}

export default function MasyarakatResults({ masyarakatList, onDelete }: MasyarakatResultsProps) {
  return (
    <Card>
      <CardContent className="p-4 md:p-0">
        <MasyarakatTable masyarakatList={masyarakatList} onDelete={onDelete} />
        <MasyarakatCards masyarakatList={masyarakatList} onDelete={onDelete} />
      </CardContent>
    </Card>
  );
}
