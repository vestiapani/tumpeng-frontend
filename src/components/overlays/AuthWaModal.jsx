import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cateringService } from "../../services/cateringService";
import {
  generateVerifyCode,
  buildWaVerifyUrl,
} from "../../utils/whatsappHelper";

export default function AuthWaModal() {
  const { isAuthOpen, setIsAuthOpen, setUser, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [eventMoment, setEventMoment] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const resetAndClose = () => {
    setIsAuthOpen(false);
    setErrorMsg("");
    setTimeout(() => setStep(1), 200);
  };

  const handleStepOne = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setErrorMsg("Nama lengkap dan nomor WhatsApp aktif wajib diisi.");
      setShakeKey((k) => k + 1);
      return;
    }
    setErrorMsg("");
    setVerifyCode(generateVerifyCode());
    setStep(2);
  };

  const handleConfirmVerified = async () => {
    try {
      setSubmitting(true);
      await cateringService.verifyCustomer({
        full_name: fullName.trim(),
        whatsapp: whatsapp.trim(),
        event_moment: eventMoment.trim(),
        verify_code: verifyCode,
      });

      setUser({
        fullName: fullName.trim(),
        whatsapp: whatsapp.trim(),
        eventMoment: eventMoment.trim() || "Syukuran",
        verifyCode,
        verified: true,
      });

      showToast(`Akun WhatsApp ${fullName.trim()} berhasil terverifikasi!`);
      resetAndClose();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          <motion.div
            key={shakeKey}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={
              errorMsg
                ? { opacity: 1, scale: 1, y: 0, x: [0, -8, 8, -5, 5, 0] }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Tutup modal"
              className="absolute top-5 right-5 rounded-full p-1.5 text-[#666E68] transition hover:bg-[#F2EFE7] hover:text-[#1F2421]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[10px] font-bold tracking-[0.16em] text-[#8D7B5A] uppercase">
              Verifikasi Akun Pelanggan
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-[#1F2421]">
              Masuk / Daftar via WhatsApp
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#666E68]">
              Pastikan nomor WhatsApp Anda aktif agar riwayat pesanan dan
              konfirmasi jadwal terhubung langsung.
            </p>

            {step === 1 ? (
              <form onSubmit={handleStepOne} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F2421]">
                    Nama Lengkap Anda *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Arya Pratama"
                    className="mt-1.5 w-full rounded-xl border border-[#E5E0D5] px-3.5 py-2.5 text-sm text-[#1F2421] outline-none focus:border-[#24332A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F2421]">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="mt-1.5 w-full rounded-xl border border-[#E5E0D5] px-3.5 py-2.5 text-sm text-[#1F2421] outline-none focus:border-[#24332A]"
                  />
                  <p className="mt-1 text-[11px] text-[#666E68]">
                    Gunakan nomor WhatsApp pribadi yang dapat dihubungi kurir.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F2421]">
                    Momen Acara Anda (Opsional)
                  </label>
                  <input
                    type="text"
                    value={eventMoment}
                    onChange={(e) => setEventMoment(e.target.value)}
                    placeholder="Misal: Wisuda & Syukuran, Ulang Tahun"
                    className="mt-1.5 w-full rounded-xl border border-[#E5E0D5] px-3.5 py-2.5 text-sm text-[#1F2421] outline-none focus:border-[#24332A]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-medium text-rose-600">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#24332A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1A251E]"
                >
                  <span>Lanjut ke Verifikasi WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-[#E5E0D5] bg-[#F9F7F2] p-4 text-center">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#8D7B5A] uppercase">
                    Kode Verifikasi Unik Anda
                  </p>
                  <div className="mt-2 rounded-xl border border-[#E5E0D5] bg-white py-3 font-mono text-lg font-bold tracking-[0.16em] text-[#1F2421]">
                    {verifyCode}
                  </div>
                  <p className="mt-2.5 text-[11px] leading-relaxed text-[#666E68]">
                    Kirimkan kode di atas ke WhatsApp{" "}
                    <strong className="text-[#1F2421]">Ibu Sri Rahayu</strong>{" "}
                    dengan menekan tombol hijau di bawah ini untuk membuktikan
                    nomor Anda aktif.
                  </p>
                </div>

                <a
                  href={buildWaVerifyUrl({
                    fullName: fullName.trim(),
                    whatsapp: whatsapp.trim(),
                    verifyCode,
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#158059] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#106948]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Kirim Kode Verifikasi ke WA Ibu Sri Rahayu</span>
                </a>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleConfirmVerified}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#24332A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1A251E] disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  <span>Saya Sudah Mengirim Pesan WA (Konfirmasi)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs font-medium text-[#666E68] underline underline-offset-4 hover:text-[#1F2421]"
                >
                  Ubah Nama atau Nomor WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
