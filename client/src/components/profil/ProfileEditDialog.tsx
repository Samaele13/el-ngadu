import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ProfileEditSchema, type ProfileEditPayload } from "@/lib/validators";
import { updateProfileService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Edit } from "lucide-react";

export default function ProfileEditDialog() {
  const { user, updateUser } = useAuth();

  const form = useForm<ProfileEditPayload>({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: { nama: "", nama_petugas: "", username: "", telp: "" },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        nama: user.userType === 'masyarakat' ? user.nama : undefined,
        nama_petugas: user.userType === 'petugas' ? user.nama_petugas : undefined,
        username: user.username,
        telp: user.telp,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileEditPayload) => {
    try {
      await updateProfileService(data);
      updateUser(data); // Perbarui state di AuthContext
      toast.success("Profil berhasil diperbarui!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2"><Edit className="h-4 w-4" /> Ubah Profil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader><DialogTitle>Ubah Detail Profil</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            {user?.userType === 'masyarakat' ? (
              <FormField control={form.control} name="nama" render={({ field }) => (<FormItem><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            ) : (
              <FormField control={form.control} name="nama_petugas" render={({ field }) => (<FormItem><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            )}
            <FormField control={form.control} name="username" render={({ field }) => (<FormItem><FormLabel>Username</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="telp" render={({ field }) => (<FormItem><FormLabel>No. Telepon</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <DialogFooter><Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Simpan Perubahan</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
