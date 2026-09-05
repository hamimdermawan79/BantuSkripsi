# Bantu Skripsimu - Monorepo Web Jasa Rapikan Skripsi

Aplikasi web profesional untuk layanan **Jasa Rapikan Skripsi ("Bantu Skripsimu")** berpedoman pada poster promosi resmi dengan standar arsitektur **Monorepo Node.js** dan desain **Anti-SLOP**.

---

## Ketentuan & Karakteristik Desain (Anti-SLOP)

1. **Zero Emoji**: Seluruh elemen antarmuka, tombol, notifikasi sistem, dan template pesan WhatsApp bebas dari emoji.
2. **Zero Badges**: Mengeliminasi badge/pill-tag dekoratif yang tidak esensial; menggunakan struktur grid geometris dan garis aksen.
3. **Tipografi Tegas & Profesional**: Menggunakan font *Plus Jakarta Sans* dan *JetBrains Mono* dengan hierarki bobot (*font-weight*) yang presisi.
4. **Tanpa Login Page**: Akses instan untuk estimasi kalkulator real-time, perbandingan dokumen, pengajuan konsultasi, dan pelacakan status pesanan via nomor referensi unik.

---

## Struktur Monorepo

```
WebSkripsi/
├── package.json                   # Root workspace orchestrator
├── README.md                      # Dokumentasi sistem
├── apps/
│   ├── server/                    # Backend API (Node.js + Express)
│   │   ├── package.json
│   │   └── src/
│   │       ├── server.js          # Server entry point (Port 5000)
│   │       ├── app.js             # Express application config
│   │       ├── config/
│   │       │   └── constants.js   # Data 7 layanan, 3 paket, pedoman kampus
│   │       ├── controllers/       # Controller logic
│   │       ├── routes/            # REST API endpoints
│   │       ├── services/          # Dynamic pricing & WhatsApp formatter
│   │       └── utils/             # Reference code generator
│   └── client/                    # Frontend (Vite + Modular Web Components)
│       ├── package.json
│       ├── vite.config.js         # Port 3000 & API proxy
│       ├── index.html             # Semantic Anti-SLOP layout
│       └── src/
│           ├── styles/            # Design tokens, base, layout, components
│           └── scripts/           # Calculator, order modal, comparison, tracker
```

---

## Fitur Utama

- **7 Layanan Utama Sesuai Poster**:
  1. Koreksi Format & Tata Letak
  2. Daftar Isi, Tabel & Gambar
  3. Sitasi & Daftar Pustaka (APA, IEEE, Harvard, dll.)
  4. Koreksi Bahasa & Typo (PUEBI/EYD V)
  5. Merapikan Tabel & Gambar
  6. Cek Konsistensi
  7. Sesuai Pedoman Kampus
- **3 Paket Tarif Resmi**: Basic (Rp75.000), Standard (Rp150.000), Premium (Rp250.000) + Bonus Turnitin / Grammarly Preview.
- **Interactive Live Price & Deadline Calculator**: Menghitung estimasi biaya berdasarkan paket, batas halaman, dan tingkat urgensi waktu.
- **Interactive Before vs After Document Proof**: Perbandingan visual naskah sebelum dan sesudah dirapikan.
- **Alur Pemesanan 5 Langkah**: Terstruktur dan mudah dipahami.
- **Sistem Pelacakan Status (Tanpa Login)**: Cek status pengerjaan cukup dengan nomor referensi (misal: `REF-SKR-2026-9012`).
- **Direct WhatsApp Payload Generator**: Menghasilkan draf chat terstruktur rapi ke admin WhatsApp.

---

## Panduan Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Mode Development (Server & Client Sekaligus)
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### 3. Build Produksi
```bash
npm run build
```
