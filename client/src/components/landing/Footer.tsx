import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-white mb-2">
              <img src="/assets/image.png" alt="Logo El Ngadu" className="h-10" />
              <span>El Ngadu</span>
            </Link>
            <p className="text-gray-400">Platform Pengaduan Masyarakat Online.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><a href="#tentang" className="hover:text-white">Tentang</a></li>
              <li><a href="#alur" className="hover:text-white">Alur Pengaduan</a></li>
              <li><a href="#kontak" className="hover:text-white">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Akses Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-white">Masuk</Link></li>
              <li><Link to="/register" className="hover:text-white">Daftar</Link></li>
              <li><Link to="/login" className="hover:text-white">Buat Pengaduan</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} El Ngadu. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
