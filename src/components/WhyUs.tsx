'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WhyUs() {
  const whyChooseUsList = [
    {
      title: "Dikerjakan Tim Berpengalaman",
      desc: "Didukung editor naskah pascasarjana dan praktisi akuntansi yang terbiasa menangani standar dokumen ketat."
    },
    {
      title: "100% Menjaga Substansi & Isi",
      desc: "Fokus kami murni merapikan tata letak, margin, dan format baku tanpa pernah mengubah ide riset Anda."
    },
    {
      title: "Pemeriksaan Teliti Per Halaman",
      desc: "Bukan sekadar perapian otomatis; setiap alinea, heading, tabel, dan sitasi dicek manual satu per satu."
    },
    {
      title: "Komitmen Deadline Pasti",
      desc: "Kami memahami pentingnya jadwal sidang atau rapat kantor. Naskah diserahkan tepat waktu sesuai kesepakatan."
    },
    {
      title: "Revisi Terpandu Hingga Lolos",
      desc: "Jika terdapat catatan perbaikan dari dosen pembimbing atau pimpinan, tim kami siap merevisi dengan cepat."
    },
    {
      title: "Data Terjaga Aman & Rahasia",
      desc: "Jaminan kerahasiaan penuh (NDA). Dokumen riset maupun laporan keuangan tidak akan dipublikasikan ke pihak ketiga."
    }
  ];

  return (
    <section className="why-us-section" id="keunggulan">
      <div className="container">
        {/* Clean Header: No badge */}
        <motion.div
          className="why-us-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="why-us-title">
            Ketenangan & Kepastian Kualitas untuk Dokumen Anda
          </h2>
          <p className="why-us-subtitle">
            Kami bekerja dengan ketelitian tinggi agar Anda dapat fokus menghadapi sidang maupun presentasi direksi dengan percaya diri.
          </p>
        </motion.div>

        {/* 6 Core Pillars Grid */}
        <div className="why-us-pillars-grid">
          {whyChooseUsList.map((reason, idx) => (
            <motion.div
              key={idx}
              className="why-pillar-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="pillar-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="pillar-content">
                <h3 className="pillar-title">{reason.title}</h3>
                <p className="pillar-desc">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Executive Quote Bar */}
        <motion.div
          className="executive-quote-bar"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="quote-icon-decor">&ldquo;</span>
          <p className="quote-main-statement">
            Fokus ke riset dan pekerjaan Anda, biar tim KawanNugas yang merapikan dokumennya hingga sempurna!
          </p>
          <span className="quote-icon-decor">&rdquo;</span>
        </motion.div>

        {/* Bonus Eksklusif Luxury Banner */}
        <motion.div
          className="bonus-luxury-banner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
        >
          <div className="bonus-banner-header">
            <h3 className="bonus-banner-title">Bonus Tambahan Gratis di Setiap Pemesanan</h3>
            <p className="bonus-banner-sub">Fasilitas ekstra untuk memastikan kesiapan dan keamanan naskah Anda sebelum diajukan ke penguji.</p>
          </div>

          <div className="bonus-perks-grid">
            <div className="bonus-perk-item">
              <div className="perk-number">01</div>
              <div className="perk-details">
                <h4 className="perk-name">Preview Pengecekan Plagiarisme</h4>
                <p className="perk-desc">Pemeriksaan similarity index dasar Turnitin / Grammarly untuk menjamin keamanan naskah sebelum uji.</p>
              </div>
            </div>

            <div className="bonus-perk-item">
              <div className="perk-number">02</div>
              <div className="perk-details">
                <h4 className="perk-name">File Master Word (.docx) & PDF Siap Cetak</h4>
                <p className="perk-desc">Anda menerima dokumen Word dengan styles tertata rapi serta file PDF berformat baku siap cetak jilid.</p>
              </div>
            </div>

            <div className="bonus-perk-item">
              <div className="perk-number">03</div>
              <div className="perk-details">
                <h4 className="perk-name">Jaminan Hak Cipta 100% Milik Klien</h4>
                <p className="perk-desc">Data riset, karya ilmiah, dan dokumen bisnis Anda terlindungi kerahasiaannya dengan komitmen NDA.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
