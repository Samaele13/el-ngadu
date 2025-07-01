import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, User } from "lucide-react";

export function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6">
      <Card className="mx-auto max-w-2xl border shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <div>
              <h2 className="text-lg font-semibold text-destructive">
                Akses Ditolak
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Anda harus login sebagai masyarakat untuk mengakses halaman ini.
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <Button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Login
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
