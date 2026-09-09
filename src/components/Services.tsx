'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCategoryKey } from '@/types/calculator';

interface ServicesProps {
  onSelectService?: (category: ServiceCategoryKey, serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryKey>('skripsi');

  const handleJumpToCalc = (cat: ServiceCategoryKey, srvId: string) => {
    if (onSelectService) {
      onSelectService(cat, srvId);
    }
    const calcEl = document.getElementById('kalkulator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6 perfectly balanced pillars for Skripsi & Akademik (3x2 grid)
  const skripsiServices = [
    {
      id: 'basic',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      title: "Koreksi Margin & Tata Letak Baku",
      desc: "Menata batas kertas 4-4-3-3 cm presisi jilid, spasi 1.5 konsisten, jenis font resmi, alinea 1.27 cm, dan teks rata kanan-kiri (Justified)."
    },
    {
      id: 'standard',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      ),
      title: "Daftar Isi, Tabel & Gambar Otomatis",
      desc: "Pembuatan Table of Contents, daftar tabel, daftar gambar, dan daftar lampiran otomatis yang tersinkronisasi presisi dengan halaman naskah."
    },
    {
      id: 'standard',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
      title: "Sitasi & Daftar Pustaka Standar",
      desc: "Standardisasi kutipan dan daftar pustaka format APA 7th, IEEE, Harvard, Chicago, atau sinkronisasi tool sitasi Mendeley & Zotero."
    },
    {
      id: 'standard',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="9" x2="20" y2="9"></line>
          <line x1="4" y1="15" x2="20" y2="15"></line>
          <line x1="10" y1="3" x2="8" y2="21"></line>
          <line x1="16" y1="3" x2="14" y2="21"></line>
        </svg>
      ),
      title: "Penomoran Halaman Bertingkat",
      desc: "Pemisahan Section Break: romawi kecil (i, ii) untuk kata pengantar & daftar isi, serta nomor latin (1, 2) dengan fitur Different First Page."
    },
    {
      id: 'premium',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="m9 14 2 2 4-4"></path>
        </svg>
      ),
      title: "Hierarki Subbab & Heading Styles",
      desc: "Pengaturan berjenjang Heading 1 (BAB), Heading 2 (A., B.), Heading 3 (1., 2.), dan sub-level tersinkronisasi di Word Navigation Pane."
    },
    {
      id: 'premium',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      title: "Penyesuaian 100% Pedoman Kampus",
      desc: "Penyesuaian tata tulis menyeluruh mengikuti buku panduan skripsi universitas/fakultas Anda, siap diuji dalam sidang skripsi."
    }
  ];

  const keuanganServices = [
    {
      id: 'bulanan',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      title: "Laporan Laba Rugi & Arus Kas",
      desc: "Penyusunan cashflow kas masuk-keluar, omset, Harga Pokok Penjualan (HPP), serta laba bersih operasional bulanan & tahunan."
    },
    {
      id: 'tahunan',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      title: "Neraca Keuangan SAK EMKM / PSAK",
      desc: "Penyusunan posisi aktiva dan pasiva balance, rapi, dan terverifikasi untuk perbankan, tender, atau laporan pertanggungjawaban."
    },
    {
      id: 'pajak',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      ),
      title: "Rekonsiliasi Bank & Rekap Pajak",
      desc: "Pencocokan rekening koran bank dengan buku kas internal serta penyusunan rekapitulasi pelaporan SPT Masa dan Tahunan."
    }
  ];

  const kantoranServices = [
    {
      id: 'evaluasi',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      title: "Laporan Kinerja Divisi & KPI",
      desc: "Penyusunan format laporan bulanan eksekutif, rekapitulasi progres pekerjaan tim, dan evaluasi pencapaian target KPI divisi."
    },
    {
      id: 'sop',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      ),
      title: "SOP & Flowchart Alur Kerja",
      desc: "Penyusunan dokumen Standard Operating Procedure (SOP) terstruktur dengan diagram flowchart alur kerja resmi dan profesional."
    },
    {
      id: 'deck',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: "Executive Deck & Presentasi PPT",
      desc: "Perancangan slide presentasi dewan direksi, rapat pimpinan, atau pitch investor dengan gaya visual infografis yang komunikatif."
    }
  ];

  return (
    <section className="services-section" id="layanan">
      <div className="container">
        {/* Clean Header: No badge */}
        <div className="services-header text-center">
          <h2 className="services-title">
            Layanan Penataan Dokumen Profesional
          </h2>
          <p className="services-subtitle">
            Pilih kategori dokumen Anda di bawah untuk melihat rincian standar penataan teknis, kelengkapan berkas, dan jaminan mutu yang kami sediakan.
          </p>
        </div>

        {/* Category Segmented Tabs */}
        <div className="services-tabs-container">
          <div className="services-tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'skripsi'}
              className={`service-tab-btn ${activeCategory === 'skripsi' ? 'active' : ''}`}
              onClick={() => setActiveCategory('skripsi')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              <span>Format Skripsi & Akademik</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'keuangan'}
              className={`service-tab-btn ${activeCategory === 'keuangan' ? 'active' : ''}`}
              onClick={() => setActiveCategory('keuangan')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span>Laporan Keuangan & Pajak</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'kantoran'}
              className={`service-tab-btn ${activeCategory === 'kantoran' ? 'active' : ''}`}
              onClick={() => setActiveCategory('kantoran')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>Laporan Kantoran & SOP</span>
            </button>
          </div>
        </div>

        {/* Service Cards Grid with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className={`services-cards-grid ${activeCategory === 'skripsi' ? 'grid-skripsi-6' : 'grid-business-3'}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeCategory === 'skripsi' &&
              skripsiServices.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="service-premium-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="service-icon-wrap">{item.icon}</div>
                  <h3 className="service-card-title">{item.title}</h3>
                  <p className="service-card-desc">{item.desc}</p>
                </motion.div>
              ))}

            {activeCategory === 'keuangan' &&
              keuanganServices.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="service-premium-card card-featured-wide"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="service-icon-wrap">{item.icon}</div>
                  <h3 className="service-card-title">{item.title}</h3>
                  <p className="service-card-desc">{item.desc}</p>
                </motion.div>
              ))}

            {activeCategory === 'kantoran' &&
              kantoranServices.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="service-premium-card card-featured-wide"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="service-icon-wrap">{item.icon}</div>
                  <h3 className="service-card-title">{item.title}</h3>
                  <p className="service-card-desc">{item.desc}</p>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Center-Aligned Bottom Action Card */}
        <motion.div
          className="services-action-banner text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="action-banner-text">
            <h4>Butuh estimasi biaya untuk naskah Anda?</h4>
            <p>Gunakan kalkulator biaya otomatis atau konsultasikan langsung berkas naskah Anda bersama tim editor kami.</p>
          </div>

          <div className="action-banner-buttons">
            <motion.button
              type="button"
              className="btn-services-calc"
              onClick={() => handleJumpToCalc(activeCategory, 'standard')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                <line x1="8" y1="6" x2="16" y2="6"></line>
                <line x1="16" y1="14" x2="16" y2="18"></line>
                <path d="M16 10h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M8 10h.01"></path>
              </svg>
              <span>Hitung Biaya Otomatis</span>
            </motion.button>

            <motion.a
              href={`https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20konsultasi%20layanan%20${activeCategory === 'skripsi' ? 'skripsi' : activeCategory === 'keuangan' ? 'keuangan' : 'kantoran'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-services-wa"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>Konsultasi WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
