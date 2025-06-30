import React from "react";
import { Upload, Image, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadInputProps {
  file: File | null;
  dragActive: boolean;
  isLoading: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File | null) => void;
  onRemoveFile: () => void;
}

export function FileUploadInput({
  file,
  dragActive,
  isLoading,
  onDrag,
  onDrop,
  onFileSelect,
  onRemoveFile,
}: FileUploadInputProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-dashed p-6 transition-colors",
        { "border-primary bg-primary/5": dragActive },
        { "border-gray-300 hover:border-gray-400": !dragActive },
        { "cursor-not-allowed opacity-50": isLoading },
        { "cursor-pointer": !isLoading }
      )}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
        disabled={isLoading}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        value=""
      />

      {!file ? (
        <div className="text-center">
          <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">
              Klik untuk upload atau{" "}
              <span className="text-primary">drag & drop</span>
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, atau WebP (Maks. 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
          <div className="flex min-w-0 flex-1 items-center space-x-3">
            <div className="flex-shrink-0">
              {file.type.startsWith("image/") ? (
                <Image className="h-8 w-8 text-primary" />
              ) : (
                <FileText className="h-8 w-8 text-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            disabled={isLoading}
            className="text-gray-400 hover:text-destructive"
            aria-label="Hapus file"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
