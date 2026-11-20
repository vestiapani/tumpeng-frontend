import { formatRupiah } from "./formatRupiah";

const ADMIN_WA = import.meta.env.VITE_ADMIN_WA || "6281234567890";

export function generateVerifyCode() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `VERIF-SR${randomDigits}`;
}

export function buildWaVerifyUrl({ fullName, whatsapp, verifyCode }) {
  const text = `Halo Dapur Tumpeng Ibu Sri Rahayu, Saya ingin memverifikasi akun pelanggan saya: *Nama:* ${fullName} *No. WhatsApp:* ${whatsapp} *Kode Verifikasi:* ${verifyCode}`;
  return `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
}

export function buildWaOrderUrl(order) {
  const itemLines = order.items
    .map((item) => {
      const detail = item.customSummary ? ` (${item.customSummary})` : "";
      return `- ${item.name} (${item.portionsLabel || `${item.portions} Porsi`}) x${item.qty}${detail} — ${formatRupiah(item.price * item.qty)}`;
    })
    .join("\n");

  const paymentLabel =
    order.payment_scheme === "DP_50"
      ? `DP 50% (${formatRupiah(order.total_price * 0.5)})`
      : `Lunas 100% (${formatRupiah(order.total_price)})`;

  const text = [
    `Halo Dapur Tumpeng Ibu Sri Rahayu, saya baru saja membuat pesanan melalui website:`,
    ``,
    `*Order ID:* ${order.order_id}`,
    `*Nama Pemesan:* ${order.customer_name}`,
    `*No. WhatsApp:* ${order.whatsapp}`,
    ``,
    `*Rincian Pesanan:*`,
    itemLines,
    ``,
    `*Jadwal Acara:* ${order.event_date} pukul ${order.delivery_time} WIB`,
    `*Metode:* ${order.delivery_method}`,
    `*Alamat:* ${order.address}`,
    `*Total Pesanan:* ${formatRupiah(order.total_price)}`,
    `*Skema Pembayaran:* ${paymentLabel}`,
    ``,
    `Mohon konfirmasi ketersediaan jadwal dapur. Terima kasih!`,
  ].join("\n");

  return `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
}
