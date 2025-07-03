// CLIENT/src/components/admin/PetugasDialog.tsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PetugasSchema, type PetugasPayload } from "@/lib/validators";
import {
  createPetugasService,
  updatePetugasService,
} from "@/services/petugasService";
import type { Petugas } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Loader2 } from "lucide-react";

interface PetugasDialogProps {
  petugasToEdit?: Petugas | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function PetugasDialog({
  petugasToEdit,
  isOpen,
  onOpenChange,
  onSuccess,
}: PetugasDialogProps) {
  const isEditMode = !!petugasToEdit;

  const form = useForm<PetugasPayload>({
    resolver: zodResolver(PetugasSchema),
    defaultValues: {
      nama_petugas: "",
      username: "",
      password: "",
      telp: "",
      level: "petugas",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.clearErrors();
      if (isEditMode && petugasToEdit) {
        form.reset({
          nama_petugas: petugasToEdit.nama_petugas,
          username: petugasToEdit.username,
          telp: petugasToEdit.telp,
          level: petugasToEdit.level,
          password: "",
        });
      } else {
        form.reset({
          nama_petugas: "",
          username: "",
          password: "",
          telp: "",
          level: "petugas",
        });
      }
    }
  }, [isOpen, petugasToEdit, isEditMode, form]);

  const onSubmit = async (data: PetugasPayload) => {
    try {
      const payload = { ...data };
      if (isEditMode && !payload.password) {
        delete payload.password;
      }

      if (isEditMode && petugasToEdit) {
        await updatePetugasService(petugasToEdit.id_petugas, payload);
        toast.success("Data petugas berhasil diperbarui!");
      } else {
        await createPetugasService(payload);
        toast.success("Akun petugas berhasil dibuat!");
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      toast.error(errorMessage);
      form.setError("root", { type: "server", message: errorMessage });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Ubah Data Petugas" : "Tambah Akun Petugas Baru"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="nama_petugas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={
                        isEditMode
                          ? "Isi jika ingin ganti"
                          : "Minimal 8 karakter"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="08123..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="petugas">Petugas</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
