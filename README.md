# Dapur Tumpeng Ibu Sri Rahayu — Web App (Front-End)

Aplikasi pemesanan nasi tumpeng dan nasi kotak catering berbasis web dengan fitur katalog menu, peracik custom tumpeng, cek kuota dapur harian, verifikasi WhatsApp, dan checkout otomatis terhubung ke WhatsApp.

## Tech Stack

- **Core:** React + Vite
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **UI & Motion:** Framer Motion, Lucide React
- **Target Back-End:** Express.js + PostgreSQL (via REST API)

## Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Konfigurasi `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK=true
VITE_ADMIN_WA=6281234567890
```

- `VITE_USE_MOCK=true` — Menggunakan data dummy di `src/data/mockData.js` (untuk development FE tanpa server BE).
- `VITE_USE_MOCK=false` — Mengambil dan mengirim seluruh data ke REST API Express (`VITE_API_BASE_URL`).

## Struktur Folder Utama

```text
src/
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, ValueProps, MenuCatalog, CustomBuilder, AvailabilityCal, HowToOrder, Testimonials
│   ├── overlays/    # AuthWaModal, CartDrawer, OrderSuccessModal, ReviewModal
│   └── ui/          # CustomSelect, Icons, MobileCartBar, SkeletonCard, Toast
├── context/         # AppContext.jsx (state global: cart, user, selectedDate, lastOrder)
├── data/            # mockData.js (data dummy identik kontrak API)
├── services/        # api.js (Axios instance) & cateringService.js (switch Mock / Live API)
└── utils/           # formatRupiah.js & whatsappHelper.js
```

## Dokumentasi Terkait

- `API_CONTRACT.md` — Kontrak endpoint REST API & skema tabel PostgreSQL untuk tim Back-End.
- `PANDUAN_INTEGRASI.txt` — Checklist serah terima dan langkah integrasi FE ↔ BE.