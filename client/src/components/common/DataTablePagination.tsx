import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pagination } from "@/types";

interface DataTablePaginationProps {
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

export default function DataTablePagination({
  pagination,
  onPageChange,
}: DataTablePaginationProps) {
  if (!pagination || pagination.total_pages <= 1) {
    return null;
  }

  const { current_page, total_pages, total_records, limit } = pagination;

  const from = (current_page - 1) * limit + 1;
  const to = Math.min(current_page * limit, total_records);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t">
      <div className="text-sm text-muted-foreground">
        Menampilkan {from}-{to} dari {total_records} data
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">
          Halaman {current_page} dari {total_pages}
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(current_page - 1)}
            disabled={current_page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(current_page + 1)}
            disabled={current_page === total_pages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
