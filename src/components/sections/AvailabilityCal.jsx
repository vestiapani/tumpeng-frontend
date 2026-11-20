import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cateringService } from "../../services/cateringService";
import { formatTanggalIndo } from "../../utils/formatRupiah";

const DAY_HEADERS = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const STATUS_META = {
  available: {
    label: "Tersedia",
    dot: "bg-[#158059]",
    tile: "bg-[#FAF8F4] border-[#EBE6DC] hover:border-[#24332A] text-[#1F2421]",
  },
  limited: {
    label: "Terbatas",
    dot: "bg-amber-500",
    tile: "bg-amber-50/70 border-amber-200/80 hover:border-amber-500 text-[#1F2421]",
  },
  full: {
    label: "Penuh",
    dot: "bg-rose-400",
    tile: "bg-rose-50/80 border-rose-200/70 text-rose-400 cursor-not-allowed",
  },
};

export default function AvailabilityCal() {
  const { selectedDate, setSelectedDate, showToast } = useApp();

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth() + 1);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadSlots() {
      try {
        setLoading(true);
        const data = await cateringService.getCalendarSlots(
          viewYear,
          viewMonth,
        );
        if (active) setSlots(data);
      } catch (err) {
        if (active) showToast(err.message, "error");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadSlots();
    return () => {
      active = false;
    };
  }, [viewYear, viewMonth, showToast]);

  const firstDayOffset = new Date(viewYear, viewMonth - 1, 1).getDay();
  const selectedSlot = slots.find((s) => s.date === selectedDate);
  const selectedStatusLabel = selectedSlot
    ? STATUS_META[selectedSlot.status]?.label
    : "Tersedia";

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (slot) => {
    if (slot.status === "full") {
      showToast("Kuota dapur pada tanggal tersebut sudah penuh.", "error");
      return;
    }
    setSelectedDate(slot.date);
    showToast(`Tanggal ${formatTanggalIndo(slot.date)} disimpan ke checkout.`);
  };

  return (
    <section id="kalender" className="py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        {/* Kiri */}
        <div className="lg:col-span-5">
          <h2 className="font-serif text-3xl leading-tight font-bold text-[#1F2421] sm:text-4xl">
            Cek Ketersediaan Tanggal Acara
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A625C]">
            Kami menjaga kualitas setiap pesanan dengan membatasi kuota produksi
            harian. Pilih tanggal acara Anda pada kalender untuk memastikan slot
            pengiriman masih tersedia.
          </p>

          <ul className="mt-6 space-y-2.5 text-xs text-[#4E5650]">
            <li className="flex items-start gap-2.5">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#158059]" />
              <span>
                <strong className="text-[#1F2421]">Tersedia:</strong> Slot dapur
                masih terbuka luas (Min. pemesanan H-2).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                <strong className="text-[#1F2421]">Terbatas:</strong> Tersisa
                1–2 slot pengiriman saja di hari tersebut.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-400" />
              <span>
                <strong className="text-[#1F2421]">Penuh:</strong> Kuota
                produksi harian sudah terisi penuh.
              </span>
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E5E0D5] bg-[#F2EFE7] p-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#1F2421]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#158059]" />
                <span>
                  {formatTanggalIndo(selectedDate)} ({selectedStatusLabel})
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-[#666E68]">
                Tanggal otomatis tersimpan ke formulir checkout Anda.
              </p>
            </div>
            <a
              href="#katalog"
              className="inline-flex min-h-[38px] items-center rounded-full bg-[#24332A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1A251E]"
            >
              Pilih Paket
            </a>
          </div>
        </div>

        {/* Kanan: Kalender */}
        <div className="rounded-3xl border border-[#E5E0D5] bg-white p-4 shadow-sm sm:p-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#1F2421]">
              {MONTH_NAMES[viewMonth - 1]} {viewYear}
            </h3>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Bulan sebelumnya"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D5] text-[#1F2421] transition hover:bg-[#F2EFE7]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Bulan berikutnya"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D5] text-[#1F2421] transition hover:bg-[#F2EFE7]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-bold tracking-wider text-[#8D7B5A] sm:gap-2 sm:text-[11px]">
            {DAY_HEADERS.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {loading
              ? Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="skeleton-shimmer h-12 rounded-xl sm:h-14"
                  />
                ))
              : slots.map((slot) => {
                  const meta =
                    STATUS_META[slot.status] || STATUS_META.available;
                  const isSelected = slot.date === selectedDate;
                  return (
                    <button
                      key={slot.date}
                      type="button"
                      disabled={slot.status === "full"}
                      onClick={() => handleSelectDate(slot)}
                      title={`${formatTanggalIndo(slot.date)} — ${meta.label}`}
                      className={`flex min-h-[46px] flex-col items-center justify-center rounded-xl border py-2 text-center transition sm:min-h-[56px] sm:py-2.5 ${
                        isSelected
                          ? "border-[#24332A] bg-[#24332A] text-white shadow-sm"
                          : meta.tile
                      }`}
                    >
                      <span className="flex items-center gap-1 text-xs font-bold sm:text-sm">
                        {slot.day}
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? "bg-emerald-300" : meta.dot
                          }`}
                        />
                      </span>
                      <span
                        className={`mt-0.5 hidden text-[10px] font-medium sm:block ${
                          isSelected ? "text-white/80" : "opacity-75"
                        }`}
                      >
                        {meta.label}
                      </span>
                    </button>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}
