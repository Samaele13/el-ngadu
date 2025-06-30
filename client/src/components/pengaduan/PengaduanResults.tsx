import PengaduanTable from "./PengaduanTable";
import PengaduanCards from "./PengaduanCards";
import type { PengaduanWithPelapor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface PengaduanResultsProps {
  pengaduanList: PengaduanWithPelapor[];
}

export default function PengaduanResults({
  pengaduanList,
}: PengaduanResultsProps) {
  return (
    <Card>
      <CardContent className="p-4 md:p-0">
        <PengaduanTable pengaduanList={pengaduanList} />
        <PengaduanCards pengaduanList={pengaduanList} />
      </CardContent>
    </Card>
  );
}
