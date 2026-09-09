import React, { useState, useEffect } from 'react';
import { PRICING_DATA, SPEED_OPTIONS, ADD_ON_OPTIONS, calculatePrice, formatRupiah, buildWhatsAppLink } from '@/data/pricing';
import { ServiceCategoryKey, SpeedKey } from '@/types/calculator';

interface CalculatorProps {
  selectedCategory?: ServiceCategoryKey;
  selectedServiceId?: string;
}

export default function Calculator({ selectedCategory = 'skripsi', selectedServiceId }: CalculatorProps) {
  const [category, setCategory] = useState<ServiceCategoryKey>(selectedCategory);
  const [serviceId, setServiceId] = useState<string>(
    selectedServiceId || PRICING_DATA[selectedCategory].services[0].id
  );
  const [volume, setVolume] = useState<number>(PRICING_DATA[selectedCategory].volumeDefault);
  const [speed, setSpeed] = useState<SpeedKey>('regular');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync when selectedCategory / selectedServiceId prop updates
  useEffect(() => {
    if (selectedCategory && selectedCategory !== category) {
      setCategory(selectedCategory);
      const catData = PRICING_DATA[selectedCategory];
      setServiceId(selectedServiceId || catData.services[0].id);
      setVolume(catData.volumeDefault);
      setSelectedAddons([]);
    } else if (selectedServiceId && selectedServiceId !== serviceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedCategory, selectedServiceId]);

  const currentCategoryData = PRICING_DATA[category];

  // Handle category switch
  const handleCategorySwitch = (newCat: ServiceCategoryKey) => {
    setCategory(newCat);
    const catData = PRICING_DATA[newCat];
    setServiceId(catData.services[0].id);
    setVolume(catData.volumeDefault);
    setSelectedAddons([]);
  };

  // Toggle addon checkbox
  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate realtime breakdown
  const calculation = calculatePrice(category, serviceId, volume, speed, selectedAddons);
  const waLink = buildWhatsAppLink(calculation);

  // Copy quote to clipboard
  const handleCopyQuote = () => {
    const quoteText = `Estimasi Biaya - KawanNugas:
- Kategori: ${calculation.categoryData.name}
- Layanan: ${calculation.service.name}
- Volume: ${volume} ${calculation.categoryData.volumeUnit}
- Deadline: ${calculation.speed.name}
- Total Estimasi: ${formatRupiah(calculation.grandTotal)}
(Biaya dapat disesuaikan kembali setelah peninjauan file naskah)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(quoteText).then(() => {
        showToast('Ringkasan estimasi berhasil disalin ke clipboard!');
      }).catch(() => {
        showToast('Gagal menyalin ringkasan.');
      });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const availableAddons = ADD_ON_OPTIONS.filter((addon) =>
    addon.applicableTo.includes(category)
  );

  return (
    <section className="calc-poster-section" id="kalkulator">
      <div className="container">
        {/* Section Header - De-verbosed & Crisp */}
        <div className="calc-header text-center">
          <span className="calc-badge-tag">KALKULATOR BIAYA</span>
          <h2 className="calc-header-title">Hitung Estimasi Biaya & Durasi Pengerjaan</h2>
          <p className="calc-header-desc">
            Dapatkan rincian tarif transparan untuk naskah skripsi, laporan keuangan, maupun laporan kantoran.
          </p>
        </div>

        <div className="calc-card">
          <div className="calc-grid">
            {/* Left Column: Form Controls */}
            <div className="calc-inputs-pane">
              {/* 1. Kategori Dokumen */}
              <div className="calc-form-group">
                <label className="calc-label">Kategori Dokumen</label>
                <div className="segmented-control">
                  <button
                    type="button"
                    className={`segment-btn ${category === 'skripsi' ? 'active' : ''}`}
                    onClick={() => handleCategorySwitch('skripsi')}
                  >
                    Skripsi & Tesis
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${category === 'keuangan' ? 'active' : ''}`}
                    onClick={() => handleCategorySwitch('keuangan')}
                  >
                    Laporan Keuangan
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${category === 'kantoran' ? 'active' : ''}`}
                    onClick={() => handleCategorySwitch('kantoran')}
                  >
                    Laporan Kantoran
                  </button>
                </div>
              </div>

              {/* 2. Pilihan Paket */}
              <div className="calc-form-group">
                <label className="calc-label" htmlFor="calcServiceSelect">
                  Pilihan Paket Pengerjaan
                </label>
                <select
                  id="calcServiceSelect"
                  className="calc-select"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  {currentCategoryData.services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} - mulai {formatRupiah(srv.basePrice)}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Jumlah Halaman / Volume Slider */}
              <div className="calc-form-group">
                <div className="slider-header">
                  <label className="calc-label">{currentCategoryData.volumeLabel}</label>
                  <span className="slider-live-value">
                    {volume} {currentCategoryData.volumeUnit}
                  </span>
                </div>
                <input
                  type="range"
                  className="calc-range"
                  min={currentCategoryData.volumeMin}
                  max={currentCategoryData.volumeMax}
                  step={currentCategoryData.volumeStep}
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                />
                <div className="slider-caption-row">
                  <span className="slider-caption">
                    Geser untuk menyesuaikan jumlah total {currentCategoryData.volumeUnit.toLowerCase()} dokumen Anda.
                  </span>
                  <div className="slider-quick-chips">
                    {category === 'skripsi' && [20, 50, 100, 150].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`chip-btn ${volume === num ? 'active' : ''}`}
                        onClick={() => setVolume(num)}
                      >
                        {num} Hal
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Tingkat Urgensi */}
              <div className="calc-form-group">
                <label className="calc-label">Tingkat Urgensi (Tenggat Waktu)</label>
                <div className="radio-cards-grid">
                  {(Object.keys(SPEED_OPTIONS) as SpeedKey[]).map((key) => {
                    const sp = SPEED_OPTIONS[key];
                    const isSelected = speed === key;
                    return (
                      <label
                        key={key}
                        className={`radio-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSpeed(key)}
                      >
                        <input
                          type="radio"
                          name="calcSpeed"
                          value={key}
                          checked={isSelected}
                          onChange={() => setSpeed(key)}
                        />
                        <div className="radio-card-header">
                          <span className="radio-dot" />
                          <span className="radio-title">{sp.label}</span>
                          <span className="radio-badge">{sp.badgeText}</span>
                        </div>
                        <span className="radio-desc">{sp.name.split(' (')[1]?.replace(')', '')}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 5. Layanan Tambahan */}
              <div className="calc-form-group">
                <label className="calc-label">Layanan Tambahan (Opsional)</label>
                <div className="addons-stack">
                  {availableAddons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <label key={addon.id} className={`addon-checkbox-card ${isChecked ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleAddonToggle(addon.id)}
                        />
                        <span className="addon-title">{addon.name}</span>
                        <span className="addon-price">+{formatRupiah(addon.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Clean Dark Summary Card (Matching Reference Screenshot) */}
            <div className="calc-summary-pane">
              <div className="summary-navy-card">
                <h3 className="summary-navy-title">RINGKASAN ESTIMASI</h3>

                <div className="summary-navy-rows">
                  <div className="navy-row">
                    <span className="navy-lbl">Paket Dasar</span>
                    <span className="navy-val">{formatRupiah(calculation.basePrice)}</span>
                  </div>
                  <div className="navy-row">
                    <span className="navy-lbl">Penyesuaian Halaman</span>
                    <span className="navy-val">{formatRupiah(calculation.volumeAdjustment)}</span>
                  </div>
                  <div className="navy-row">
                    <span className="navy-lbl">Biaya Urgensi Waktu</span>
                    <span className="navy-val">{formatRupiah(calculation.speedSurcharge)}</span>
                  </div>
                  <div className="navy-row">
                    <span className="navy-lbl">Layanan Tambahan</span>
                    <span className="navy-val">{formatRupiah(calculation.addonsTotal)}</span>
                  </div>
                </div>

                <div className="navy-divider" />

                <div className="navy-eta-block">
                  <span className="eta-lbl">ESTIMASI WAKTU SELESAI:</span>
                  <span className="eta-val">{calculation.speed.name.split(' (')[1]?.replace(')', '') || calculation.speed.name}</span>
                </div>

                <div className="navy-divider" />

                <div className="navy-total-block">
                  <span className="navy-total-lbl">TOTAL PERKIRAAN BIAYA</span>
                  <div className="navy-total-amount">{formatRupiah(calculation.grandTotal)}</div>
                </div>

                <div className="summary-navy-actions">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-navy-order"
                  >
                    Pesan / Ajukan Konsultasi
                  </a>

                  <button
                    type="button"
                    className="btn-navy-copy"
                    onClick={handleCopyQuote}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Salin Rincian Estimasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notice */}
      <div className={`toast-notice ${toastMessage ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </section>
  );
}
