import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const navLinks = [
  { href: "#tentang", label: "Tentang" },
  { href: "#alur", label: "Alur Pengaduan" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <TooltipProvider>
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="text-2xl font-bold flex items-center gap-3 hover:text-yellow-400 transition-colors"
            >
              <img
                src="/assets/image.png"
                alt="Logo El Ngadu"
                className="h-10 w-10 rounded-lg"
              />
              {/* PERBAIKAN: Kelas 'hidden' dan 'sm:inline' dihapus */}
              <span>El Ngadu</span>
            </Link>

            {/* Navlinks untuk Tablet dan Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {/* Tombol Teks untuk Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                <Button
                  asChild
                  size="lg"
                  className="text-white bg-gray-700 hover:bg-gray-800 transition-all duration-200 font-semibold px-6"
                >
                  <Link to="/login">Masuk</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-6 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Link to="/register">Daftar</Link>
                </Button>
              </div>

              {/* Tombol Ikon untuk Tablet */}
              <div className="hidden md:flex lg:hidden items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link to="/login">
                        <LogIn className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Masuk</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link to="/register">
                        <UserPlus className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daftar</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Tombol Menu untuk Mobile */}
              <div className="md:hidden">
                <Button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-slate-700">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium py-2 px-2 rounded-md hover:bg-slate-700"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="border-t border-slate-600 pt-6 flex flex-col space-y-3">
                    <Button
                      asChild
                      size="lg"
                      className="w-full text-white bg-gray-700 hover:bg-gray-800 transition-all duration-200 font-semibold"
                    >
                      <Link to="/login">Masuk</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 w-full font-semibold transition-all duration-200 shadow-lg"
                    >
                      <Link to="/register">Daftar</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </TooltipProvider>
  );
}
