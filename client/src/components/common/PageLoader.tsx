import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
        <p>Tunggu Sebentar..</p>
      </div>
    </div>
  );
}
