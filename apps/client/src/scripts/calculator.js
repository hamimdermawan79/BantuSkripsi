import { postEstimatePrice } from "./api.js";

export class PriceCalculator {
  constructor({
    docTypeSelectId = "calc-doc-type",
    pageInputId = "calc-pages",
    pageDisplayId = "calc-pages-val",
    packageSelectId = "calc-package",
    urgencySelectId = "calc-urgency",
    addonCheckboxesName = "calc-addon",
    breakdownBaseId = "calc-out-base",
    breakdownPagesId = "calc-out-pages",
    breakdownUrgencyId = "calc-out-urgency",
    breakdownAddonsId = "calc-out-addons",
    totalPriceId = "calc-out-total",
    completionTextId = "calc-out-time",
    orderBtnId = "calc-btn-order"
  } = {}) {
    this.docTypeSelect = document.getElementById(docTypeSelectId);
    this.pageInput = document.getElementById(pageInputId);
    this.pageDisplay = document.getElementById(pageDisplayId);
    this.packageSelect = document.getElementById(packageSelectId);
    this.urgencySelect = document.getElementById(urgencySelectId);
    this.addonName = addonCheckboxesName;
    
    this.breakdownBase = document.getElementById(breakdownBaseId);
    this.breakdownPages = document.getElementById(breakdownPagesId);
    this.breakdownUrgency = document.getElementById(breakdownUrgencyId);
    this.breakdownAddons = document.getElementById(breakdownAddonsId);
    this.totalPrice = document.getElementById(totalPriceId);
    this.completionText = document.getElementById(completionTextId);
    this.orderBtn = document.getElementById(orderBtnId);

    this.currentEstimate = null;
    this.init();
  }

  init() {
    if (!this.pageInput) return;

    if (this.docTypeSelect) {
      this.docTypeSelect.addEventListener("change", () => this.recalculate());
    }

    this.pageInput.addEventListener("input", (e) => {
      if (this.pageDisplay) {
        this.pageDisplay.textContent = `${e.target.value} Halaman`;
      }
      this.recalculate();
    });

    if (this.packageSelect) {
      this.packageSelect.addEventListener("change", () => this.recalculate());
    }

    if (this.urgencySelect) {
      this.urgencySelect.addEventListener("change", () => this.recalculate());
    }

    document.querySelectorAll(`input[name="${this.addonName}"]`).forEach(el => {
      el.addEventListener("change", () => this.recalculate());
    });

    // Initial calculation
    this.recalculate();
  }

  getSelectedAddons() {
    const checked = document.querySelectorAll(`input[name="${this.addonName}"]:checked`);
    return Array.from(checked).map(el => el.value);
  }

  async recalculate() {
    const docType = this.docTypeSelect?.value || "skripsi";
    const pageCount = parseInt(this.pageInput?.value || 60, 10);
    const packageId = this.packageSelect?.value || "standard";
    const urgency = this.urgencySelect?.value || "regular";
    const selectedAddons = this.getSelectedAddons();

    try {
      const res = await postEstimatePrice({
        docType,
        packageId,
        pageCount,
        urgency,
        selectedAddons
      });

      if (res && res.success) {
        this.updateUI(res.data);
        return;
      }
    } catch (err) {
      // Fallback
    }

    this.calculateLocalFallback(docType, packageId, pageCount, urgency, selectedAddons);
  }

  calculateLocalFallback(docType, packageId, pageCount, urgency, selectedAddons) {
    let basePrices = { basic: 75000, standard: 150000, premium: 250000 };
    let basePages = { basic: 50, standard: 75, premium: 100 };
    let rates = { basic: 1200, standard: 1500, premium: 1800 };

    if (docType === "laporan_keuangan" || docType === "laporan_kontraktor") {
      basePrices = { basic: 125000, standard: 225000, premium: 350000 };
      rates = { basic: 1800, standard: 2200, premium: 2800 };
    } else if (docType === "laporan_rutin") {
      basePrices = { basic: 95000, standard: 175000, premium: 275000 };
      rates = { basic: 1400, standard: 1700, premium: 2000 };
    }

    const base = basePrices[packageId] || 150000;
    const threshold = basePages[packageId] || 75;
    const extraPages = Math.max(0, pageCount - threshold);
    const extraFee = extraPages * (rates[packageId] || 1500);

    let urgencyFee = 0;
    if (urgency === "fast") urgencyFee = Math.round((base + extraFee) * 0.25) + 35000;
    if (urgency === "express") urgencyFee = Math.round((base + extraFee) * 0.6) + 75000;

    let addonsFee = 0;
    const addonPrices = { mendeley_sync: 30000, lampiran_heavy: 25000, turnitin_report: 35000 };
    selectedAddons.forEach(id => {
      addonsFee += (addonPrices[id] || 0);
    });

    const total = base + extraFee + urgencyFee + addonsFee;
    const formatRp = (n) => `Rp${n.toLocaleString("id-ID")}`;

    this.updateUI({
      breakdown: {
        basePriceFormatted: formatRp(base),
        extraPageFeeFormatted: formatRp(extraFee),
        urgencyFeeFormatted: formatRp(urgencyFee),
        addonsTotalFormatted: formatRp(addonsFee)
      },
      totalPriceFormatted: formatRp(total),
      estimatedCompletionText: urgency === "express" ? "1 hari kerja" : urgency === "fast" ? "1 - 2 hari kerja" : "3 - 5 hari kerja"
    });
  }

  updateUI(data) {
    this.currentEstimate = data;

    if (this.breakdownBase) this.breakdownBase.textContent = data.breakdown.basePriceFormatted;
    if (this.breakdownPages) this.breakdownPages.textContent = data.breakdown.extraPageFeeFormatted;
    if (this.breakdownUrgency) this.breakdownUrgency.textContent = data.breakdown.urgencyFeeFormatted;
    if (this.breakdownAddons) this.breakdownAddons.textContent = data.breakdown.addonsTotalFormatted;
    if (this.totalPrice) this.totalPrice.textContent = data.totalPriceFormatted;
    if (this.completionText) this.completionText.textContent = data.estimatedCompletionText;
  }

  getCurrentState() {
    return {
      docType: this.docTypeSelect?.value || "skripsi",
      packageId: this.packageSelect?.value || "standard",
      pageCount: parseInt(this.pageInput?.value || 60, 10),
      urgency: this.urgencySelect?.value || "regular",
      selectedAddons: this.getSelectedAddons(),
      estimate: this.currentEstimate
    };
  }

  setPackage(pkgId) {
    if (this.packageSelect) {
      this.packageSelect.value = pkgId;
      this.recalculate();
    }
  }
}
