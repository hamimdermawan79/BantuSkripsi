import React from 'react';

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box">
          <h2 className="cta-title">Skripsi Rapi, Percaya Diri Hadapi Sidang & Presentasi!</h2>
          <p className="cta-desc">
            Jangan biarkan format yang berantakan menghambat kelulusan atau kredibilitas kerja Anda. Konsultasikan draft dokumen Anda sekarang juga bersama tim profesional kami.
          </p>
          <div className="cta-actions">
            <a
              href="https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20konsultasi%20naskah%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa-green btn-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Konsultasi Gratis via WhatsApp
            </a>
            <a href="#kalkulator" className="btn btn-outline btn-lg">
              Hitung Biaya Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
