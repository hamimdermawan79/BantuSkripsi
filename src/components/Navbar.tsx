import React, { useState, useEffect, useRef } from 'react';

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 80);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${solid || isScrolled ? 'scrolled-glass' : 'transparent-hero'}${solid ? ' navbar-solid' : ''}`} ref={dropdownRef}>
      <div className="container nav-single-row">
        {/* Brand Logo: KawanNugas */}
        <a href="/" className="brand-logo" onClick={closeAll}>
          <div className="brand-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <div>
            <span className="brand-name">KawanNugas</span>
          </div>
        </a>

        {/* Single Line Desktop Navigation with Dropdowns */}
        <nav className="nav-desktop">
          <ul className="nav-menu">
            {/* Dropdown 1: Layanan */}
            <li className={`nav-item dropdown-item ${activeDropdown === 'layanan' ? 'open' : ''}`}>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => toggleDropdown('layanan')}
                aria-expanded={activeDropdown === 'layanan'}
              >
                <span>Layanan</span>
                <svg className="chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="dropdown-menu">
                <a href="/#layanan" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Jasa Rapikan Skripsi</div>
                  <div className="dropdown-link-sub">Margin, spasi, daftar isi otomatis & sitasi</div>
                </a>
                <a href="/#layanan" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Laporan Keuangan</div>
                  <div className="dropdown-link-sub">Laba rugi, neraca, arus kas & pajak</div>
                </a>
                <a href="/#layanan" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Laporan Kantoran</div>
                  <div className="dropdown-link-sub">Laporan kinerja, SOP & executive deck</div>
                </a>
                <a href="/#kalkulator" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Olah Data Statistik</div>
                  <div className="dropdown-link-sub">SPSS, SmartPLS, SEM AMOS, Python</div>
                </a>
              </div>
            </li>

            {/* Dropdown 2: Paket & Biaya */}
            <li className={`nav-item dropdown-item ${activeDropdown === 'paket' ? 'open' : ''}`}>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => toggleDropdown('paket')}
                aria-expanded={activeDropdown === 'paket'}
              >
                <span>Paket & Biaya</span>
                <svg className="chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="dropdown-menu">
                <a href="/#paket" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Paket Basic (Rp 75.000)</div>
                  <div className="dropdown-link-sub">Format tata letak & daftar isi otomatis</div>
                </a>
                <a href="/#paket" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Paket Standard (Rp 150.000)</div>
                  <div className="dropdown-link-sub">Lengkap dengan sitasi & rapikan tabel</div>
                </a>
                <a href="/#paket" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Paket Premium (Rp 250.000)</div>
                  <div className="dropdown-link-sub">Penyesuaian 100% pedoman kampus</div>
                </a>
                <a href="/#kalkulator" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Kalkulator Estimasi Biaya</div>
                  <div className="dropdown-link-sub">Hitung otomatis berdasarkan halaman & deadline</div>
                </a>
              </div>
            </li>

            {/* Dropdown 3: Panduan & Alur */}
            <li className={`nav-item dropdown-item ${activeDropdown === 'panduan' ? 'open' : ''}`}>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => toggleDropdown('panduan')}
                aria-expanded={activeDropdown === 'panduan'}
              >
                <span>Panduan</span>
                <svg className="chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="dropdown-menu">
                <a href="/perbandingan" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Perbandingan Sebelum vs Sesudah</div>
                  <div className="dropdown-link-sub">Lihat standar kerapian footnote, subbab, halaman & margin</div>
                </a>
                <a href="/#alur" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">5 Langkah Pemesanan</div>
                  <div className="dropdown-link-sub">Dari konsultasi hingga file final & garansi</div>
                </a>
                <a href="/#keunggulan" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">Kenapa Pilih Kami?</div>
                  <div className="dropdown-link-sub">Keunggulan & komitmen kerahasiaan naskah</div>
                </a>
                <a href="/#faq" className="dropdown-link" onClick={closeAll}>
                  <div className="dropdown-link-title">FAQ Pertanyaan Umum</div>
                  <div className="dropdown-link-sub">Keamanan data, format kampus & pembayaran</div>
                </a>
              </div>
            </li>

            {/* Direct Link */}
            <li className="nav-item">
              <a href="/#kalkulator" className="nav-link-single" onClick={closeAll}>
                Kalkulator
              </a>
            </li>

            <li className="nav-item">
              <a href="/#faq" className="nav-link-single" onClick={closeAll}>
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        {/* Right CTA Actions */}
        <div className="nav-actions">
          <a
            href="https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20konsultasi%20layanan%20dokumen"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-wa"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>Konsultasi WhatsApp</span>
          </a>

          {/* Mobile Toggle */}
          <button
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-group">
            <span className="mobile-drawer-label">Layanan</span>
            <a href="/#layanan" className="mobile-drawer-link" onClick={closeAll}>Jasa Rapikan Skripsi</a>
            <a href="/#layanan" className="mobile-drawer-link" onClick={closeAll}>Laporan Keuangan & Pajak</a>
            <a href="/#layanan" className="mobile-drawer-link" onClick={closeAll}>Laporan Kantoran & SOP</a>
            <a href="/#kalkulator" className="mobile-drawer-link" onClick={closeAll}>Olah Data Statistik</a>
          </div>
          <div className="mobile-drawer-group">
            <span className="mobile-drawer-label">Paket & Biaya</span>
            <a href="/#paket" className="mobile-drawer-link" onClick={closeAll}>Paket Layanan (Basic, Standard, Premium)</a>
            <a href="/#kalkulator" className="mobile-drawer-link" onClick={closeAll}>Kalkulator Biaya Interaktif</a>
          </div>
          <div className="mobile-drawer-group">
            <span className="mobile-drawer-label">Panduan</span>
            <a href="/perbandingan" className="mobile-drawer-link" onClick={closeAll}>Perbandingan Sebelum vs Sesudah</a>
            <a href="/#alur" className="mobile-drawer-link" onClick={closeAll}>Alur Pemesanan 5 Langkah</a>
            <a href="/#keunggulan" className="mobile-drawer-link" onClick={closeAll}>Kenapa Pilih Kami</a>
            <a href="/#faq" className="mobile-drawer-link" onClick={closeAll}>FAQ</a>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20konsultasi%20layanan%20dokumen"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-wa mobile-wa-btn"
            onClick={closeAll}
          >
            Konsultasi WhatsApp Sekarang
          </a>
        </div>
      )}
    </header>
  );
}
