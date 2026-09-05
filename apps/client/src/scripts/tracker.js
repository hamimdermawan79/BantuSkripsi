import { getOrderTracking } from "./api.js";

export function initOrderTracker() {
  const form = document.getElementById("tracker-form");
  const input = document.getElementById("tracker-ref-input");
  const resultContainer = document.getElementById("tracker-result");
  const quickDemoBtns = document.querySelectorAll(".btn-demo-ref");

  if (!form || !input || !resultContainer) return;

  // Handle Quick Demo Buttons
  quickDemoBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-ref");
      if (code) {
        input.value = code;
        lookup(code);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = input.value.trim();
    if (!code) {
      alert("Silakan masukkan nomor referensi pesanan Anda.");
      return;
    }
    lookup(code);
  });

  async function lookup(refCode) {
    resultContainer.innerHTML = `
      <div class="tracker-result-card" style="text-align: center; padding: 2rem;">
        <p style="color: var(--color-text-subtle);">Mencari data pesanan ${refCode}...</p>
      </div>
    `;

    try {
      const res = await getOrderTracking(refCode);
      if (res.success && res.data) {
        renderOrderDetails(res.data);
      }
    } catch (err) {
      resultContainer.innerHTML = `
        <div class="tracker-result-card" style="border-left: 4px solid #ef4444;">
          <p style="color: #b91c1c; font-weight: 700; margin-bottom: 4px;">Pencarian Tidak Ditemukan</p>
          <p style="color: var(--color-text-muted); font-size: 0.875rem;">${err.message}</p>
        </div>
      `;
    }
  }

  function renderOrderDetails(order) {
    const historyHtml = order.statusHistory?.map(item => `
      <li class="tracker-timeline-item">
        <div class="tracker-dot ${item.done ? 'done' : ''}">
          ${item.done ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>` : ''}
        </div>
        <div class="tracker-info">
          <div class="tracker-info-step" style="${item.done ? 'color: var(--color-brand-primary); font-weight: 700;' : 'color: var(--color-text-subtle);'}">${item.step}</div>
          <div class="tracker-info-time">${item.time}</div>
        </div>
      </li>
    `).join('') || '';

    resultContainer.innerHTML = `
      <div class="tracker-result-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <div>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-subtle); text-transform: uppercase;">Nomor Referensi</span>
            <div style="font-family: var(--font-mono); font-size: 1.125rem; font-weight: 800; color: var(--color-brand-primary);">${order.referenceCode}</div>
          </div>
          <div style="text-align: right;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-subtle); text-transform: uppercase;">Status Pengerjaan</span>
            <div style="font-weight: 700; color: var(--color-brand-secondary);">${order.statusLabel}</div>
          </div>
        </div>

        <div class="tracker-meta-grid">
          <div class="tracker-meta-item">
            <span>Nama Pemesan</span>
            <strong>${order.studentName}</strong>
          </div>
          <div class="tracker-meta-item">
            <span>Perguruan Tinggi</span>
            <strong>${order.campusName}</strong>
          </div>
          <div class="tracker-meta-item">
            <span>Paket Layanan</span>
            <strong>${order.packageName} (${order.pageCount} Hal)</strong>
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-subtle); text-transform: uppercase; display: block; margin-bottom: 0.75rem;">Timeline Perkembangan</span>
          <ul class="tracker-timeline">
            ${historyHtml}
          </ul>
        </div>
      </div>
    `;
  }
}
