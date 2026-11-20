# API Contract — Dapur Tumpeng Ibu Sri Rahayu

Kontrak resmi antara Front-End (React + Axios) dan Back-End (Express.js + PostgreSQL).

## Aturan Umum

- **Base URL (Lokal):** `http://localhost:5000/api`
- **Content-Type:** `application/json`
- **Format Response:** Kembalikan JSON array/object **langsung** (tanpa dibungkus `{ data: ... }`), karena Axios di FE langsung membaca `response.data`.
- **Format Error (4xx / 5xx):**
  ```json
  { "message": "Kuota dapur pada tanggal tersebut sudah penuh." }
  ```
- **CORS:** Wajib diaktifkan untuk `http://localhost:5173` (lokal) dan domain produksi nanti.

---

## Daftar Endpoint

### 1. Ambil Katalog Menu
- **Endpoint:** `GET /api/menus`
- **Response `200 OK`:**
```json
[
  {
    "id": "menu-1",
    "name": "Tumpeng Kuning Mini Keluarga",
    "category": "Tumpeng Kuning Spesial",
    "badge": "Favorit Keluarga",
    "portions": 5,
    "portionsLabel": "5 Porsi",
    "price": 175000,
    "image_url": "https://...",
    "items": [
      "Nasi Kuning Gurih",
      "Ayam Bakar Madu",
      "Tempe Orek Kering"
    ]
  }
]
```
> Nilai `category` harus salah satu dari: `"Tumpeng Kuning Spesial"`, `"Nasi Kotak Catering"`, `"Paket Syukuran"`.

---

### 2. Cek Kuota Kalender Harian
- **Endpoint:** `GET /api/calendar?month=YYYY-MM`
- **Contoh:** `GET /api/calendar?month=2026-11`
- **Response `200 OK`:** (1 object per hari dalam bulan tersebut)
```json
[
  {
    "date": "2026-11-10",
    "day": 10,
    "status": "available",
    "remaining_slots": 5
  },
  {
    "date": "2026-11-12",
    "day": 12,
    "status": "limited",
    "remaining_slots": 2
  },
  {
    "date": "2026-11-14",
    "day": 14,
    "status": "full",
    "remaining_slots": 0
  }
]
```
> Aturan `status`: `remaining_slots === 0` ➔ `"full"`, `remaining_slots <= 2` ➔ `"limited"`, selain itu `"available"`.

---

### 3. Verifikasi / Simpan Pelanggan WA
- **Endpoint:** `POST /api/customers/verify`
- **Request Body:**
```json
{
  "full_name": "Arya Pratama",
  "whatsapp": "081234567890",
  "event_moment": "Wisuda & Syukuran",
  "verify_code": "VERIF-SR9990"
}
```
- **Response `200 OK` / `201 Created`:**
```json
{
  "verified": true,
  "full_name": "Arya Pratama",
  "whatsapp": "081234567890",
  "event_moment": "Wisuda & Syukuran",
  "verify_code": "VERIF-SR9990"
}
```

---

### 4. Buat Pesanan Baru (Reguler & Custom)
- **Endpoint:** `POST /api/orders`
- **Request Body:**
```json
{
  "customer_name": "Arya Pratama",
  "whatsapp": "081234567890",
  "event_date": "2026-12-22",
  "delivery_time": "11:00",
  "delivery_method": "Diantar Kurir Khusus Catering",
  "address": "Jl. Ahmad Yani No. 10, Tangerang",
  "payment_scheme": "DP_50",
  "total_price": 355000,
  "payable_now": 177500,
  "items": [
    {
      "id": "menu-2",
      "name": "Tumpeng Kuning Komplit",
      "portions": 10,
      "portionsLabel": "10 Porsi",
      "price": 325000,
      "qty": 1,
      "isCustom": false
    },
    {
      "id": "custom-tumpeng-10-...",
      "name": "Tumpeng Kuning (10 Porsi)",
      "portions": 10,
      "portionsLabel": "10 Porsi",
      "price": 355000,
      "qty": 1,
      "isCustom": true,
      "customSummary": "Lauk: Ayam Bakar Madu, Telur Balado • Sambal: Sedang • Topper: \"Selamat Syukuran\"",
      "customMeta": {
        "format": "Tumpeng Kuning Tampah",
        "dishes": ["Ayam Bakar Madu", "Telur Balado"],
        "spiceLevel": "Sedang",
        "topper": "Selamat Syukuran"
      }
    }
  ]
}
```
- **Response `201 Created`:** (Wajib mengembalikan objek pesanan lengkap karena langsung dipakai di Modal Struk & Status Keranjang)
```json
{
  "order_id": "TMP-3245",
  "status": "Menunggu Konfirmasi WA",
  "created_at": "2026-11-21T02:00:00.000Z",
  "customer_name": "Arya Pratama",
  "whatsapp": "081234567890",
  "event_date": "2026-12-22",
  "delivery_time": "11:00",
  "delivery_method": "Diantar Kurir Khusus Catering",
  "address": "Jl. Ahmad Yani No. 10, Tangerang",
  "payment_scheme": "DP_50",
  "total_price": 355000,
  "payable_now": 177500,
  "items": []
}
```
> Validasi BE: Tolak dengan `400 Bad Request` + `{ "message": "..." }` jika `items` kosong atau kuota `event_date` sudah penuh.

---

### 5. Update Status Pesanan
- **Endpoint:** `PATCH /api/orders/:id/status`
- **Contoh:** `PATCH /api/orders/TMP-3245/status`
- **Request Body:**
```json
{ "status": "Selesai" }
```
- **Response `200 OK`:**
```json
{ "order_id": "TMP-3245", "status": "Selesai" }
```

---

### 6. Ambil & Kirim Ulasan Pelanggan
- **Ambil semua:** `GET /api/reviews`
- **Response `200 OK`:**
```json
[
  {
    "id": 1,
    "customer_name": "Mas Dimas Anggara",
    "event_moment": "Syukuran Wisuda & Keluarga",
    "rating": 5,
    "comment": "Porsinya melimpah, sambal dadaknya juara."
  }
]
```
- **Tambah ulasan:** `POST /api/reviews`
- **Request Body:**
```json
{
  "order_id": "TMP-3245",
  "customer_name": "Arya Pratama",
  "event_moment": "Wisuda & Syukuran",
  "rating": 5,
  "comment": "Nasi kuningnya gurih dan pengiriman tepat waktu."
}
```
- **Response `201 Created`:** Objek ulasan tersimpan beserta `id`.

---

## Referensi Skema Database (PostgreSQL)

```sql
CREATE TABLE menus (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  badge VARCHAR(50),
  portions INT NOT NULL,
  portions_label VARCHAR(100) NOT NULL, -- Alias ke "portionsLabel" saat SELECT
  price INT NOT NULL,
  image_url TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  whatsapp VARCHAR(30) UNIQUE NOT NULL,
  event_moment VARCHAR(150),
  verify_code VARCHAR(30),
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  order_id VARCHAR(20) PRIMARY KEY, -- Format: TMP-XXXX
  customer_name VARCHAR(150) NOT NULL,
  whatsapp VARCHAR(30) NOT NULL,
  event_date DATE NOT NULL,
  delivery_time VARCHAR(10) NOT NULL,
  delivery_method VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  payment_scheme VARCHAR(20) NOT NULL CHECK (payment_scheme IN ('DP_50', 'FULL_100')),
  items JSONB NOT NULL,
  total_price INT NOT NULL,
  payable_now INT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Konfirmasi WA',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(20) REFERENCES orders(order_id) ON DELETE SET NULL,
  customer_name VARCHAR(150) NOT NULL,
  event_moment VARCHAR(150),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```