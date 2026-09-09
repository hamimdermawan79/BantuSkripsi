import { CategoryData, SpeedKey, SpeedOption, AddonOption, ServiceCategoryKey, CalculationResult } from '@/types/calculator';

export const PRICING_DATA: Record<ServiceCategoryKey, CategoryData> = {
  skripsi: {
    name: "Skripsi & Tugas Akhir",
    volumeLabel: "Jumlah Halaman",
    volumeUnit: "Halaman",
    volumeMin: 15,
    volumeMax: 250,
    volumeDefault: 60,
    volumeStep: 5,
    services: [
      {
        id: "basic",
        name: "Paket Basic (Format & Tata Letak)",
        basePrice: 75000,
        includedPages: 40,
        extraPerUnit: 2000,
        desc: "Tata letak, margin, spasi, daftar isi otomatis, dan typo ringan."
      },
      {
        id: "standard",
        name: "Paket Standard (Lengkap + Sitasi & Tabel)",
        basePrice: 150000,
        includedPages: 60,
        extraPerUnit: 2500,
        desc: "Semua fitur Basic ditambah sitasi, daftar pustaka, tabel, dan gambar."
      },
      {
        id: "premium",
        name: "Paket Premium (Pedoman Kampus + Revisi)",
        basePrice: 250000,
        includedPages: 80,
        extraPerUnit: 3000,
        desc: "Penyesuaian penuh pedoman kampus, cek konsistensi, dan revisi bebas."
      },
      {
        id: "olah_data",
        name: "Olah Data Statistik (SPSS / SmartPLS)",
        basePrice: 450000,
        includedPages: 9999,
        extraPerUnit: 0,
        desc: "Olah data statistik lengkap dengan tabel interpretasi dan draft Bab 4."
      }
    ]
  },
  keuangan: {
    name: "Laporan Keuangan",
    volumeLabel: "Periode Transaksi",
    volumeUnit: "Bulan",
    volumeMin: 1,
    volumeMax: 24,
    volumeDefault: 3,
    volumeStep: 1,
    services: [
      {
        id: "lapkeu_umkm",
        name: "Laporan Keuangan UMKM / Usaha",
        basePrice: 250000,
        includedPages: 1,
        extraPerUnit: 100000,
        desc: "Laba rugi, neraca, dan arus kas rapi standar UMKM."
      },
      {
        id: "lapkeu_tahunan",
        name: "Laporan Keuangan Tahunan Lengkap",
        basePrice: 650000,
        includedPages: 12,
        extraPerUnit: 50000,
        desc: "Standar PSAK / SAK EMKM untuk perbankan, investor, atau audit."
      },
      {
        id: "rekonsiliasi_pajak",
        name: "Rekonsiliasi Bank & Pajak",
        basePrice: 350000,
        includedPages: 1,
        extraPerUnit: 75000,
        desc: "Penyesuaian mutasi rekening koran dan rekap kepatuhan SPT."
      }
    ]
  },
  kantoran: {
    name: "Laporan Kantoran",
    volumeLabel: "Jumlah Halaman / Slide",
    volumeUnit: "Hal/Slide",
    volumeMin: 5,
    volumeMax: 120,
    volumeDefault: 25,
    volumeStep: 5,
    services: [
      {
        id: "laporan_kinerja",
        name: "Laporan Kinerja & Proyek",
        basePrice: 200000,
        includedPages: 15,
        extraPerUnit: 10000,
        desc: "Laporan progres kerja periodik divisi yang rapi dan objektif."
      },
      {
        id: "executive_summary",
        name: "Executive Summary Manajemen",
        basePrice: 350000,
        includedPages: 10,
        extraPerUnit: 15000,
        desc: "Ringkasan ringkas dan padat untuk pengambil keputusan strategis."
      },
      {
        id: "sop_kantor",
        name: "SOP & Alur Prosedur Kerja",
        basePrice: 450000,
        includedPages: 10,
        extraPerUnit: 20000,
        desc: "Dokumentasi SOP, flowchart tugas divisi, dan panduan kerja baku."
      },
      {
        id: "deck_presentasi",
        name: "Slide Presentasi Manajemen",
        basePrice: 250000,
        includedPages: 12,
        extraPerUnit: 12000,
        desc: "Desain slide PowerPoint profesional, infografis, dan komunikatif."
      }
    ]
  }
};

export const SPEED_OPTIONS: Record<SpeedKey, SpeedOption> = {
  regular: {
    name: "Reguler (5 - 7 Hari)",
    multiplier: 1.0,
    label: "Reguler",
    badgeText: "Standar"
  },
  fast: {
    name: "Cepat (2 - 4 Hari)",
    multiplier: 1.25,
    label: "Cepat",
    badgeText: "+25%"
  },
  express: {
    name: "Kilat (24 - 48 Jam)",
    multiplier: 1.5,
    label: "Kilat",
    badgeText: "+50%"
  }
};

export const ADD_ON_OPTIONS: AddonOption[] = [
  {
    id: "addon_turnitin",
    name: "Cek Turnitin Premium (No Repository)",
    price: 35000,
    applicableTo: ["skripsi", "kantoran"]
  },
  {
    id: "addon_mendeley",
    name: "Sitasi Otomatis Mendeley / Zotero",
    price: 45000,
    applicableTo: ["skripsi"]
  },
  {
    id: "addon_ppt",
    name: "Slide Ringkasan Sidang / Rapat (10 Slide)",
    price: 120000,
    applicableTo: ["skripsi", "keuangan", "kantoran"]
  },
  {
    id: "addon_mentoring",
    name: "Sesi Diskusi 1-on-1 via Meet (45 Menit)",
    price: 100000,
    applicableTo: ["skripsi", "keuangan", "kantoran"]
  }
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculatePrice(
  category: ServiceCategoryKey,
  serviceId: string,
  volume: number,
  speedKey: SpeedKey,
  selectedAddonIds: string[]
): CalculationResult {
  const categoryData = PRICING_DATA[category];
  const service = categoryData.services.find(s => s.id === serviceId) || categoryData.services[0];
  const speed = SPEED_OPTIONS[speedKey] || SPEED_OPTIONS.regular;

  let basePrice = service.basePrice;
  let volumeAdjustment = 0;

  if (volume > service.includedPages && service.extraPerUnit > 0) {
    const extraUnits = volume - service.includedPages;
    volumeAdjustment = extraUnits * service.extraPerUnit;
  }

  const subtotalBeforeSpeed = basePrice + volumeAdjustment;
  const speedSurcharge = Math.round(subtotalBeforeSpeed * (speed.multiplier - 1));

  const selectedAddons = ADD_ON_OPTIONS.filter(addon => selectedAddonIds.includes(addon.id));
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  const grandTotal = subtotalBeforeSpeed + speedSurcharge + addonsTotal;

  return {
    categoryData,
    service,
    volume,
    speed,
    selectedAddons,
    basePrice,
    volumeAdjustment,
    speedSurcharge,
    addonsTotal,
    grandTotal
  };
}

export function buildWhatsAppLink(calc: CalculationResult): string {
  const addonsText = calc.selectedAddons.length > 0
    ? calc.selectedAddons.map(a => `• ${a.name} (${formatRupiah(a.price)})`).join('%0A')
    : 'Tidak ada';

  const message = `Halo KawanNugas, saya ingin konsultasi pengerjaan naskah/dokumen:%0A%0A` +
    `*Kategori:* ${calc.categoryData.name}%0A` +
    `*Paket:* ${calc.service.name}%0A` +
    `*Jumlah:* ${calc.volume} ${calc.categoryData.volumeUnit}%0A` +
    `*Waktu:* ${calc.speed.name}%0A` +
    `*Layanan Tambahan:*%0A${addonsText}%0A%0A` +
    `*Estimasi Biaya:* ${formatRupiah(calc.grandTotal)}%0A%0A` +
    `Mohon informasi lebih lanjut mengenai alur dan pengiriman file. Terima kasih!`;

  return `https://wa.me/6281234567890?text=${message}`;
}
