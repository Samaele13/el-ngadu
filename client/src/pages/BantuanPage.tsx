import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, User, FileText, ShieldCheck } from "lucide-react";

const faqItems = [
  {
    value: "item-1",
    question: "Bagaimana cara membuat pengaduan baru?",
    answer:
      "Untuk membuat pengaduan baru, login sebagai masyarakat, lalu navigasi ke menu 'Buat Pengaduan' di sidebar. Isi formulir yang disediakan dengan lengkap dan jelas, lalu klik tombol 'Kirim Pengaduan'.",
    icon: <FileText className="h-5 w-5 text-primary/80" />,
  },
  {
    value: "item-2",
    question: "Bagaimana cara melihat status pengaduan saya?",
    answer:
      "Anda dapat melihat semua riwayat dan status pengaduan Anda di halaman 'Riwayat Pengaduan'. Statusnya bisa berupa 'Diajukan', 'Diproses', atau 'Selesai'.",
    icon: <FileText className="h-5 w-5 text-primary/80" />,
  },
  {
    value: "item-3",
    question: "Siapa saja yang bisa menanggapi pengaduan saya?",
    answer:
      "Setiap pengaduan yang masuk akan diverifikasi dan ditanggapi oleh petugas atau admin yang berwenang. Anda akan menerima notifikasi setiap kali ada tanggapan atau perubahan status.",
    icon: <ShieldCheck className="h-5 w-5 text-primary/80" />,
  },
  {
    value: "item-4",
    question: "Apa perbedaan peran Petugas dan Admin?",
    answer:
      "Petugas memiliki wewenang untuk melihat dan menanggapi pengaduan. Admin memiliki semua wewenang petugas, ditambah dengan kemampuan untuk mengelola data pengguna (masyarakat dan petugas lain) serta men-generate laporan.",
    icon: <ShieldCheck className="h-5 w-5 text-primary/80" />,
  },
  {
    value: "item-5",
    question: "Bagaimana cara mengubah profil atau password saya?",
    answer:
      "Navigasi ke halaman 'Profil Saya' melalui menu di sidebar atau dropdown menu di header. Di sana Anda akan menemukan opsi untuk mengubah detail profil dan kata sandi Anda.",
    icon: <User className="h-5 w-5 text-primary/80" />,
  },
];

export default function BantuanPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <HelpCircle className="h-7 w-7 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pusat Bantuan</h2>
          <p className="text-muted-foreground">
            Temukan jawaban untuk pertanyaan yang sering diajukan di sini.
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {/* Tambahkan ikon di sini */}
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pl-11">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
