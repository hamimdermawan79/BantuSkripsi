import { PricingPackage } from '@/types/packages';

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "package-basic",
    name: "PAKET BASIC",
    subtitle: "Perapihan format dasar dan layout naskah skripsi atau makalah.",
    price: "Rp 75.000",
    unit: "/ naskah",
    features: [
      "Koreksi format & tata letak (margin, font, spasi)",
      "Pembuatan daftar isi otomatis",
      "Koreksi typo ringan kata baku",
      "Penomoran halaman romawi & arab"
    ],
    calcCategory: "skripsi",
    calcServiceId: "basic"
  },
  {
    id: "package-standard",
    name: "PAKET STANDARD",
    subtitle: "Paket komprehensif yang direkomendasikan untuk seminar proposal & skripsi.",
    price: "Rp 150.000",
    unit: "/ naskah",
    features: [
      "Semua fitur di Paket Basic",
      "Penyelarasan sitasi & daftar pustaka",
      "Merapikan tabel, bagan, & daftar gambar otomatis",
      "Koreksi tata bahasa & format header/footer"
    ],
    calcCategory: "skripsi",
    calcServiceId: "standard",
    isRecommended: true
  },
  {
    id: "package-premium",
    name: "PAKET PREMIUM",
    subtitle: "Pengerjaan total sesuai buku pedoman resmi kampus hingga tuntas sidang.",
    price: "Rp 250.000",
    unit: "/ naskah",
    features: [
      "Semua fitur di Paket Standard",
      "Cek konsistensi judul, subbab & daftar pustaka",
      "Penyesuaian 100% buku pedoman kampus Anda",
      "Garansi revisi terpandu hingga Anda puas"
    ],
    calcCategory: "skripsi",
    calcServiceId: "premium"
  }
];
