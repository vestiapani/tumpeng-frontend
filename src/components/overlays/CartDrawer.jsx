import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ShoppingBasket,
  Minus,
  Plus,
  MessageCircle,
  Calendar,
  Star,
  Loader2,
  CheckCircle2,
  Truck,
  Store,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cateringService } from "../../services/cateringService";
import { formatRupiah } from "../../utils/formatRupiah";
import { buildWaOrderUrl } from "../../utils/whatsappHelper";
import CustomSelect from "../ui/CustomSelect";

const DELIVERY_OPTIONS = [
  {
    value: "Diantar Kurir Khusus Catering",
    label: "Diantar Kurir Khusus Catering",
    description: "Pengiriman aman menjaga bentuk tumpeng sampai lokasi",
    meta: <Truck className="h-3.5 w-3.5 text-[#8D7B5A]" />,
  },
  {
    value: "Ambil Sendiri di Dapur Ibu Sri Rahayu",
    label: "Ambil Sendiri di Dapur Ibu Sri Rahayu",
    description: "Jl. Melati Raya No. 18, bebas ongkos kirim",
    meta: <Store className="h-3.5 w-3.5 text-[#8D7B5A]" />,
  },
];

export default function CartDrawer() {
  const {
    user,
    cart,
    updateCartQty,
    clearCart,
    cartTotal,
    selectedDate,
    setSelectedDate,
    lastOrder,
    setLastOrder,
    isCartOpen,
    setIsCartOpen,
    setIsAuthOpen,
    setSuccessOrder,
    setIsReviewOpen,
    showToast,
  } = useApp();

  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("11:00");
  const [deliveryMethod, setDeliveryMethod] = useState(
    DELIVERY_OPTIONS[0].value,
  );
  const [address, setAddress] = useState("");
  const [paymentScheme, setPaymentScheme] = useState("DP_50");

  const [formError, setFormError] = useState("");
  const [shakeCount, setShakeCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Kunci scroll halaman utama saat drawer terbuka (UX Mobile)
  useEffect(() => {
    if (!isCartOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => {
    if (user) {
      setCustomerName((prev) => prev || user.fullName);
      setWhatsapp((prev) => prev || user.whatsapp);
    }
  }, [user]);

  const payableAmount =
    paymentScheme === "DP_50" ? Math.round(cartTotal * 0.5) : cartTotal;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (
      !customerName.trim() ||
      !whatsapp.trim() ||
      !selectedDate ||
      !deliveryTime ||
      !address.trim()
    ) {
      setFormError(
        "Lengkapi seluruh kolom bertanda bintang (*) terlebih dahulu.",
      );
      setShakeCount((c) => c + 1);
      return;
    }

    setFormError("");
    try {
      setSubmitting(true);
      const payload = {
        customer_name: customerName.trim(),
        whatsapp: whatsapp.trim(),
        event_date: selectedDate,
        delivery_time: deliveryTime,
        delivery_method: deliveryMethod,
        address: address.trim(),
        payment_scheme: paymentScheme,
        items: cart,
        total_price: cartTotal,
        payable_now: payableAmount,
      };

      const createdOrder = await cateringService.createOrder(payload);

      setLastOrder(createdOrder);
      setSuccessOrder(createdOrder);
      clearCart();
      setIsCartOpen(false);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSimulateComplete = async () => {
    if (!lastOrder) return;
    try {
      setUpdatingStatus(true);
      await cateringService.updateOrderStatus(lastOrder.order_id, "Selesai");
      setLastOrder((prev) => (prev ? { ...prev, status: "Selesai" } : prev));
      showToast("Status pesanan diperbarui menjadi Selesai.");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative z-10 flex h-dvh w-full max-w-md flex-col bg-[#F9F7F2] shadow-2xl"
          >
            {/* Header Drawer */}
            <div className="flex items-start justify-between bg-[#24332A] px-5 py-4 text-white">
              <div>
                <h2 className="font-serif text-lg font-bold">
                  Keranjang, Checkout & Status
                </h2>
                <p className="text-[11px] text-white/75">
                  Pesanan otomatis terhubung ke WhatsApp Ibu Sri Rahayu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Tutup keranjang"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] text-[#8D7B5A] uppercase">
                  Rincian Menu Pilihan
                </p>

                {cart.length === 0 ? (
                  <div className="mt-3 flex flex-col items-center justify-center rounded-2xl border border-[#E5E0D5] bg-white px-4 py-8 text-center">
                    <ShoppingBasket className="h-7 w-7 text-[#B9B2A3]" />
                    <p className="mt-2 text-xs font-medium text-[#666E68]">
                      Keranjang belanja Anda saat ini kosong.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 space-y-2.5">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-3 rounded-2xl border border-[#E5E0D5] bg-white p-3.5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#1F2421]">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#666E68]">
                            {item.customSummary || item.portionsLabel}
                          </p>
                          <p className="mt-1.5 text-sm font-bold text-[#24332A]">
                            {formatRupiah(item.price * item.qty)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-[#F9F7F2] p-1">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[#1F2421] transition hover:bg-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[18px] text-center text-xs font-bold">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#24332A] text-white transition hover:bg-[#1A251E]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <motion.form
                  key={shakeCount}
                  animate={formError ? { x: [0, -7, 7, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleCheckout}
                  className="space-y-4 border-t border-[#E5E0D5] pt-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-base font-bold text-[#1F2421]">
                      Detail Acara & Pengiriman
                    </h3>
                    {user?.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-[#158059] ring-1 ring-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        WA Terverifikasi
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAuthOpen(true)}
                        className="rounded-full bg-[#ECE8DF] px-2.5 py-1 text-[10px] font-bold text-[#24332A] hover:bg-[#E1DACD]"
                      >
                        Verifikasi WA
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1F2421]">
                        Nama Pemesan *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nama Anda"
                        className="mt-1 min-h-[42px] w-full rounded-xl border border-[#E5E0D5] bg-white px-3 py-2 text-base outline-none focus:border-[#24332A] sm:text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1F2421]">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="081234567890"
                        className="mt-1 min-h-[42px] w-full rounded-xl border border-[#E5E0D5] bg-white px-3 py-2 text-base outline-none focus:border-[#24332A] sm:text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1F2421]">
                        Tanggal Acara *
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 min-h-[42px] w-full rounded-xl border border-[#E5E0D5] bg-white px-3 py-2 text-sm outline-none focus:border-[#24332A] sm:text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1F2421]">
                        Jam Pengiriman *
                      </label>
                      <input
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="mt-1 min-h-[42px] w-full rounded-xl border border-[#E5E0D5] bg-white px-3 py-2 text-sm outline-none focus:border-[#24332A] sm:text-xs"
                      />
                    </div>
                  </div>

                  <CustomSelect
                    label="Metode Pengiriman *"
                    value={deliveryMethod}
                    onChange={setDeliveryMethod}
                    options={DELIVERY_OPTIONS}
                    size="sm"
                  />

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1F2421]">
                      Alamat Lengkap Pengiriman *
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Nama jalan, nomor rumah/gedung, patokan lokasi..."
                      className="mt-1 w-full rounded-xl border border-[#E5E0D5] bg-white px-3 py-2 text-base outline-none focus:border-[#24332A] sm:text-xs"
                    />
                  </div>

                  <div className="rounded-2xl border border-[#E5E0D5] bg-[#F2EFE7] p-3.5">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-[#8D7B5A] uppercase">
                      Skema Pembayaran
                    </p>
                    <div className="mt-2.5 space-y-2.5">
                      <label className="flex cursor-pointer items-start gap-2.5">
                        <input
                          type="radio"
                          name="paymentScheme"
                          checked={paymentScheme === "DP_50"}
                          onChange={() => setPaymentScheme("DP_50")}
                          className="mt-0.5 accent-[#24332A]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#1F2421]">
                            DP 50% (Pelanggan Baru)
                          </p>
                          <p className="text-[11px] text-[#666E68]">
                            Kunci jadwal dapur sekarang, pelunasan H-1 atau saat
                            pesanan tiba.
                          </p>
                        </div>
                      </label>

                      <label className="flex cursor-pointer items-start gap-2.5">
                        <input
                          type="radio"
                          name="paymentScheme"
                          checked={paymentScheme === "FULL_100"}
                          onChange={() => setPaymentScheme("FULL_100")}
                          className="mt-0.5 accent-[#24332A]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#1F2421]">
                            Lunas 100%
                          </p>
                          <p className="text-[11px] text-[#666E68]">
                            Pembayaran penuh langsung via Transfer Bank
                            BCA/Mandiri.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-[#E5E0D5] pt-3 text-xs">
                    <div className="flex justify-between text-[#666E68]">
                      <span>Total Harga Pesanan</span>
                      <span className="font-semibold text-[#1F2421]">
                        {formatRupiah(cartTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#1F2421]">
                      <span>
                        {paymentScheme === "DP_50"
                          ? "Nominal DP (50%)"
                          : "Nominal Lunas (100%)"}
                      </span>
                      <span className="text-[#24332A]">
                        {formatRupiah(payableAmount)}
                      </span>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-xs font-medium text-rose-600">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#24332A] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#1A251E] disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MessageCircle className="h-4 w-4" />
                    )}
                    <span>Buat Pesanan & Hubungkan ke WA Ibu Sri Rahayu</span>
                  </button>
                </motion.form>
              )}

              {cart.length === 0 && (
                <div>
                  {lastOrder ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold tracking-[0.14em] text-[#8D7B5A] uppercase">
                          Status Pesanan Terakhir
                        </p>
                        <span className="font-mono text-[11px] font-semibold text-[#666E68]">
                          {lastOrder.order_id}
                        </span>
                      </div>

                      <div className="rounded-2xl border border-[#E5E0D5] bg-white p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-[#1F2421]">
                            {lastOrder.customer_name}
                          </p>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              lastOrder.status === "Selesai"
                                ? "bg-emerald-50 text-[#158059]"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {lastOrder.status}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-[#5A625C]">
                          {lastOrder.items
                            .map(
                              (i) =>
                                `${i.name} (x${i.qty})${
                                  i.customSummary ? ` [${i.customSummary}]` : ""
                                }`,
                            )
                            .join(", ")}
                        </p>

                        <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#666E68]">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            Jadwal: {lastOrder.event_date} pukul{" "}
                            {lastOrder.delivery_time} WIB
                          </span>
                        </p>

                        <div className="mt-3 flex items-center justify-between border-t border-[#F0ECE3] pt-3 text-xs">
                          <span className="text-[#666E68]">
                            Skema:{" "}
                            <strong className="text-[#1F2421]">
                              {lastOrder.payment_scheme === "DP_50"
                                ? "DP 50%"
                                : "Lunas 100%"}
                            </strong>
                          </span>
                          <span className="font-bold text-[#1F2421]">
                            {formatRupiah(lastOrder.total_price)}
                          </span>
                        </div>

                        {lastOrder.status !== "Selesai" ? (
                          <div className="mt-4 space-y-2">
                            <a
                              href={buildWaOrderUrl(lastOrder)}
                              target="_blank"
                              rel="noreferrer"
                              className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[#158059] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#106948]"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>
                                Kirim Ulang Notif ke WA Ibu Sri Rahayu
                              </span>
                            </a>

                            <button
                              type="button"
                              disabled={updatingStatus}
                              onClick={handleSimulateComplete}
                              className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full border border-[#E5E0D5] bg-[#F9F7F2] px-4 py-2.5 text-xs font-semibold text-[#1F2421] transition hover:bg-[#ECE8DF] disabled:opacity-50"
                            >
                              {updatingStatus && (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              )}
                              <span>
                                Simulasikan Pesanan Diterima / Selesai
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div className="mt-4 flex items-center gap-2">
                            <button
                              type="button"
                              disabled={lastOrder.reviewed}
                              onClick={() => setIsReviewOpen(true)}
                              className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E5E0D5] bg-[#F9F7F2] px-4 py-2 text-xs font-semibold text-[#8D7B5A] transition hover:border-[#8D7B5A] disabled:opacity-60"
                            >
                              <Star className="h-3.5 w-3.5" />
                              <span>
                                {lastOrder.reviewed
                                  ? "Ulasan Terkirim"
                                  : "Beri Ulasan (Opsional)"}
                              </span>
                            </button>
                            <span className="rounded-full bg-[#F2EFE7] px-3.5 py-2 text-xs font-semibold text-[#1F2421]">
                              Selesai
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#E5E0D5] bg-[#F2EFE7]/70 p-4 text-center text-xs leading-relaxed text-[#666E68]">
                      Ringkasan status konfirmasi pesanan Anda akan otomatis
                      muncul di sini setelah melakukan checkout.
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
