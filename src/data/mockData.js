export const MENU_CATEGORIES = [
  "Semua",
  "Tumpeng Kuning Spesial",
  "Nasi Kotak Catering",
  "Paket Syukuran",
];

export const MOCK_MENUS = [
  {
    id: "menu-1",
    name: "Tumpeng Kuning Mini Keluarga",
    category: "Tumpeng Kuning Spesial",
    badge: "Favorit Keluarga",
    portions: 5,
    portionsLabel: "5 Porsi",
    price: 175000,
    image_url:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    items: [
      "Nasi Kuning Gurih",
      "Ayam Bakar Madu",
      "Tempe Orek Kering",
      "Perkedel Kentang",
      "Telur Balado & Sambal",
    ],
  },
  {
    id: "menu-2",
    name: "Tumpeng Kuning Komplit",
    category: "Tumpeng Kuning Spesial",
    badge: "Terlaris",
    portions: 10,
    portionsLabel: "10 Porsi",
    price: 325000,
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    items: [
      "Nasi Kuning Spesial",
      "Ayam Bakar Madu",
      "Sambal Goreng Kentang Ati",
      "Perkedel Kentang",
      "Telur Balado & Urap Sayur",
    ],
  },
  {
    id: "menu-3",
    name: "Tumpeng Agung Syukuran",
    category: "Paket Syukuran",
    badge: "Acara Besar",
    portions: 20,
    portionsLabel: "20 Porsi",
    price: 620000,
    image_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    items: [
      "Nasi Kuning / Uduk",
      "Empal Gepuk & Ayam Bakar",
      "Udang Balado Spesial",
      "Sambal Goreng Kentang Ati",
      "Perkedel & Hiasan Garnish",
    ],
  },
  {
    id: "menu-4",
    name: "Nasi Kotak Hemat Pengajian",
    category: "Nasi Kotak Catering",
    badge: "Ekonomis",
    portions: 15,
    portionsLabel: "Min. 15 Box (Rp15.000/box)",
    price: 225000,
    image_url:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    items: [
      "15 Box Nasi Putih",
      "Ayam Goreng Lengkuas",
      "Tempe Orek & Tahu Bacem",
      "Lalapan & Sambal Terasi",
    ],
  },
  {
    id: "menu-5",
    name: "Nasi Kotak Rapat Eksekutif",
    category: "Nasi Kotak Catering",
    badge: "Rapat Kantor",
    portions: 10,
    portionsLabel: "Min. 10 Box (Rp25.000/box)",
    price: 250000,
    image_url:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    items: [
      "10 Box Nasi Putih / Kuning",
      "Ayam Bakar Madu",
      "Sambal Goreng Kentang Ati",
      "Capcay Sayur & Kerupuk",
      "Buah Pisang & Air Mineral",
    ],
  },
  {
    id: "menu-6",
    name: "Paket Nasi Liwet Tampah",
    category: "Paket Syukuran",
    badge: "Khas Tradisional",
    portions: 12,
    portionsLabel: "12 Porsi",
    price: 360000,
    image_url:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    items: [
      "Nasi Liwet Teri Medan",
      "Ayam Bakar Utuh Potong",
      "Udang Balado & Cumi Asin",
      "Tahu Tempe Goreng",
      "Lalapan Segar & Sambal Dadak",
    ],
  },
];

export const CUSTOM_FORMATS = [
  {
    id: "tumpeng",
    label: "Tumpeng Kuning Tampah",
    shortLabel: "Tumpeng Kuning",
    desc: "Nasi kuning kerucut hias daun pisang & garnish",
    basePricePerPortion: 13000,
  },
  {
    id: "nasikotak",
    label: "Nasi Kotak Catering",
    shortLabel: "Nasi Kotak Catering",
    desc: "Kemasan box eksklusif praktis untuk tamu",
    basePricePerPortion: 11000,
  },
];

export const CUSTOM_SIDE_DISHES = [
  {
    id: "ayam-bakar",
    name: "Ayam Bakar Madu",
    price: 10000,
    priceLabel: "+Rp10rb/porsi",
  },
  {
    id: "empal-gepuk",
    name: "Empal Gepuk",
    price: 12000,
    priceLabel: "+Rp12rb/porsi",
  },
  {
    id: "kentang-ati",
    name: "Sambal Goreng Kentang Ati",
    price: 5000,
    priceLabel: "+Rp5rb/porsi",
  },
  {
    id: "perkedel",
    name: "Perkedel Kentang",
    price: 3500,
    priceLabel: "+Rp3.5rb/porsi",
  },
  {
    id: "udang-balado",
    name: "Udang Balado",
    price: 9000,
    priceLabel: "+Rp9rb/porsi",
  },
  {
    id: "telur-balado",
    name: "Telur Balado",
    price: 4000,
    priceLabel: "+Rp4rb/porsi",
  },
];

export const SPICE_LEVELS = [
  {
    value: "Tidak Pedas",
    label: "Tidak Pedas",
    description: "Ramah anak-anak & lansia, gurih tanpa cabai rawit",
    level: 0,
  },
  {
    value: "Sedang",
    label: "Sedang",
    description: "Seimbang, gurih rempah dengan rasa pedas ringan",
    level: 1,
  },
  {
    value: "Pedas",
    label: "Pedas Mantap",
    description: "Sambal terasi & balado cabai rawit segar khas dapur",
    level: 2,
  },
];

export function generateMockCalendar(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const fullDays = [4, 8, 14, 15, 22, 28];
  const limitedDays = [7, 12, 21, 29];

  const slots = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    let status = "available";
    let remaining_slots = 5;

    if (fullDays.includes(day)) {
      status = "full";
      remaining_slots = 0;
    } else if (limitedDays.includes(day)) {
      status = "limited";
      remaining_slots = 2;
    }

    slots.push({ date: dateStr, day, status, remaining_slots });
  }
  return slots;
}

export const MOCK_REVIEWS = [
  {
    id: 1,
    customer_name: "Mas Dimas Anggara",
    event_moment: "Syukuran Wisuda & Keluarga",
    rating: 5,
    comment:
      "Pesan paket nasi liwet tampah untuk kumpul syukuran wisuda. Porsinya melimpah, sambal dadaknya juara, dan konfirmasi pesanannya sangat cepat lewat WhatsApp.",
  },
  {
    id: 2,
    customer_name: "Keluarga Bpk. Rahmat",
    event_moment: "Acara Lamaran",
    rating: 5,
    comment:
      "Tumpeng Agung 20 porsinya luar biasa mewah. Semua tamu keluarga memuji rasa empal gepuk dan udang baladonya. Pasti pesan lagi untuk acara berikutnya.",
  },
  {
    id: 3,
    customer_name: "Ibu Nadia Kusuma",
    event_moment: "Syukuran Rumah Baru",
    rating: 5,
    comment:
      "Tumpeng kuningnya wangi banget, ayam bakar madunya empuk dan bumbunya meresap. Pengiriman tepat waktu sebelum acara dimulai.",
  },
  {
    id: 4,
    customer_name: "Budi Santoso",
    event_moment: "Rapat Tahunan Kantor",
    rating: 5,
    comment:
      "Praktis bisa cek kalender dapur langsung dan custom lauk sesuai budget kantor. Admin WA juga responsif untuk konfirmasi jadwal.",
  },
];
