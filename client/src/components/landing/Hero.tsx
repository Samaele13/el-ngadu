import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-slate-900 text-white py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[450px]">
          {/* Text Content - Centered on mobile/tablet, positioned slightly right on desktop */}
          <div className="text-center lg:text-left order-2 lg:order-1 space-y-6 lg:pl-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Suarakan Aspirasi, Wujudkan Perubahan.
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0">
              El Ngadu adalah jembatan antara Anda dan pemerintah. Laporkan
              masalah, berikan masukan, dan pantau prosesnya dengan mudah dan
              transparan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-lg mx-auto lg:mx-0">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 text-base font-semibold px-8 py-4 flex-1 sm:flex-none"
              >
                <Link to="/register">Buat Pengaduan Sekarang</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base font-semibold bg-white text-slate-900 hover:bg-slate-200 dark:bg-transparent dark:border-slate-400 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white px-8 py-4 flex-1 sm:flex-none"
              >
                <a href="#alur">Pelajari Alur</a>
              </Button>
            </div>
          </div>

          {/* Image - Centered on mobile/tablet, positioned slightly left on desktop */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-2 lg:pr-8">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-md">
              <img
                src="/assets/image.png"
                alt="Ilustrasi Pengaduan Masyarakat"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
