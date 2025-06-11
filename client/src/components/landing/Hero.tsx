import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-slate-900 text-white py-20 md:py-28">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Suarakan Aspirasi, Wujudkan Perubahan.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            El Ngadu adalah jembatan antara Anda dan pemerintah. Laporkan
            masalah, berikan masukan, dan pantau prosesnya dengan mudah dan
            transparan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-lg"
            >
              <Link to="/register">Buat Pengaduan Sekarang</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg bg-white text-slate-900 hover:bg-gray-200"
            >
              <a href="#alur">Pelajari Alur</a>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/assets/image.png"
            alt="Ilustrasi Pengaduan Masyarakat"
            className="max-w-md w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
