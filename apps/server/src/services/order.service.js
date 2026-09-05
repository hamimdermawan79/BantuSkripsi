import { generateReferenceCode } from "../utils/reference.js";
import { PricingService } from "./pricing.service.js";
import { WhatsAppService } from "./whatsapp.service.js";

// In-memory persistent order repository with initial demo records for instant tracking testing
const ordersStore = new Map();

// Seed initial orders for tracking demonstrations
const initialSeedOrders = [
  {
    referenceCode: "REF-SKR-2026-9012",
    studentName: "Aditya Pratama",
    campusName: "Universitas Indonesia (UI)",
    facultyMajor: "Ilmu Komputer / Sistem Informasi",
    packageName: "PREMIUM",
    pageCount: 84,
    urgencyName: "Cepat (1 - 2 Hari Kerja)",
    status: "proses_pengerjaan",
    statusLabel: "Sedang Dikerjakan (Tahap 4)",
    progressPercent: 70,
    statusHistory: [
      { step: "Konsultasi File & Pedoman Diterima", time: "02 Sep 2026 10:15 WIB", done: true },
      { step: "Peninjauan Naskah & Penawaran Disetujui", time: "02 Sep 2026 11:30 WIB", done: true },
      { step: "Pembayaran Terkonfirmasi", time: "02 Sep 2026 12:00 WIB", done: true },
      { step: "Proses Perapian Margin, Daftar Isi & Sitasi", time: "03 Sep 2026 09:00 WIB", done: true },
      { step: "Quality Check Konsistensi & Finalisasi", time: "Estimasi selesai hari ini 17:00 WIB", done: false }
    ],
    estimatedCompletion: "04 Sep 2026",
    totalPrice: 322000,
    totalPriceFormatted: "Rp322.000",
    createdAt: "2026-09-02T10:15:00.000Z"
  },
  {
    referenceCode: "REF-SKR-2026-8155",
    studentName: "Nabila Saraswati",
    campusName: "Universitas Gadjah Mada (UGM)",
    facultyMajor: "Ekonomika dan Bisnis / Manajemen",
    packageName: "STANDARD",
    pageCount: 65,
    urgencyName: "Reguler (3 - 5 Hari Kerja)",
    status: "selesai",
    statusLabel: "Selesai & File Telah Dikirim (Tahap 5)",
    progressPercent: 100,
    statusHistory: [
      { step: "Konsultasi File & Pedoman Diterima", time: "28 Ags 2026 14:00 WIB", done: true },
      { step: "Penawaran Disetujui", time: "28 Ags 2026 15:10 WIB", done: true },
      { step: "Pembayaran Terkonfirmasi", time: "28 Ags 2026 16:00 WIB", done: true },
      { step: "Proses Perapian Selesai", time: "30 Ags 2026 13:45 WIB", done: true },
      { step: "File Final & Laporan Turnitin Terkirim", time: "30 Ags 2026 15:00 WIB", done: true }
    ],
    estimatedCompletion: "30 Ags 2026",
    totalPrice: 150000,
    totalPriceFormatted: "Rp150.000",
    createdAt: "2026-08-28T14:00:00.000Z"
  },
  {
    referenceCode: "REF-CORP-2026-4421",
    studentName: "Ir. Hendra Gunawan (Project Manager)",
    campusName: "PT Wijaya Konstruksi Nusantara",
    facultyMajor: "Laporan Mingguan Proyek Gedung Bertingkat & Kurva S",
    packageName: "PREMIUM",
    pageCount: 110,
    urgencyName: "Cepat (1 - 2 Hari Kerja)",
    status: "proses_pengerjaan",
    statusLabel: "Sedang Dikerjakan - Sinkronisasi Kurva S & Opname (Tahap 4)",
    progressPercent: 75,
    statusHistory: [
      { step: "Dokumen Draf Laporan Proyek & Data BoQ Diterima", time: "03 Sep 2026 08:30 WIB", done: true },
      { step: "Penelaahan Format & Penawaran Disepakati", time: "03 Sep 2026 09:45 WIB", done: true },
      { step: "Pembayaran & NDA Dikonfirmasi", time: "03 Sep 2026 10:15 WIB", done: true },
      { step: "Penyusunan Format Laporan Mingguan, Kurva S & Backup Volume", time: "04 Sep 2026 09:00 WIB", done: true },
      { step: "Final Review & Ekspor PDF High-Resolution Siap Rapat Direksi", time: "Estimasi selesai hari ini 16:30 WIB", done: false }
    ],
    estimatedCompletion: "04 Sep 2026",
    totalPrice: 425000,
    totalPriceFormatted: "Rp425.000",
    createdAt: "2026-09-03T08:30:00.000Z"
  }
];

// Load seeds
for (const order of initialSeedOrders) {
  ordersStore.set(order.referenceCode, order);
}

export class OrderService {
  static createConsultation({
    studentName,
    campusName,
    facultyMajor,
    packageId = "standard",
    pageCount = 60,
    urgency = "regular",
    selectedAddons = [],
    notes = ""
  }) {
    const referenceCode = generateReferenceCode("REF-SKR");
    const calculation = PricingService.calculateEstimate({
      packageId,
      pageCount,
      urgency,
      selectedAddons
    });

    const waData = WhatsAppService.generateMessage({
      referenceCode,
      studentName,
      campusName,
      facultyMajor,
      packageName: calculation.package.name,
      pageCount: calculation.input.pageCount,
      urgencyName: calculation.input.urgencyName,
      estimatedPrice: calculation.totalPrice,
      notes,
      addons: calculation.breakdown.addons.map(a => a.name)
    });

    const newOrder = {
      referenceCode,
      studentName: studentName || "Mahasiswa",
      campusName: campusName || "Perguruan Tinggi",
      facultyMajor: facultyMajor || "-",
      packageId: calculation.package.id,
      packageName: calculation.package.name,
      pageCount: calculation.input.pageCount,
      urgency: calculation.input.urgency,
      urgencyName: calculation.input.urgencyName,
      selectedAddons,
      addonsDetail: calculation.breakdown.addons,
      totalPrice: calculation.totalPrice,
      totalPriceFormatted: calculation.totalPriceFormatted,
      status: "konsultasi_diajukan",
      statusLabel: "Konsultasi Diajukan (Tahap 1)",
      progressPercent: 20,
      statusHistory: [
        {
          step: "Konsultasi Terdaftar Melalui Web",
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
          done: true
        },
        { step: "Menunggu Pengiriman File & Buku Pedoman ke Admin", time: "Segera kirim ke WhatsApp", done: false },
        { step: "Pengecekan Naskah & Penawaran Final", time: "Tahap 2", done: false },
        { step: "Proses Pengerjaan Format Skripsi", time: "Tahap 4", done: false },
        { step: "Selesai & Pengiriman File Akhir", time: "Tahap 5", done: false }
      ],
      estimatedCompletion: calculation.estimatedCompletionText,
      notes,
      whatsapp: waData,
      createdAt: new Date().toISOString()
    };

    ordersStore.set(referenceCode, newOrder);

    return newOrder;
  }

  static getOrderByReference(refCode) {
    if (!refCode) return null;
    const cleanCode = refCode.trim().toUpperCase();
    return ordersStore.get(cleanCode) || null;
  }

  static listRecentOrders(limit = 10) {
    return Array.from(ordersStore.values())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }
}
