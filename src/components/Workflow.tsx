import React from 'react';

export default function Workflow() {
  const steps = [
    {
      num: 1,
      title: "Konsultasi",
      desc: "Kirim file & pedoman kampus Anda.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      )
    },
    {
      num: 2,
      title: "Penawaran",
      desc: "Kami cek & memberikan estimasi harga.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      )
    },
    {
      num: 3,
      title: "Pembayaran",
      desc: "Setelah deal, lakukan pembayaran.",
      icon: (
        <span style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'sans-serif' }}>Rp</span>
      )
    },
    {
      num: 4,
      title: "Proses Pengerjaan",
      desc: "Kami kerjakan sesuai kesepakatan.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="20" x2="22" y2="20"></line>
        </svg>
      )
    },
    {
      num: 5,
      title: "Selesai & Revisi",
      desc: "File dikirim, revisi hingga Anda puas.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="9 12 12 15 16 10"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section className="workflow-poster-section" id="alur">
      <div className="container">
        {/* Banner Heading */}
        <div className="poster-section-header">
          <div className="poster-banner-heading">
            ALUR PEMESANAN
          </div>
        </div>

        <div className="workflow-poster-card">
          <div className="workflow-linear-track">
            {steps.map((st, idx) => (
              <React.Fragment key={st.num}>
                <div className="workflow-step-node">
                  <div className="step-circle-icon">
                    {st.icon}
                  </div>
                  <h4 className="step-node-title">{st.num}. {st.title}</h4>
                  <p className="step-node-desc">{st.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="step-connector-arrow">
                    <span className="dashed-line" />
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
