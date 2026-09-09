import { ServiceCardItem, QualityStandard } from '@/types/services';

export const SERVICES_ITEMS: ServiceCardItem[] = [
  // 1. Skripsi & Akademik
  {
    id: "skripsi-format",
    category: "skripsi",
    title: "Rapikan Format & Layout Skripsi",
    description: "Penyesuaian tata letak menyeluruh: margin 4-4-3-3 atau custom, spasi 1.5/2, font, ukuran, alignment, heading level, penomoran halaman romawi & arab otomatis.",
    bullets: [
      "Daftar isi, tabel, dan gambar otomatis (update field)",
      "Koreksi typo dan tanda baca bahasa Indonesia baku",
      "Penyesuaian template pedoman kampus Anda"
    ],
    startingPrice: "Rp 75.000",
    calculatorCategory: "skripsi",
    calculatorServiceId: "basic"
  },
  {
    id: "skripsi-sitasi",
    category: "skripsi",
    title: "Sitasi & Referensi Ilmiah",
    description: "Standardisasi gaya pengutipan (APA 7th, IEEE, Harvard, Vancouver, Chicago) dan integrasi otomatis dengan Mendeley atau Zotero.",
    bullets: [
      "Sinkronisasi sitasi di dalam teks dengan daftar pustaka",
      "Pencarian DOI / metadata referensi yang hilang",
      "Pemberesan sumber jurnal terbaru 5-10 tahun terakhir"
    ],
    startingPrice: "Rp 150.000",
    calculatorCategory: "skripsi",
    calculatorServiceId: "standard"
  },
  {
    id: "skripsi-olah-data",
    category: "skripsi",
    title: "Olah Data Statistik & Turnitin",
    description: "Pengolahan data penelitian kuantitatif & kualitatif menggunakan SPSS, SmartPLS, SEM AMOS, atau Python, disertai uji validitas dan reliabilitas.",
    bullets: [
      "Tabel hasil pengolahan data rapi siap lampiran",
      "Draft interpretasi hasil uji untuk Bab 4",
      "Pengecekan dan parafrase Turnitin aman (No Repository)"
    ],
    startingPrice: "Rp 450.000",
    calculatorCategory: "skripsi",
    calculatorServiceId: "olah_data"
  },

  // 2. Laporan Keuangan
  {
    id: "keuangan-umkm",
    category: "keuangan",
    title: "Laporan Keuangan UMKM & Usaha",
    description: "Penyusunan laporan pembukuan usaha mandiri: Laporan Laba Rugi, Neraca Sederhana, dan Arus Kas (Cashflow) bulanan atau kuartalan.",
    bullets: [
      "Rekapitulasi bukti nota, invoice, dan kwitansi transaksi",
      "Pemisahan pos pengeluaran dan pemasukan operasional",
      "Format Excel terstruktur dan siap dipresentasikan"
    ],
    startingPrice: "Rp 250.000",
    calculatorCategory: "keuangan",
    calculatorServiceId: "lapkeu_umkm"
  },
  {
    id: "keuangan-tahunan",
    category: "keuangan",
    title: "Laporan Keuangan Tahunan PT / CV",
    description: "Penyusunan laporan keuangan standar akuntansi SAK EMKM atau PSAK untuk kebutuhan pemegang saham, perbankan/pinjaman modal, dan audit.",
    bullets: [
      "Laporan Laba Rugi Komprehensif & Neraca Lajur",
      "Laporan Perubahan Ekuitas & Arus Kas Lengkap",
      "Catatan Atas Laporan Keuangan (CALK) resmi"
    ],
    startingPrice: "Rp 650.000",
    calculatorCategory: "keuangan",
    calculatorServiceId: "lapkeu_tahunan"
  },
  {
    id: "keuangan-pajak",
    category: "keuangan",
    title: "Rekonsiliasi Bank & Dokumen Pajak",
    description: "Penyelarasan catatan buku kas perusahaan dengan mutasi rekening koran bank, serta rekapitulasi data untuk pelaporan SPT Pajak.",
    bullets: [
      "Identifikasi selisih mutasi, biaya administrasi, dan bunga",
      "Penyusunan tabel rekap faktur pajak dan PPh/PPN",
      "Dokumentasi arsip keuangan yang rapi dan tertata"
    ],
    startingPrice: "Rp 350.000",
    calculatorCategory: "keuangan",
    calculatorServiceId: "rekonsiliasi_pajak"
  },

  // 3. Laporan Kantoran
  {
    id: "kantoran-kinerja",
    category: "kantoran",
    title: "Laporan Kinerja Bulanan & Divisi",
    description: "Penyusunan laporan capaian KPI, progres proyek, evaluasi kendala, dan rekomendasi tindak lanjut untuk atasan/jajaran manajemen.",
    bullets: [
      "Format formal dan terstruktur siap tanda tangan",
      "Penyajian data tabel dan visual chart yang komunikatif",
      "Koreksi tata bahasa formal dan ringkas"
    ],
    startingPrice: "Rp 200.000",
    calculatorCategory: "kantoran",
    calculatorServiceId: "laporan_kinerja"
  },
  {
    id: "kantoran-sop",
    category: "kantoran",
    title: "SOP & Panduan Operasional",
    description: "Dokumentasi Standard Operating Procedure (SOP) divisi, pedoman alur kerja (workflow flowchart), dan job description terstandar.",
    bullets: [
      "Format standar ISO/Manajemen Mutu",
      "Flowchart alur proses langkah demi langkah",
      "Template form evaluasi dan checklist kerja"
    ],
    startingPrice: "Rp 450.000",
    calculatorCategory: "kantoran",
    calculatorServiceId: "sop_kantor"
  },
  {
    id: "kantoran-deck",
    category: "kantoran",
    title: "Slide Deck & Executive Summary",
    description: "Pembuatan slide presentasi PowerPoint/Canva profesional untuk rapat direksi, rapat kerja tahunan, serta dokumen ringkasan eksekutif.",
    bullets: [
      "Desain visual bersih, modern, dan tidak padat teks",
      "Infografis data capaian dan poin kesimpulan strategis",
      "Format PPTX & PDF master siap dibawakan"
    ],
    startingPrice: "Rp 250.000",
    calculatorCategory: "kantoran",
    calculatorServiceId: "deck_presentasi"
  }
];

export const QUALITY_STANDARDS: QualityStandard[] = [
  {
    step: 1,
    title: "Koreksi Format & Tata Letak",
    desc: "Merapikan margin, spasi, font, ukuran huruf, alignment, dan sistem penomoran."
  },
  {
    step: 2,
    title: "Daftar Isi, Tabel & Gambar",
    desc: "Merapikan daftar isi, daftar tabel, dan gambar secara otomatis dan konsisten."
  },
  {
    step: 3,
    title: "Sitasi & Daftar Pustaka",
    desc: "Penyesuaian sitasi APA, IEEE, Harvard, Mendeley/Zotero sesuai standar pedoman."
  },
  {
    step: 4,
    title: "Koreksi Bahasa & Typo",
    desc: "Perbaikan ejaan kata baku KBBI, tanda baca, dan istilah asing tanpa mengubah substansi."
  },
  {
    step: 5,
    title: "Merapikan Tabel & Gambar",
    desc: "Memperbaiki tampilan tabel berantakan, grafik terpotong, serta penomorannya."
  },
  {
    step: 6,
    title: "Cek Konsistensi Keseluruhan",
    desc: "Memastikan konsistensi penulisan judul, subbab, istilah teknis, dan rumus."
  },
  {
    step: 7,
    title: "Sesuai Pedoman Kampus / Kantor",
    desc: "Menyesuaikan format akhir secara presisi dengan buku pedoman institusi Anda."
  }
];
