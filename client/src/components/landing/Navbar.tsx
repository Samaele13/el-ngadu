import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#tentang", label: "Tentang" },
  { href: "#alur", label: "Alur Pengaduan" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <img src="/assets/image.png" alt="Logo El Ngadu" className="h-10" />
            <span>El Ngadu</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Button asChild variant="secondary">
              <Link to="/login">Masuk</Link>
            </Button>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
              <Link to="/register">Daftar</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-slate-800 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-white">
                  {link.label}
                </a>
              ))}
              <div className="border-t border-slate-700 pt-4 flex flex-col space-y-3">
                 <Button asChild variant="secondary" className="w-full">
                    <Link to="/login">Masuk</Link>
                </Button>
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 w-full">
                    <Link to="/register">Daftar</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
