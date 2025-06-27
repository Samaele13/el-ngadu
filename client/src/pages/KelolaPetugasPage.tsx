import { useKelolaPetugas } from "@/hooks/useKelolaPetugas";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, PlusCircle, Users } from "lucide-react";
import PetugasResults from "@/components/admin/petugas/PetugasResults";
import PetugasDialog from "@/components/admin/PetugasDialog";
import DataTablePagination from "@/components/common/DataTablePagination";

const PageHeader = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="flex items-center gap-4">
      <Users className="h-7 w-7 text-primary" />
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manajemen Petugas</h2>
        <p className="text-muted-foreground">
          Kelola akun untuk admin dan petugas sistem.
        </p>
      </div>
    </div>
    <Button onClick={onAdd} className="w-full sm:w-auto">
      <PlusCircle className="mr-2 h-4 w-4" />
      Tambah Petugas
    </Button>
  </div>
);

const LoadingState = () => (
  <div className="flex justify-center p-12">
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
  <div className="text-center p-8">
    <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
    <h3 className="text-lg font-semibold text-destructive mb-2">
      Gagal Memuat Data
    </h3>
    <p className="text-sm text-muted-foreground mb-4">{error}</p>
    <Button onClick={onRetry}>Coba Lagi</Button>
  </div>
);

const EmptyState = () => (
  <div className="p-8 text-center text-muted-foreground">
    <p>Belum ada data petugas yang tersedia.</p>
  </div>
);

export default function KelolaPetugasPage() {
  const {
    petugasList,
    pagination,
    isLoading,
    error,
    isDialogOpen,
    editingPetugas,
    setIsDialogOpen,
    handlePageChange,
    handleDeletePetugas,
    handleOpenEditDialog,
    handleOpenAddDialog,
    handleDialogSuccess,
    refetch,
  } = useKelolaPetugas();

  const renderContent = () => {
    if (isLoading && !petugasList.length) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={refetch} />;
    if (!petugasList.length) return <EmptyState />;

    return (
      <PetugasResults
        petugasList={petugasList}
        onEdit={handleOpenEditDialog}
        onDelete={handleDeletePetugas}
      />
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader onAdd={handleOpenAddDialog} />

      <Card className="relative">
        {isLoading && petugasList.length > 0 && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        <CardContent className="p-0">{renderContent()}</CardContent>
        {pagination && pagination.total_pages > 1 && (
          <DataTablePagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </Card>

      <PetugasDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleDialogSuccess}
        petugasToEdit={editingPetugas}
      />
    </div>
  );
}
