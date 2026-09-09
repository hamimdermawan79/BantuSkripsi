import React from 'react';

export default function Footer() {
  return (
    <footer className="pro-footer" id="kontak">
      <div className="container">
        {/* Top 4-Column Grid */}
        <div className="pro-footer-grid">
          {/* Column 1: Brand & Identity */}
          <div className="footer-col brand-col">
            <a href="/" className="footer-brand-link">
              <div className="footer-logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className="footer-brand-title-wrap">
                <span className="footer-brand-name">KawanNugas</span>
                <span className="footer-brand-tagline">JASA PENATAAN DOKUMEN</span>
              </div>
            </a>

            <p className="footer-col-desc">
              Platform layanan profesional perapian format naskah skripsi, tesis, laporan keuangan, dan administrasi kantor. Teliti, terstandar, dan bergaransi kerahasiaan 100%.
            </p>

            <div className="footer-social-row">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="WhatsApp KawanNugas"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>

              <a
                href="https://instagram.com/kawannugas"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram KawanNugas"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="mailto:kawannugas@gmail.com"
                className="footer-social-btn"
                aria-label="Email KawanNugas"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigasi Halaman */}
          <div className="footer-col nav-col">
            <h4 className="footer-col-title">NAVIGASI</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/">Beranda Utama</a>
              </li>
              <li>
                <a href="/#layanan">Layanan Dokumen</a>
              </li>
              <li>
                <a href="/perbandingan">Standar Dokumen & Draf</a>
              </li>
              <li>
                <a href="/#paket">Pilihan Paket & Tarif</a>
              </li>
              <li>
                <a href="/#kalkulator">Kalkulator Biaya</a>
              </li>
              <li>
                <a href="/#alur">Alur Pengerjaan</a>
              </li>
              <li>
                <a href="/#faq">Pertanyaan Umum (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Cakupan Layanan Spesialis */}
          <div className="footer-col services-col">
            <h4 className="footer-col-title">LAYANAN SPESIALIS</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/#layanan">Format Skripsi & Tesis S1/S2</a>
              </li>
              <li>
                <a href="/#layanan">Footnote & Sitasi APA / IEEE</a>
              </li>
              <li>
                <a href="/#layanan">Daftar Isi & Tabel Otomatis</a>
              </li>
              <li>
                <a href="/#layanan">Preview Turnitin & Grammarly</a>
              </li>
              <li>
                <a href="/#layanan">Neraca & Laporan Laba Rugi</a>
              </li>
              <li>
                <a href="/#layanan">Penyusunan Dokumen SOP Kerja</a>
              </li>
              <li>
                <a href="/#layanan">Executive Pitch Deck & PPT</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Jaminan Mutu */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">KONTAK & KONSULTASI</h4>
            <ul className="footer-contact-details">
              <li className="contact-detail-item">
                <span className="contact-item-label">WhatsApp Hotline:</span>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20konsultasi%20dokumen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-direct-link highlight"
                >
                  0812-3456-7890
                </a>
              </li>
              <li className="contact-detail-item">
                <span className="contact-item-label">Email Korespondensi:</span>
                <a href="mailto:kawannugas@gmail.com" className="contact-direct-link">
                  kawannugas@gmail.com
                </a>
              </li>
              <li className="contact-detail-item">
                <span className="contact-item-label">Media Sosial:</span>
                <a
                  href="https://instagram.com/kawannugas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-direct-link"
                >
                  @kawannugas (Instagram)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Navigation */}
        <div className="pro-footer-bottom">
          <p className="footer-copyright-text">
            &copy; {new Date().getFullYear()} <strong>KawanNugas</strong>. Seluruh hak cipta dilindungi undang-undang.
          </p>

          <div className="footer-legal-links">
            <a href="/perbandingan">Panduan Format</a>
            <span className="legal-dot-divider">•</span>
            <a href="/#keunggulan">Kebijakan Privasi</a>
            <span className="legal-dot-divider">•</span>
            <a href="/#faq">Garansi Revisi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
