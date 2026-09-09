'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Parallax offsets for background, content, and illustration
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section className="hero-poster-section" ref={heroRef}>
      {/* Background canvas with Parallax */}
      <motion.div
        className="hero-bg-canvas"
        style={{ y: bgY }}
      />

      <div className="hero-poster-grid">
        {/* Left Column: Title, Subtitle, and Compact CTAs */}
        <motion.div
          className="hero-poster-content"
          style={{ y: contentY, opacity }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className="hero-poster-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            JASA<br />
            <span>RAPIKAN SKRIPSI</span>
          </motion.h1>

          <div className="hero-poster-subwrap">
            <motion.p
              className="hero-poster-subtitle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Rapi Formatnya, Siap Ujian & Sidang!
            </motion.p>
            <motion.div
              className="hero-brush-stroke-wrap"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              style={{ originX: 0 }}
            >
              <svg viewBox="0 0 320 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="brush-stroke-svg" preserveAspectRatio="none">
                <path d="M3 13C45 5.5 125 4 195 6C245 7.5 285 11 316 13.5C280 16 220 14.8 150 12.8C80 10.8 30 13.5 3 13Z" fill="#FBBF24" fillOpacity="0.85" />
                <path d="M12 10C70 4 160 5 235 7.5C275 9 298 11.5 308 12C278 13.5 218 12 145 10C85 8.5 38 10 12 10Z" fill="#EAB308" />
              </svg>
            </motion.div>
          </div>

          {/* Action CTAs: Refined Compact Size */}
          <motion.div
            className="hero-poster-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="https://wa.me/6281234567890?text=Halo%20KawanNugas,%20saya%20ingin%20konsultasi%20rapikan%20skripsi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-wa"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>Konsultasi WhatsApp</span>
            </motion.a>

            <motion.a
              href="#kalkulator"
              className="btn-hero-calc"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                <line x1="8" y1="6" x2="16" y2="6"></line>
                <line x1="16" y1="14" x2="16" y2="18"></line>
                <path d="M16 10h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M8 10h.01"></path>
              </svg>
              <span>Hitung Estimasi Biaya</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Illustration (Vertical: center, Horizontal: right edge, Parallax + Float) */}
        <motion.div
          className="hero-poster-visual"
          style={{ y: visualY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="illustration-wrapper"
            animate={{
              y: [-6, 6, -6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src="/assets/hero-illustration.webp"
              alt="Ilustrasi Buku Skripsi dan Dokumen Rapi - KawanNugas"
              width={1080}
              height={681}
              className="hero-illustration-img"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
