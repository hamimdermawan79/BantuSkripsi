import React from 'react';
import { ServiceCategoryKey } from '@/types/calculator';

interface PackagesProps {
  onSelectPackage?: (category: ServiceCategoryKey, serviceId: string) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  const handleSelect = (cat: ServiceCategoryKey, serviceId: string) => {
    if (onSelectPackage) {
      onSelectPackage(cat, serviceId);
    }
    const calc = document.getElementById('kalkulator');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="packages-section" id="paket">
      <div className="container">
        {/* Section Header */}
        <div className="packages-header text-center">
          <span className="packages-badge-tag">PAKET LAYANAN</span>
          <h2 className="packages-main-title">Pilihan Paket Sesuai Kebutuhan Naskah</h2>
          <p className="packages-subtitle">
            Tarif transparan tanpa biaya tersembunyi. Konsultasi dan pengecekan awal dokumen bersifat gratis.
          </p>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="packages-grid-three">
          {/* Card 1: BASIC */}
          <div className="package-box basic">
            <div className="package-box-top">
              <h3 className="pkg-tier-name">BASIC</h3>
              <div className="pkg-price-row">
                <span className="pkg-price-val">Rp75.000</span>
              </div>
              <p className="pkg-page-estimate">Estimasi standar naskah s.d. 50 halaman</p>
            </div>

            <ul className="pkg-checklist">
              <li>
                <span className="check-icon">✓</span>
                <span>Koreksi format & tata letak</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Daftar isi otomatis</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Koreksi typo ringan</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn-select-pkg outline"
              onClick={() => handleSelect('skripsi', 'basic')}
            >
              Pilih Paket Basic
            </button>
          </div>

          {/* Card 2: STANDARD (Featured - Paling Populer) */}
          <div className="package-box standard featured">
            <div className="popular-ribbon-badge">PALING POPULER</div>

            <div className="package-box-top">
              <h3 className="pkg-tier-name">STANDARD</h3>
              <div className="pkg-price-row">
                <span className="pkg-price-val">Rp150.000</span>
              </div>
              <p className="pkg-page-estimate">Estimasi standar naskah s.d. 75 halaman</p>
            </div>

            <ul className="pkg-checklist">
              <li>
                <span className="check-icon">✓</span>
                <span>Semua di paket Basic</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Sitasi & daftar pustaka</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Merapikan tabel & gambar</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Bonus Turnitin / Grammarly Preview</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn-select-pkg solid-navy"
              onClick={() => handleSelect('skripsi', 'standard')}
            >
              Pilih Paket Standard
            </button>
          </div>

          {/* Card 3: PREMIUM */}
          <div className="package-box premium">
            <div className="package-box-top">
              <h3 className="pkg-tier-name">PREMIUM</h3>
              <div className="pkg-price-row">
                <span className="pkg-price-val">Rp250.000</span>
              </div>
              <p className="pkg-page-estimate">Estimasi standar naskah s.d. 100 halaman</p>
            </div>

            <ul className="pkg-checklist">
              <li>
                <span className="check-icon">✓</span>
                <span>Semua di paket Standard</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Cek konsistensi keseluruhan</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Penyesuaian pedoman kampus</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Revisi hingga puas</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn-select-pkg outline"
              onClick={() => handleSelect('skripsi', 'premium')}
            >
              Pilih Paket Premium
            </button>
          </div>
        </div>

        {/* Bottom Banner Notice (Underneath the cards, NOT on the side) */}
        <div className="packages-bottom-notice-banner">
          <div className="notice-banner-text">
            <strong className="notice-highlight-title">Catatan Tarif:</strong>{' '}
            Harga dapat disesuaikan berdasarkan jumlah halaman riil, tingkat kesulitan teknis naskah, serta tenggat waktu (deadline).
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20konsultasi%20gratis%20mengenai%20paket%20layanan"
            target="_blank"
            rel="noopener noreferrer"
            className="notice-banner-btn"
          >
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
