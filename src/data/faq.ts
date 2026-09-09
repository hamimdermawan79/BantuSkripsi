export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Apakah kerahasiaan naskah skripsi dan data keuangan saya dijamin aman?",
    answer: "Ya, 100% aman. Kami memberlakukan kebijakan Non-Disclosure Agreement (NDA) yang ketat. Naskah atau data transaksi Anda tidak akan dipublikasikan, disimpan di repository publik, atau dibagikan ke pihak mana pun. Setelah proses pengerjaan dan masa garansi selesai, file arsip dapat dihapus permanen atas permintaan Anda."
  },
  {
    id: "faq-2",
    question: "Apakah format yang dikerjakan benar-benar sesuai dengan pedoman kampus saya?",
    answer: "Tentu. Saat konsultasi awal, Anda cukup melampirkan file PDF buku pedoman penulisan skripsi/tugas akhir dari kampus Anda. Tim kami akan menyesuaikan setiap poin pedoman, mulai dari margin, jenis font, gaya penomoran bab/subbab, aturan tabel dan gambar, hingga format sitasi daftar pustaka."
  },
  {
    id: "faq-3",
    question: "Bagaimana jika setelah file selesai, dosen pembimbing atau atasan meminta revisi?",
    answer: "Kami memberikan garansi revisi format terpandu. Anda cukup menandai atau menyampaikan catatan perbaikan dari dosen pembimbing/atasan, dan tim kami akan segera memperbaikinya sesuai kesepakatan ruang lingkup awal tanpa biaya tambahan."
  },
  {
    id: "faq-4",
    question: "Berapa lama waktu pengerjaan dokumen yang dibutuhkan?",
    answer: "Waktu pengerjaan fleksibel sesuai kebutuhan Anda: Paket Reguler membutuhkan waktu 5-7 hari kerja, Paket Cepat 2-4 hari kerja, dan kami juga melayani Paket Kilat/Urgent 24-48 jam untuk kebutuhan mendesak menjelang batas waktu pendaftaran sidang atau rapat direksi."
  },
  {
    id: "faq-5",
    question: "Apakah harus mendaftar akun atau login terlebih dahulu?",
    answer: "Tidak perlu sama sekali! Website kami dirancang untuk kemudahan dan privasi maksimal. Anda cukup melakukan simulasi biaya melalui kalkulator harga, lalu langsung menghubungi admin via WhatsApp resmi kami."
  },
  {
    id: "faq-6",
    question: "Bagaimana sistem pembayarannya?",
    answer: "Kami mendukung transfer bank (BCA, Mandiri, BNI, BRI) serta e-wallet resmi (GoPay, OVO, Dana, QRIS). Pengerjaan dapat dimulai dengan Down Payment (DP) 50% setelah estimasi disepakati, dan sisa pelunasan dilakukan saat dokumen selesai dan siap dikirim."
  }
];
