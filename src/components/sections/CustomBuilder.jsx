import { useState, useMemo } from "react";
import { ShoppingCart, Triangle, Package, Check, Flame } from "lucide-react";
import { useApp } from "../../context/AppContext";
import {
  CUSTOM_FORMATS,
  CUSTOM_SIDE_DISHES,
  SPICE_LEVELS,
} from "../../data/mockData";
import { formatRupiah } from "../../utils/formatRupiah";
import CustomSelect from "../ui/CustomSelect";

export default function CustomBuilder() {
  const { addToCart, showToast } = useApp();

  const [formatId, setFormatId] = useState("tumpeng");
  const [portions, setPortions] = useState(10);
  const [selectedDishes, setSelectedDishes] = useState([
    "ayam-bakar",
    "kentang-ati",
    "perkedel",
    "telur-balado",
  ]);
  const [spiceLevel, setSpiceLevel] = useState("Sedang");
  const [topperText, setTopperText] = useState("");

  const activeFormat = useMemo(
    () => CUSTOM_FORMATS.find((f) => f.id === formatId) || CUSTOM_FORMATS[0],
    [formatId],
  );

  const chosenDishObjects = useMemo(
    () => CUSTOM_SIDE_DISHES.filter((d) => selectedDishes.includes(d.id)),
    [selectedDishes],
  );

  const spiceOptions = useMemo(
    () =>
      SPICE_LEVELS.map((s) => ({
        value: s.value,
        label: s.label,
        description: s.description,
        meta: (
          <span className="inline-flex items-center gap-0.5">
            {s.level === 0 ? (
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ) : (
              Array.from({ length: s.level }).map((_, idx) => (
                <Flame
                  key={idx}
                  className={`h-3.5 w-3.5 ${
                    s.level === 2 ? "text-rose-500" : "text-amber-500"
                  }`}
                />
              ))
            )}
          </span>
        ),
      })),
    [],
  );

  const pricePerPortion = useMemo(() => {
    const sidesSum = chosenDishObjects.reduce(
      (sum, item) => sum + item.price,
      0,
    );
    return activeFormat.basePricePerPortion + sidesSum;
  }, [activeFormat, chosenDishObjects]);

  const totalPrice = pricePerPortion * portions;

  const toggleDish = (id) => {
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleAddCustom = () => {
    if (chosenDishObjects.length === 0) {
      showToast("Pilih minimal 1 lauk pendamping terlebih dahulu.", "error");
      return;
    }

    const laukNames = chosenDishObjects.map((d) => d.name).join(", ");
    const topperTrimmed = topperText.trim();
    const topperPart = topperTrimmed ? ` • Topper: "${topperTrimmed}"` : "";
    const customSummary = `Lauk: ${laukNames} • Sambal: ${spiceLevel}${topperPart}`;
    const customTitle = `${activeFormat.shortLabel} (${portions} Porsi)`;

    addToCart({
      id: `custom-${formatId}-${portions}-${[...selectedDishes].sort().join("_")}-${spiceLevel}-${topperTrimmed}`,
      name: customTitle,
      portions,
      portionsLabel: `${portions} Porsi`,
      price: totalPrice,
      isCustom: true,
      customSummary,
      customMeta: {
        format: activeFormat.label,
        dishes: chosenDishObjects.map((d) => d.name),
        spiceLevel,
        topper: topperTrimmed,
      },
    });
  };

  return (
    <section
      id="custom-tumpeng"
      className="bg-[#24332A] py-14 text-white sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header khusus Mobile */}
        <div className="mb-6 lg:hidden">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white/85 uppercase">
            Racik Sajian Mandiri
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight font-bold">
            Rancang Custom Tumpeng Sesuai Selera Anda
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Sesuaikan jumlah porsi dengan tamu undangan Anda, pilih lauk
            pendamping favorit keluarga, atur tingkat kepedasan sambal, dan
            tambahkan ucapan spesial di atas tumpeng.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-12 lg:gap-10">
          {/* Kolom Kiri (Desktop) / Bawah (Mobile): Heading + Kartu Ringkasan */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="hidden lg:block">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white/85 uppercase">
                Racik Sajian Mandiri
              </span>
              <h2 className="mt-3 font-serif text-4xl leading-tight font-bold">
                Rancang Custom Tumpeng Sesuai Selera Anda
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Sesuaikan jumlah porsi dengan tamu undangan Anda, pilih lauk
                pendamping favorit keluarga, atur tingkat kepedasan sambal, dan
                tambahkan ucapan spesial di atas tumpeng.
              </p>
            </div>

            {/* Kartu Ringkasan Pesanan Custom */}
            <div className="rounded-2xl bg-white p-5 text-[#1F2421] shadow-xl sm:p-6 lg:mt-7">
              <div className="flex items-start justify-between gap-3 border-b border-[#EFECE4] pb-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#9A7B4F] uppercase">
                    Ringkasan Pesanan Custom
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-[#1F2421]">
                    {activeFormat.shortLabel} ({portions} Porsi)
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-[#EBF3EE] px-3 py-1 text-[11px] font-semibold text-[#1F2421]">
                  {spiceLevel}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#666E68] uppercase">
                  Lauk Pendamping Terpilih:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {chosenDishObjects.length > 0 ? (
                    chosenDishObjects.map((dish) => (
                      <span
                        key={dish.id}
                        className="rounded-lg bg-[#F3EFE6] px-2.5 py-1 text-xs font-medium text-[#1F2421]"
                      >
                        {dish.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs italic text-[#666E68]">
                      Belum ada lauk dipilih
                    </span>
                  )}
                </div>
              </div>

              {topperText.trim() && (
                <div className="mt-4 rounded-xl bg-[#F3EFE6] px-3.5 py-2.5 text-xs text-[#4E5650]">
                  <strong className="text-[#1F2421]">
                    Ucapan Topper Tumpeng:
                  </strong>{" "}
                  "{topperText.trim()}"
                </div>
              )}

              <div className="mt-5 flex items-end justify-between border-t border-[#EFECE4] pt-4">
                <div>
                  <p className="text-xs text-[#666E68]">Total Harga Custom</p>
                  <p className="font-serif text-2xl font-bold text-[#1F2421]">
                    {formatRupiah(totalPrice)}
                  </p>
                </div>
                <p className="text-xs font-medium text-[#666E68]">
                  {formatRupiah(pricePerPortion)} / porsi
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCustom}
                className="mt-5 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#24332A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1A251E] active:scale-[0.99]"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Masukkan Custom Tumpeng ke Keranjang</span>
              </button>
            </div>
          </div>

          {/* Kolom Kanan (Desktop) / Atas (Mobile): Panel Konfigurator */}
          <div className="order-1 rounded-3xl bg-white p-5 text-[#1F2421] shadow-xl sm:p-7 lg:order-2 lg:col-span-7">
            {/* Step 1 */}
            <div>
              <h3 className="font-serif text-base font-bold text-[#1F2421]">
                1. Pilih Bentuk Sajian
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {CUSTOM_FORMATS.map((fmt) => {
                  const isSelected = fmt.id === formatId;
                  const Icon = fmt.id === "tumpeng" ? Triangle : Package;
                  return (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setFormatId(fmt.id)}
                      className={`min-h-[76px] rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-[#24332A] bg-[#F4F2EC] ring-1 ring-[#24332A]"
                          : "border-[#EAE5DC] bg-[#FAF9F6] hover:border-[#C5BEB0]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-[#1F2421]">
                          {fmt.label}
                        </p>
                        <Icon className="h-4 w-4 shrink-0 fill-[#9A815E] text-[#9A815E]" />
                      </div>
                      <p className="mt-1 text-xs leading-snug text-[#666E68]">
                        {fmt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#1F2421]">
                  2. Atur Jumlah Porsi
                </h3>
                <span className="rounded-full bg-[#24332A] px-3 py-1 text-xs font-bold text-white">
                  {portions} Porsi
                </span>
              </div>

              <div className="mt-3">
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={portions}
                  onChange={(e) => setPortions(Number(e.target.value))}
                  className="tumpeng-slider w-full"
                />
                <div className="mt-2 flex justify-between text-[11px] font-medium text-[#666E68]">
                  <span>5 Porsi</span>
                  <span>15 Porsi</span>
                  <span>30 Porsi</span>
                  <span>50 Porsi</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-base font-bold text-[#1F2421]">
                  3. Pilih Lauk Pendamping
                </h3>
                <span className="text-xs text-[#666E68]">
                  Sudah termasuk Nasi & Lalapan
                </span>
              </div>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {CUSTOM_SIDE_DISHES.map((dish) => {
                  const checked = selectedDishes.includes(dish.id);
                  return (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => toggleDish(dish.id)}
                      className={`flex min-h-[48px] items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-left transition active:scale-[0.99] ${
                        checked
                          ? "border-[#24332A]/40 bg-[#F9F7F2]"
                          : "border-[#ECE7DD] bg-white hover:border-[#C5BEB0]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                            checked
                              ? "border-[#24332A] bg-[#24332A] text-white"
                              : "border-[#C5BEB0] bg-white"
                          }`}
                        >
                          {checked && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <span className="text-xs font-semibold text-[#1F2421]">
                          {dish.name}
                        </span>
                      </div>
                      <span className="shrink-0 text-[11px] font-medium text-[#9A7B4F]">
                        {dish.priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Select Sambal & Input Topper */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <CustomSelect
                label="Tingkat Kepedasan Sambal"
                value={spiceLevel}
                onChange={setSpiceLevel}
                options={spiceOptions}
              />

              <div>
                <label className="block text-xs font-semibold text-[#1F2421]">
                  Ucapan Topper Tumpeng (Opsional)
                </label>
                <input
                  type="text"
                  value={topperText}
                  onChange={(e) => setTopperText(e.target.value)}
                  placeholder="Contoh: Selamat Ulang Tahun Ibu"
                  className="mt-1.5 min-h-[46px] w-full rounded-xl border border-[#E5E0D5] bg-[#F9F7F2] px-3.5 py-2.5 text-base text-[#1F2421] placeholder:text-[#969D98] outline-none focus:border-[#24332A] focus:bg-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
