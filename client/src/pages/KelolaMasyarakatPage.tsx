import { useKelolaMasyarakat } from "@/hooks/useKelolaMasyarakat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Users } from "lucide-react";
import MasyarakatTable from "@/components/admin/masyarakat/MasyarakatTable";
import MasyarakatCards from "@/components/admin/masyarakat/MasyarakatCards";
import MasyarakatDialog from "@/components/admin/masyarakat/MasyarakatDialog";
import DataTablePagination from "@/components/common/DataTablePagination";

const PageHeader = () => (
  <div className="text-center space-y-2">
    <div className="flex justify-center items-center gap-3 mb-2">
      <Users className="h-7 w-7 text-primary" />
      <h2 className="text-2xl font-bold tracking-tight">
        Manajemen Masyarakat
      </h2>
    </div>
    <p className="text-muted-foreground">
      Lihat dan kelola semua akun masyarakat yang terdaftar.
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex justify-center items-center p-8 min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <Card>
    <CardContent className="p-8 text-center">
      <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-destructive mb-2">
        Gagal Memuat Data
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{error}</p>
      <Button onClick={onRetry}>Coba Lagi</Button>
    </CardContent>
  </Card>
);

export default function KelolaMasyarakatPage() {
  const {
    masyarakatList,
    pagination,
    isLoading,
    error,
    isDialogOpen,
    editingMasyarakat,
    isDesktop,
    setIsDialogOpen,
    handlePageChange,
    handleDeleteMasyarakat,
    handleOpenEditDialog,
    handleDialogSuccess,
    refetch,
  } = useKelolaMasyarakat();

  const renderContent = () => {
    if (isLoading && masyarakatList.length === 0) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={refetch} />;

    if (masyarakatList.length === 0) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          <p>Belum ada akun masyarakat yang terdaftar.</p>
        </div>
      );
    }

    return isDesktop ? (
      <MasyarakatTable
        masyarakatList={masyarakatList}
        onDelete={handleDeleteMasyarakat}
        onEdit={handleOpenEditDialog}
      />
    ) : (
      <MasyarakatCards
        masyarakatList={masyarakatList}
        onDelete={handleDeleteMasyarakat}
        onEdit={handleOpenEditDialog}
      />
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader />

      <Card className="relative">
        {isLoading && masyarakatList.length > 0 && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        <CardContent className="p-4 md:p-0">{renderContent()}</CardContent>
        {pagination && pagination.total_pages > 1 && (
          <DataTablePagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </Card>

      <MasyarakatDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleDialogSuccess}
        masyarakatToEdit={editingMasyarakat}
      />
    </div>
  );
}
