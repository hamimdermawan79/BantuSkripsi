'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/data/faq';

export default function Faq() {
  const [activeId, setActiveId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header text-center">
          <span className="faq-badge-pill">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="faq-main-title">Pertanyaan yang Sering Diajukan</h2>
          <p className="faq-main-subtitle">
            Informasi lengkap dan transparan mengenai privasi dokumen, kesesuaian pedoman kampus, durasi kerja, dan garansi revisi.
          </p>
        </div>

        <div className="faq-accordion-wrap">
          {FAQ_ITEMS.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div key={item.id} className={`faq-card-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.question}</span>
                  <span className="faq-chevron-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div className="faq-collapse-body">
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Box at bottom */}
        <div className="faq-bottom-help-box">
          <div className="help-box-text">
            <h4>Punya pertanyaan khusus seputar format kampus atau deadline naskah Anda?</h4>
            <p>Konsultasikan langsung dengan tim editor kami tanpa komitmen. Respon ramah dalam hitungan menit.</p>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20tanya%20seputar%20layanan%20dan%20format%20dokumen"
            target="_blank"
            rel="noopener noreferrer"
            className="faq-wa-help-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Tanya Editor via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
