import { useState, useCallback } from "react";
import { toast } from "sonner";

interface FileUploadOptions {
  maxSize?: number; // dalam byte
  allowedTypes?: string[];
}

const defaultOptions: FileUploadOptions = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
};

export function useFileUpload(options: FileUploadOptions = {}) {
  const { maxSize, allowedTypes } = { ...defaultOptions, ...options };

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = useCallback(
    (fileToValidate: File) => {
      if (!allowedTypes?.includes(fileToValidate.type)) {
        throw new Error(
          "Format file tidak didukung. Gunakan JPG, PNG, atau WebP."
        );
      }
      if (fileToValidate.size > maxSize!) {
        throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
      }
    },
    [allowedTypes, maxSize]
  );

  const handleFileSelect = useCallback(
    (selectedFile: File | undefined | null) => {
      if (!selectedFile) return;
      try {
        validateFile(selectedFile);
        setFile(selectedFile);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "File tidak valid");
      }
    },
    [validateFile]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    },
    [handleFileSelect]
  );

  const removeFile = useCallback(() => setFile(null), []);

  return {
    file,
    dragActive,
    handleFileSelect,
    handleDrag,
    handleDrop,
    removeFile,
  };
}
