export const APP_CONFIG = {
  name: "Bantu Skripsimu",
  tagline: "Rapi, Cepat, Profesional",
  subTagline: "Rapi Formatnya, Siap Ujian & Sidang!",
  valueProposition: "Skripsi rapi, terstruktur, dan sesuai pedoman kampus tanpa mengubah isi penelitian.",
  quote: "Fokus ke penelitianmu, biar kami yang merapikan!",
  contact: {
    phone: "081234567890",
    phoneDisplay: "08XX-XXXX-XXXX",
    instagram: "@bantu.skripsimu",
    instagramUrl: "https://instagram.com/bantu.skripsimu",
    email: "bantuskripsimu@gmail.com",
    whatsappNumber: "6281234567890"
  }
};

export const SERVICES = [
  {
    id: "format-layout",
    code: "SRV-01",
    title: "Koreksi Format & Tata Letak",
    description: "Merapikan margin, spasi, font, ukuran huruf, alignment, dan penomoran halaman.",
    deliverables: ["Margin 4-4-3-3 / Pedoman Khusus", "Spasi & Paragraf Rapi", "Penomoran Romawi & Arab Otomatis"]
  },
  {
    id: "toc-table-fig",
    code: "SRV-02",
    title: "Daftar Isi, Tabel & Gambar",
    description: "Merapikan daftar isi, daftar tabel, dan daftar gambar otomatis dan konsisten.",
    deliverables: ["Table of Contents Otomatis", "Heading Level 1-4 Rapi", "Daftar Lampiran Terstruktur"]
  },
  {
    id: "citations",
    code: "SRV-03",
    title: "Sitasi & Daftar Pustaka",
    description: "Penyesuaian sitasi (APA, IEEE, Harvard, Vancouver, dll.) dan daftar pustaka sesuai pedoman.",
    deliverables: ["Standar Sitasi Internasional & Nasional", "Sinkronisasi Sitasi ke Daftar Pustaka", "Mendeley / Zotero Check"]
  },
  {
    id: "language-typo",
    code: "SRV-04",
    title: "Koreksi Bahasa & Typo",
    description: "Perbaikan ejaan, tanda baca, dan konsistensi istilah tanpa mengubah substansi penelitian.",
    deliverables: ["PUEBI / EYD Edisi V", "Koreksi Huruf Miring Istilah Asing", "Konsistensi Akronim & Glosarium"]
  },
  {
    id: "tables-figures",
    code: "SRV-05",
    title: "Merapikan Tabel & Gambar",
    description: "Memperbaiki tampilan tabel, grafik, gambar, dan tata letak penomorannya.",
    deliverables: ["Format Tabel Standar Akademik", "Keterangan Sumber & Nomor Rapi", "Resolusi & Alignment Presisi"]
  },
  {
    id: "consistency",
    code: "SRV-06",
    title: "Cek Konsistensi",
    description: "Memastikan konsistensi judul, subbab, istilah teknis, penomoran bab, dan daftar pustaka.",
    deliverables: ["Validasi Cross-Reference", "Konsistensi Istilah Antar-Bab", "Checklist Kelengkapan Draft"]
  },
  {
    id: "campus-guidelines",
    code: "SRV-07",
    title: "Sesuai Pedoman Kampus",
    description: "Menyesuaikan format skripsi dengan buku panduan / aturan penulisan kampus Anda.",
    deliverables: ["Cover & Lembar Pengesahan Sesuai Aturan", "Pola Bab & Format Template Kampus", "Format Pernyataan Orisinalitas"]
  }
];

export const PACKAGES = [
  {
    id: "basic",
    name: "BASIC",
    price: 75000,
    priceFormatted: "Rp75.000",
    turnaroundDays: "2 - 3 Hari Kerja",
    includedPagesBase: 50,
    features: [
      "Koreksi format & tata letak",
      "Daftar isi otomatis",
      "Koreksi typo ringan"
    ],
    recommendedFor: "Perapian format esensial untuk draft seminar proposal atau revisi ringan."
  },
  {
    id: "standard",
    name: "STANDARD",
    price: 150000,
    priceFormatted: "Rp150.000",
    turnaroundDays: "2 - 3 Hari Kerja",
    includedPagesBase: 75,
    featured: true,
    features: [
      "Semua di paket Basic",
      "Sitasi & daftar pustaka",
      "Merapikan tabel & gambar"
    ],
    recommendedFor: "Pilihan terpopuler untuk naskah skripsi lengkap menuju ujian komprehensif."
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 250000,
    priceFormatted: "Rp250.000",
    turnaroundDays: "1 - 2 Hari Kerja",
    includedPagesBase: 100,
    features: [
      "Semua di paket Standard",
      "Cek konsistensi keseluruhan",
      "Penyesuaian pedoman kampus",
      "Revisi hingga puas"
    ],
    recommendedFor: "Paket komprehensif untuk kesiapan sidang akhir dan cetak hard cover."
  }
];

export const ADVANTAGES = [
  { title: "Dikerjakan oleh tim berpengalaman", detail: "Editor terbiasa menangani ratusan draf skripsi, tesis, dan jurnal ilmiah." },
  { title: "Teliti, rapi, dan profesional", detail: "Pemeriksaan multi-layer memastikan setiap detail format memenuhi standar akademik." },
  { title: "100% menjaga isi & orisinalitas", detail: "Hanya merapikan aspek tata letak dan keterbacaan tanpa mengubah gagasan penelitian." },
  { title: "Pengerjaan cepat & tepat waktu", detail: "Jadwal pengerjaan terikat komitmen deadline yang disepakati bersama." },
  { title: "Revisi hingga Anda puas", detail: "Layanan purnajual untuk memastikan draf disetujui dosen pembimbing." },
  { title: "Data aman & rahasia terjamin", detail: "Naskah penelitian Anda dilindungi kebijakan kerahasiaan penuh." }
];

export const BONUS_ITEM = {
  title: "Bonus Pengecekan Plagiarisme Dasar",
  subtitle: "Grammarly / Turnitin Preview",
  description: "Dapatkan pengecekan tingkat kemiripan awal secara cuma-cuma untuk memastikan dokumen Anda aman sebelum diserahkan."
};

export const WORKFLOW = [
  {
    step: 1,
    title: "Konsultasi",
    description: "Kirim file naskah & buku pedoman kampus Anda."
  },
  {
    step: 2,
    title: "Penawaran",
    description: "Kami cek tingkat kompleksitas & memberikan estimasi harga pasti."
  },
  {
    step: 3,
    title: "Pembayaran",
    description: "Setelah deal, lakukan pembayaran melalui metode yang tersedia."
  },
  {
    step: 4,
    title: "Proses Pengerjaan",
    description: "Kami kerjakan perapian format sesuai kesepakatan pedoman."
  },
  {
    step: 5,
    title: "Selesai & Revisi",
    description: "File dikirim kembali, revisi format hingga Anda puas."
  }
];

export const CAMPUS_PRESETS = [
  { id: "ui", name: "Universitas Indonesia (UI)", citation: "APA 7th / IEEE", margin: "4cm Kiri, 3cm Lainnya" },
  { id: "ugm", name: "Universitas Gadjah Mada (UGM)", citation: "Harvard / APA", margin: "4cm Kiri & Atas, 3cm Lainnya" },
  { id: "itb", name: "Institut Teknologi Bandung (ITB)", citation: "IEEE / APA", margin: "4cm Kiri, 3cm Lainnya" },
  { id: "undip", name: "Universitas Diponegoro (UNDIP)", citation: "APA / IEEE", margin: "4cm Kiri & Atas, 3cm Kanan & Bawah" },
  { id: "unair", name: "Universitas Airlangga (UNAIR)", citation: "Vancouver / APA", margin: "4cm Kiri, 3cm Lainnya" },
  { id: "ub", name: "Universitas Brawijaya (UB)", citation: "APA 7th", margin: "4cm Kiri, 3cm Lainnya" },
  { id: "unpad", name: "Universitas Padjadjaran (UNPAD)", citation: "APA / Harvard", margin: "4cm Kiri, 3cm Lainnya" },
  { id: "binus", name: "Bina Nusantara (BINUS)", citation: "IEEE / APA", margin: "3.5cm Kiri, 2.5cm Lainnya" },
  { id: "telkom", name: "Telkom University", citation: "IEEE", margin: "4cm Kiri, 3cm Lainnya" },
  { id: "uny", name: "Universitas Negeri Yogyakarta (UNY)", citation: "APA 7th", margin: "4cm Kiri, 3cm Lainnya" },
  { id: "custom", name: "Kampus Lainnya (Kirimkan Buku Pedoman Anda)", citation: "Sesuai Pedoman", margin: "Custom" }
];
