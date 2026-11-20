import { MapPin, Clock, CalendarCheck, Truck } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from "../ui/Icons";

export default function Footer() {
  const adminWa = import.meta.env.VITE_ADMIN_WA || "6281234567890";

  return (
    <footer className="bg-[#24332A] pb-24 text-white lg:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-serif text-sm font-bold text-[#24332A]">
                SR
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">
                  Dapur Tumpeng Ibu Sri Rahayu
                </h3>
                <p className="text-[10px] tracking-[0.14em] text-white/65 uppercase">
                  Catering & Nasi Tumpeng Autentik
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Menghadirkan kehangatan hidangan Nusantara sejak tahun 2015.
              Setiap tumpeng dan nasi kotak diracik dengan resep keluarga, bahan
              segar harian, dan ketulusan untuk menyempurnakan momen syukuran
              Anda.
            </p>
          </div>

          {/* Informasi & Layanan */}
          <div className="space-y-3 text-sm text-white/80">
            <h4 className="font-serif text-base font-semibold text-white">
              Informasi & Layanan
            </h4>
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B49B74]" />
              <span>
                Jl. Melati Raya No. 24, Srengseng, Jakarta Barat (Tersedia di
                Google Maps)
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-[#B49B74]" />
              <span>Buka Setiap Hari: 06.00 – 20.00 WIB</span>
            </p>
            <p className="flex items-center gap-2.5">
              <CalendarCheck className="h-4 w-4 shrink-0 text-[#B49B74]" />
              <span>Pemesanan Tumpeng & Catering minimal H-2 acara</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Truck className="h-4 w-4 shrink-0 text-[#B49B74]" />
              <span>Pengiriman Kurir Khusus Catering atau Ambil di Lokasi</span>
            </p>
          </div>

          {/* Hubungi & Ikuti Kami */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white">
              Hubungi & Ikuti Kami
            </h4>
            <p className="mt-2 text-sm text-white/75">
              Konsultasi menu acara atau konfirmasi pembayaran langsung
              terhubung dengan WhatsApp resmi Ibu Sri Rahayu.
            </p>
            <a
              href={`https://wa.me/${adminWa}?text=${encodeURIComponent(
                "Halo Dapur Ibu Sri Rahayu, saya ingin konsultasi pesanan catering.",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#A58E6C] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#B59E7C]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span>0812-3456-7890 (Ibu Sri Rahayu)</span>
            </a>

            <div className="mt-4 flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${adminWa}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>
            © 2026 Dapur Tumpeng Ibu Sri Rahayu. Seluruh Hak Cipta Dilindungi.
          </p>
          <p>100% Halal • Dimasak Segar Sesuai Pesanan</p>
        </div>
      </div>
    </footer>
  );
}
