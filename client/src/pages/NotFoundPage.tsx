import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-6">
      <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
      <h1 className="text-6xl font-extrabold text-destructive">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Halaman Tidak Ditemukan</h2>
      <p className="text-muted-foreground mt-2 max-w-sm">
        Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau
        tidak pernah ada.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">
          <Home className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </Button>
    </div>
  );
}
