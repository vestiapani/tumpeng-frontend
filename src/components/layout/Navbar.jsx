import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag, LogOut, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { WhatsAppIcon } from "../ui/Icons";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Katalog Paket", href: "#katalog" },
  { label: "Rancang Custom Tumpeng", href: "#custom-tumpeng" },
  { label: "Cek Kalender Dapur", href: "#kalender" },
  { label: "Cara Memesan", href: "#cara-pesan" },
  { label: "Ulasan Pelanggan", href: "#ulasan" },
];

export default function Navbar() {
  const { user, logoutUser, cartCount, setIsCartOpen, setIsAuthOpen } =
    useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E5E0D5]/80 bg-[#F9F7F2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
          {/* Kiri: Menu + Logo */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka navigasi"
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-white px-2.5 text-xs font-semibold text-[#1F2421] transition hover:border-[#24332A] sm:px-3.5"
            >
              <Menu className="h-4 w-4" />
              <span className="hidden sm:inline">Menu</span>
            </button>

            <a href="#beranda" className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#24332A] font-serif text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
                SR
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate font-serif text-sm font-bold text-[#1F2421] sm:text-[15px]">
                  Ibu Sri Rahayu
                </p>
                <p className="hidden truncate text-[9px] font-medium tracking-[0.14em] text-[#666E68] uppercase min-[400px]:block sm:text-[10px]">
                  Dapur Tumpeng & Catering
                </p>
              </div>
            </a>
          </div>

          {/* Tengah: Sapaan + Dot Gold */}
          <div className="hidden items-center gap-2 text-xs lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A6895B]" />
            {user ? (
              <span className="font-serif font-semibold text-[#1F2421]">
                Halo, Selamat Datang {user.fullName}!{" "}
                <span className="font-sans font-normal text-[#666E68]">
                  — Selamat {user.eventMoment || "Syukuran"}!
                </span>
              </span>
            ) : (
              <span className="font-serif font-semibold text-[#1F2421]">
                Halo, Selamat Datang Tamu!
              </span>
            )}
          </div>

          {/* Kanan: Auth WA + Keranjang */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {user ? (
              <div className="flex items-center gap-1">
                <div className="inline-flex h-9 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 text-xs font-semibold text-[#158059] ring-1 ring-emerald-200 sm:px-3">
                  <span className="h-2 w-2 rounded-full bg-[#158059]" />
                  <span className="max-w-[72px] truncate sm:max-w-[100px]">
                    {user.fullName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logoutUser}
                  title="Keluar akun"
                  className="rounded-full p-1.5 text-[#666E68] transition hover:bg-[#ECE8DF] hover:text-[#1F2421]"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#24332A] px-3 text-xs font-semibold whitespace-nowrap text-white transition hover:bg-[#1A251E] sm:px-4"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="sm:hidden">Masuk</span>
                <span className="hidden sm:inline">Masuk / Daftar</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Buka keranjang belanja"
              className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E0D5] bg-white text-[#24332A] transition hover:border-[#24332A] sm:h-10 sm:w-10"
            >
              <ShoppingBag className="h-4 w-4 fill-[#24332A]/15" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#9A7B4F] px-1 text-[10px] font-bold text-white"
              >
                {cartCount}
              </motion.span>
            </button>
          </div>
        </div>
      </header>

      {/* Off-Canvas Left Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col bg-[#F9F7F2] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#E5E0D5] bg-[#24332A] px-5 py-4 text-white">
                <div>
                  <p className="font-serif text-base font-bold">
                    Ibu Sri Rahayu
                  </p>
                  <p className="text-[11px] text-white/70">Navigasi Cepat</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 p-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1F2421] transition hover:bg-[#ECE8DF]"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-[#666E68]" />
                  </a>
                ))}
              </nav>

              <div className="border-t border-[#E5E0D5] p-4 text-xs text-[#666E68]">
                <p className="font-semibold text-[#1F2421]">
                  Jam Operasional Dapur
                </p>
                <p className="mt-1">Setiap hari, 05.00 – 20.00 WIB</p>
                <p className="mt-0.5">Pemesanan minimal H-2 acara.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
