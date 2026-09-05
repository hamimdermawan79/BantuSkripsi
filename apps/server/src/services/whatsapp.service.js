import { APP_CONFIG } from "../config/constants.js";
import { formatRupiah } from "../utils/reference.js";

export class WhatsAppService {
  /**
   * Generates a clean, professional, and emoji-free WhatsApp consultation message and direct link.
   */
  static generateMessage({
    referenceCode,
    studentName,
    campusName,
    facultyMajor,
    packageName,
    pageCount,
    urgencyName,
    estimatedPrice,
    notes,
    addons = []
  }) {
    const lines = [
      `FORMULIR KONSULTASI - ${APP_CONFIG.name.toUpperCase()}`,
      `Nomor Referensi : ${referenceCode}`,
      `Tanggal         : ${new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}`,
      ``,
      `--- DATA MAHASISWA & NASKAH ---`,
      `Nama Lengkap    : ${studentName || "-"}`,
      `Perguruan Tinggi: ${campusName || "-"}`,
      `Fakultas / Prodi: ${facultyMajor || "-"}`,
      `Jumlah Halaman  : ${pageCount} Halaman`,
      ``,
      `--- DETAIL PAKET LAYANAN ---`,
      `Pilihan Paket   : ${packageName}`,
      `Tingkat Urgensi : ${urgencyName || "Reguler (3-5 Hari)"}`,
      addons.length > 0 ? `Layanan Tambahan: ${addons.join(", ")}` : `Layanan Tambahan: Tidak ada`,
      `Estimasi Biaya  : ${typeof estimatedPrice === "number" ? formatRupiah(estimatedPrice) : estimatedPrice}`,
      ``,
      `--- CATATAN TAMBAHAN ---`,
      notes ? notes : `Mohon dicek draf naskah dan pedoman kampus yang akan saya lampirkan.`,
      ``,
      `Terima kasih. Saya menunggu konfirmasi dan peninjauan dari tim Bantu Skripsimu.`
    ];

    const messageText = lines.join("\n");
    const encodedMessage = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${APP_CONFIG.contact.whatsappNumber}?text=${encodedMessage}`;

    return {
      messageText,
      waUrl,
      targetNumber: APP_CONFIG.contact.whatsappNumber
    };
  }
}
