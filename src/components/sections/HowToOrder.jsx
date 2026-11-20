import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Pilih Paket atau Custom Tumpeng",
    desc: "Pilih paket menu siap saji di katalog atau racik kombinasi lauk tumpeng Anda sendiri dan kunci tanggal acara.",
  },
  {
    number: "02",
    title: "Verifikasi Akun & Kirim Notif WA",
    desc: "Verifikasi nomor WhatsApp Anda, pilih skema DP 50% atau Lunas, dan pesanan otomatis terhubung ke WA Ibu Sri Rahayu.",
  },
  {
    number: "03",
    title: "Sajian Dimasak Segar & Tiba Tepat Waktu",
    desc: "Hidangan diolah segar di hari-H dan dikirimkan oleh kurir khusus catering kami sesuai jam acara Anda.",
  },
];

export default function HowToOrder() {
  return (
    <section
      id="cara-pesan"
      className="border-y border-[#E5E0D5] bg-[#F2EFE7] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#8D7B5A] uppercase">
            3 Langkah Mudah
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#1F2421] sm:text-4xl">
            Cara Memesan di Dapur Ibu Sri Rahayu
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.08,
                ease: "easeOut",
              }}
              className="rounded-2xl border border-[#E5E0D5] bg-[#F9F7F2] p-6"
            >
              <span className="font-serif text-3xl font-bold text-[#8D7B5A]/70">
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-bold text-[#1F2421]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5A625C]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
