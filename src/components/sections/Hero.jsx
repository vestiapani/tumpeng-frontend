import { motion } from "framer-motion";
import { Award, ArrowRight, SlidersHorizontal } from "lucide-react";
import { formatRupiah } from "../../utils/formatRupiah";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden py-10 sm:py-14 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFECE3] px-3.5 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#7D6B4E] uppercase">
            <Award className="h-3.5 w-3.5 shrink-0" />
            <span>Melayani Sejak 2015 • 100% Halal & Segar</span>
          </span>

          <h1 className="mt-5 font-serif text-[36px] leading-[1.1] font-bold text-[#1F2421] sm:text-5xl lg:text-[56px]">
            Cita Rasa Tumpeng Warisan untuk Setiap Syukuran.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#5A625C] sm:text-[15px]">
            Diracik langsung dengan rempah pilihan oleh{" "}
            <strong className="font-semibold text-[#1F2421]">
              Ibu Sri Rahayu
            </strong>
            . Pesan nasi tumpeng dan nasi kotak catering secara praktis—atur
            kombinasi lauk sendiri, cek kapasitas dapur secara langsung, dan
            terhubung otomatis ke WhatsApp kami.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#katalog"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#24332A] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1A251E]"
            >
              <span>Lihat Katalog Paket</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#custom-tumpeng"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#24332A]/70 bg-transparent px-6 py-3 text-sm font-semibold text-[#1F2421] transition hover:-translate-y-0.5 hover:border-[#24332A] hover:bg-white"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Rancang Custom Tumpeng</span>
            </a>
          </div>

          <div className="mt-9 grid max-w-md grid-cols-3 gap-4">
            <div>
              <p className="font-serif text-xl font-bold text-[#1F2421] sm:text-2xl">
                100%
              </p>
              <p className="mt-0.5 text-[11px] text-[#666E68] sm:text-xs">
                Bahan Halal & Segar
              </p>
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-[#1F2421] sm:text-2xl">
                2.500+
              </p>
              <p className="mt-0.5 text-[11px] text-[#666E68] sm:text-xs">
                Acara Terlayani
              </p>
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-[#1F2421] sm:text-2xl">
                4.9/5
              </p>
              <p className="mt-0.5 text-[11px] text-[#666E68] sm:text-xs">
                Rating Pelanggan
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          {/* White outer frame sesuai desain */}
          <div className="relative overflow-hidden rounded-[26px] bg-white p-1.5 shadow-xl ring-1 ring-black/5">
            <div className="relative overflow-hidden rounded-[20px]">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85"
                alt="Tumpeng Kuning Komplit 10 Porsi"
                className="h-[300px] w-full object-cover sm:h-[400px]"
              />

              <div className="absolute right-3.5 bottom-3.5 left-3.5 rounded-2xl bg-[#F9F7F2]/95 px-4 py-3.5 shadow-lg backdrop-blur-sm sm:px-5 sm:py-4">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-[#8D7B5A] uppercase">
                      Menu Andalan Dapur
                    </p>
                    <p className="mt-0.5 truncate font-serif text-sm font-bold text-[#1F2421] sm:text-lg">
                      Tumpeng Kuning Komplit 10 Porsi
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] text-[#666E68] sm:text-[11px]">
                      Harga Paket
                    </p>
                    <p className="font-serif text-sm font-bold text-[#24332A] sm:text-lg">
                      {formatRupiah(325000)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
