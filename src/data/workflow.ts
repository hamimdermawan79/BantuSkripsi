export interface WorkflowStep {
  step: number;
  title: string;
  desc: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: "Konsultasi",
    desc: "Kirim file draft naskah dan buku pedoman kampus atau format kantor Anda via WhatsApp."
  },
  {
    step: 2,
    title: "Penawaran",
    desc: "Tim kami memeriksa detail dokumen dan memberikan estimasi harga pasti serta jadwal pengerjaan."
  },
  {
    step: 3,
    title: "Pembayaran",
    desc: "Setelah sepakat, lakukan pembayaran aman (DP atau lunas) untuk memulai pengerjaan resmi."
  },
  {
    step: 4,
    title: "Pengerjaan",
    desc: "Tim ahli mengerjakan dokumen dengan teliti sesuai deadline dan standar yang telah ditentukan."
  },
  {
    step: 5,
    title: "Selesai & Revisi",
    desc: "File hasil pengerjaan dikirim lengkap. Nikmati garansi revisi terpandu hingga Anda puas."
  }
];
