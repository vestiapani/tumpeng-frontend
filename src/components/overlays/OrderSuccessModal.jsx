import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, Copy } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatRupiah } from "../../utils/formatRupiah";
import { buildWaOrderUrl } from "../../utils/whatsappHelper";

export default function OrderSuccessModal() {
  const { successOrder, setSuccessOrder, setIsCartOpen, showToast } = useApp();

  const handleCopyRekening = () => {
    navigator.clipboard?.writeText("1234567890");
    showToast("Nomor rekening BCA disalin.");
  };

  const handleViewStatus = () => {
    setSuccessOrder(null);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {successOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSuccessOrder(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-7"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#24332A] text-white">
              <Check className="h-6 w-6 stroke-[2.5]" />
            </div>

            <p className="mt-4 text-[10px] font-bold tracking-[0.16em] text-[#8D7B5A] uppercase">
              Pesanan Berhasil Dibuat
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#1F2421]">
              Terima Kasih, {successOrder.customer_name}!
            </h3>
            <p className="mt-1 font-mono text-xs text-[#666E68]">
              Order ID: {successOrder.order_id}
            </p>

            {/* Ringkasan Struk */}
            <div className="mt-5 space-y-2 rounded-2xl border border-[#E5E0D5] bg-[#F9F7F2] p-4 text-left text-xs text-[#434A45]">
              <p>
                <strong className="text-[#1F2421]">Menu:</strong>{" "}
                {successOrder.items
                  .map(
                    (i) =>
                      `${i.name} (x${i.qty})${
                        i.customSummary ? ` [${i.customSummary}]` : ""
                      }`,
                  )
                  .join(", ")}
              </p>
              <p>
                <strong className="text-[#1F2421]">Jadwal Acara:</strong>{" "}
                {successOrder.event_date} pukul {successOrder.delivery_time} WIB
              </p>
              <p>
                <strong className="text-[#1F2421]">Metode:</strong>{" "}
                {successOrder.delivery_method} ({successOrder.address})
              </p>
              <p>
                <strong className="text-[#1F2421]">Total Pesanan:</strong>{" "}
                {formatRupiah(successOrder.total_price)}
              </p>
              <p className="font-semibold text-[#158059]">
                Status Pembayaran:{" "}
                {successOrder.payment_scheme === "DP_50"
                  ? `DP 50% (${formatRupiah(successOrder.payable_now)})`
                  : `Lunas 100% (${formatRupiah(successOrder.total_price)})`}
              </p>
            </div>

            {/* Info Rekening */}
            <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl border border-[#E5E0D5] bg-[#F2EFE7]/70 px-4 py-3 text-left">
              <div>
                <p className="text-[11px] text-[#666E68]">
                  Rekening Transfer Dapur Ibu Sri Rahayu:
                </p>
                <p className="text-xs font-bold text-[#1F2421]">
                  Bank BCA 123-456-7890 a.n. Sri Rahayu
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyRekening}
                title="Salin nomor rekening"
                className="rounded-lg p-1.5 text-[#666E68] transition hover:bg-white hover:text-[#1F2421]"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-5 space-y-2.5">
              <a
                href={buildWaOrderUrl(successOrder)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#158059] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#106948]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Kirim Notifikasi Pesanan ke WA Ibu Sri Rahayu</span>
              </a>

              <button
                type="button"
                onClick={handleViewStatus}
                className="w-full rounded-full border border-[#E5E0D5] bg-[#F9F7F2] px-5 py-2.5 text-xs font-semibold text-[#1F2421] transition hover:bg-[#ECE8DF]"
              >
                Lihat Status Pesanan di Keranjang
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
