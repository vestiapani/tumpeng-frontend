import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Loader2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cateringService } from "../../services/cateringService";

export default function ReviewModal() {
  const {
    isReviewOpen,
    setIsReviewOpen,
    lastOrder,
    user,
    addReviewLocal,
    showToast,
  } = useApp();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast("Tuliskan sedikit ulasan Anda terlebih dahulu.", "error");
      return;
    }

    try {
      setSubmitting(true);
      const saved = await cateringService.submitReview({
        order_id: lastOrder?.order_id || null,
        customer_name:
          lastOrder?.customer_name || user?.fullName || "Pelanggan",
        event_moment: user?.eventMoment || "Syukuran & Catering",
        rating,
        comment: comment.trim(),
      });

      addReviewLocal(saved);
      setComment("");
      setRating(5);
      setIsReviewOpen(false);
      showToast("Terima kasih! Ulasan Anda sudah tampil di halaman utama.");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsReviewOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setIsReviewOpen(false)}
              className="absolute top-5 right-5 rounded-full p-1.5 text-[#666E68] hover:bg-[#F2EFE7]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[10px] font-bold tracking-[0.16em] text-[#8D7B5A] uppercase">
              Ulasan Pesanan {lastOrder?.order_id}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#1F2421]">
              Bagaimana Rasa & Layanan Kami?
            </h3>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-[#D6D0C4]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2421]">
                  Ceritakan Pengalaman Anda
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Misal: Nasi kuningnya gurih, pengiriman tepat waktu, dan kemasannya rapi..."
                  className="mt-1.5 w-full rounded-xl border border-[#E5E0D5] bg-[#F9F7F2] px-3.5 py-2.5 text-sm outline-none focus:border-[#24332A]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#24332A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1A251E] disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>Kirim Ulasan</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
