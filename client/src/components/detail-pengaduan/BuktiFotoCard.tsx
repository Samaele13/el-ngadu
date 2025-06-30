import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

interface BuktiFotoCardProps {
  fotoUrl: string;
}

export function BuktiFotoCard({ fotoUrl }: BuktiFotoCardProps) {
  const fullImageUrl = `http://el-ngadu.test${fotoUrl}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" /> Bukti Foto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <a href={fullImageUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={fullImageUrl}
            alt="Bukti Pengaduan"
            className="rounded-lg border max-w-full h-auto object-cover hover:opacity-80 transition-opacity"
          />
        </a>
      </CardContent>
    </Card>
  );
}
