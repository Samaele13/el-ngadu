import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PengaduanActionProps {
  id: number;
}

export default function PengaduanAction({ id }: PengaduanActionProps) {
  return (
    <Button asChild variant="outline" size="sm" className="w-full">
      <Link to={`/dashboard/pengaduan/${id}`}>Lihat & Tanggapi</Link>
    </Button>
  );
}
