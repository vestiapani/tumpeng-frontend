import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { MENU_CATEGORIES } from "../../data/mockData";
import { formatRupiah } from "../../utils/formatRupiah";
import SkeletonCard from "../ui/SkeletonCard";

export default function MenuCatalog() {
  const { menus, menusLoading, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredMenus =
    activeCategory === "Semua"
      ? menus
      : menus.filter((item) => item.category === activeCategory);

  return (
    <section id="katalog" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#8D7B5A] uppercase">
            Sajian Pilihan
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#1F2421] sm:text-4xl">
            Katalog Paket Tumpeng & Catering
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#666E68]">
            Pilih paket menu siap pesan yang telah kami kurasi untuk acara
            keluarga, wisuda, pengajian, maupun rapat kantor.
          </p>
        </div>

        {/* Filter Kategori: Horizontal Swipe di Mobile, Center di Desktop */}
        <div className="no-scrollbar -mx-4 mt-7 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-[38px] shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#24332A] text-white shadow-sm"
                    : "border border-[#E5E0D5] bg-white text-[#4E5650] hover:border-[#24332A] hover:text-[#1F2421]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid Katalog */}
        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {menusLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : filteredMenus.map((menu, index) => (
                <motion.article
                  key={menu.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.32,
                    delay: (index % 3) * 0.05,
                    ease: "easeOut",
                  }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E0D5] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden bg-[#ECE8DF]">
                    <img
                      src={menu.image_url}
                      alt={menu.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {menu.badge && (
                      <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1F2421] shadow-sm">
                        {menu.badge}
                      </span>
                    )}
                    <span className="absolute right-3 bottom-3 rounded-full bg-[#1F2421]/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {menu.portionsLabel}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-bold text-[#1F2421]">
                      {menu.name}
                    </h3>

                    <ul className="mt-3 flex-1 space-y-1.5 text-xs text-[#5A625C]">
                      {menu.items.map((lauk) => (
                        <li key={lauk} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#158059]" />
                          <span>{lauk}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#F0ECE3] pt-4">
                      <div>
                        <p className="text-[11px] text-[#666E68]">
                          Harga Paket
                        </p>
                        <p className="text-base font-bold text-[#1F2421]">
                          {formatRupiah(menu.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: menu.id,
                            name: menu.name,
                            portions: menu.portions,
                            portionsLabel: menu.portionsLabel,
                            price: menu.price,
                            isCustom: false,
                          })
                        }
                        className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#24332A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1A251E] active:scale-95"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Tambah ke Keranjang</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
        </div>
      </div>
    </section>
  );
}
