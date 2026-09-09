import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KawanNugas - Jasa Rapikan Skripsi, Laporan Keuangan & Kantoran',
  description: 'Jasa pengerjaan dan perapihan skripsi, laporan keuangan, dan segala laporan kantoran. Rapi formatnya, siap ujian, sidang, dan presentasi manajemen.',
  keywords: [
    'jasa rapikan skripsi',
    'jasa format skripsi',
    'jasa laporan keuangan',
    'jasa laporan kantor',
    'cek turnitin',
    'olah data spss'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
