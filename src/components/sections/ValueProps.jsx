import {
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  MessageCircle,
} from "lucide-react";

const PROPS = [
  {
    icon: ShieldCheck,
    title: "100% Bahan Halal & Segar",
    desc: "Dimasak di hari pengiriman tanpa bahan pengawet.",
  },
  {
    icon: Sparkles,
    title: "Racikan Rempah Warisan",
    desc: "Resep turun-temurun khas Ibu Sri Rahayu sejak 2015.",
  },
  {
    icon: CalendarCheck,
    title: "Kuota Dapur Real-Time",
    desc: "Cek slot tanggal kosong agar jadwal acara tidak bentrok.",
  },
  {
    icon: MessageCircle,
    title: "Konfirmasi Cepat via WA",
    desc: "Rincian pesanan & skema DP langsung terkirim otomatis.",
  },
];

export default function ValueProps() {
  return (
    <section className="border-y border-[#E5E0D5] bg-[#F2EFE7] py-8">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {PROPS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#24332A] ring-1 ring-[#E5E0D5]">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1F2421]">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-[#666E68]">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
