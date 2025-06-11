import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { step: 1, title: "Registrasi", description: "Daftar akun dengan mengisi data diri Anda secara lengkap." },
  { step: 2, title: "Tulis Pengaduan", description: "Sampaikan keluhan atau aspirasi Anda dengan jelas dan lengkap." },
  { step: 3, title: "Verifikasi", description: "Pengaduan Anda akan diverifikasi oleh petugas." },
  { step: 4, title: "Tanggapan", description: "Dapatkan tanggapan dan tindak lanjut dari petugas." },
];

export function FlowSection() {
  return (
    <section id="alur" className="py-16 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Alur Pengaduan</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Berikut adalah langkah-langkah mudah untuk membuat pengaduan melalui platform El Ngadu.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <Card key={item.step} className="text-center">
              <CardHeader>
                <div className="bg-slate-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
