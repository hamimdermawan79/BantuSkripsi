import { postConsultation } from "./api.js";

export class OrderFlowModal {
  constructor({
    modalId = "order-modal",
    openTriggers = ".btn-consult-trigger",
    closeBtnId = "modal-close-btn",
    formId = "order-consult-form",
    resultViewId = "order-success-view",
    refCodeDisplayId = "modal-ref-code",
    waDirectBtnId = "modal-wa-direct-btn",
    calculatorInstance = null
  } = {}) {
    this.modal = document.getElementById(modalId);
    this.closeBtn = document.getElementById(closeBtnId);
    this.form = document.getElementById(formId);
    this.resultView = document.getElementById(resultViewId);
    this.refCodeDisplay = document.getElementById(refCodeDisplayId);
    this.waDirectBtn = document.getElementById(waDirectBtnId);
    this.calculator = calculatorInstance;
    this.openTriggers = openTriggers;

    this.currentCategory = "akademik";
    this.init();
  }

  init() {
    if (!this.modal) return;

    // Attach click triggers
    document.querySelectorAll(this.openTriggers).forEach(btn => {
      btn.addEventListener("click", () => {
        const pkg = btn.getAttribute("data-package");
        this.open(pkg);
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Backdrop click close
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });

    // Client Type Switchers
    const btnAcademic = document.getElementById("btn-type-academic");
    const btnCorporate = document.getElementById("btn-type-corporate");
    if (btnAcademic && btnCorporate) {
      btnAcademic.addEventListener("click", () => this.switchCategory("akademik"));
      btnCorporate.addEventListener("click", () => this.switchCategory("korporat"));
    }

    // Form submit
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  switchCategory(category) {
    this.currentCategory = category;
    const catInput = document.getElementById("form-client-category");
    const academicRow = document.getElementById("academic-fields-row");
    const corporateRow = document.getElementById("corporate-fields-row");
    const btnAcademic = document.getElementById("btn-type-academic");
    const btnCorporate = document.getElementById("btn-type-corporate");
    const nameLabel = document.getElementById("form-name-label");
    const nameInput = document.getElementById("form-student-name");

    if (catInput) catInput.value = category;

    if (category === "akademik") {
      btnAcademic?.classList.add("active");
      btnCorporate?.classList.remove("active");
      if (academicRow) academicRow.style.display = "grid";
      if (corporateRow) corporateRow.style.display = "none";
      if (nameLabel) nameLabel.textContent = "Nama Lengkap *";
      if (nameInput) nameInput.placeholder = "Contoh: Muhammad Fajar";
    } else {
      btnCorporate?.classList.add("active");
      btnAcademic?.classList.remove("active");
      if (academicRow) academicRow.style.display = "none";
      if (corporateRow) corporateRow.style.display = "grid";
      if (nameLabel) nameLabel.textContent = "Nama Lengkap / PIC *";
      if (nameInput) nameInput.placeholder = "Contoh: Budi Santoso (PT Wijaya Konstruksi)";
    }
  }

  open(preselectedPackage = null) {
    if (this.form) {
      this.form.style.display = "block";
      this.resultView.style.display = "none";

      if (preselectedPackage) {
        const pkgInput = this.form.querySelector(`[name="packageId"]`);
        if (pkgInput) pkgInput.value = preselectedPackage;
      } else if (this.calculator) {
        const state = this.calculator.getCurrentState();
        const pkgInput = this.form.querySelector(`[name="packageId"]`);
        const pagesInput = this.form.querySelector(`[name="pageCount"]`);
        const urgencyInput = this.form.querySelector(`[name="urgency"]`);
        
        if (pkgInput) pkgInput.value = state.packageId;
        if (pagesInput) pagesInput.value = state.pageCount;
        if (urgencyInput) urgencyInput.value = state.urgency;

        if (state.docType && state.docType !== "skripsi") {
          this.switchCategory("korporat");
          const reportSelect = document.getElementById("form-report-type");
          if (reportSelect) {
            if (state.docType === "laporan_keuangan") reportSelect.value = "Laporan Keuangan & Akuntansi (PSAK)";
            else if (state.docType === "laporan_kontraktor") reportSelect.value = "Laporan Proyek Kontraktor (Kurva S)";
            else if (state.docType === "laporan_rutin") reportSelect.value = "Laporan Rutin & Bulanan Perusahaan";
          }
        } else {
          this.switchCategory("akademik");
        }
      }
    }

    this.modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const submitBtn = this.form.querySelector(`button[type="submit"]`);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Memproses...";
    }

    const clientCategory = formData.get("clientCategory") || "akademik";
    const studentName = formData.get("studentName");
    const campusName = formData.get("campusName");
    const facultyMajor = formData.get("facultyMajor");
    const companyName = formData.get("companyName");
    const reportType = formData.get("reportType");
    const packageId = formData.get("packageId") || "standard";
    const pageCount = parseInt(formData.get("pageCount") || 60, 10);
    const urgency = formData.get("urgency") || "regular";
    const notes = formData.get("notes") || "";
    const selectedAddons = this.calculator ? this.calculator.getSelectedAddons() : [];

    const payload = {
      clientCategory,
      studentName,
      campusName: clientCategory === "akademik" ? campusName : companyName,
      facultyMajor: clientCategory === "akademik" ? facultyMajor : reportType,
      companyName,
      reportType,
      packageId,
      pageCount,
      urgency,
      notes,
      selectedAddons
    };

    try {
      const res = await postConsultation(payload);
      if (res.success && res.data) {
        this.showSuccess(res.data);
      }
    } catch (err) {
      // Direct Fallback WhatsApp URL creation
      const refCode = clientCategory === "akademik" ? `REF-SKR-${Date.now().toString().slice(-4)}` : `REF-CORP-${Date.now().toString().slice(-4)}`;
      const packageName = packageId.toUpperCase();
      const urgencyText = urgency === "express" ? "Kilat (< 24 Jam)" : urgency === "fast" ? "Cepat (1 - 2 Hari)" : "Reguler (3 - 5 Hari)";
      
      let message = `Halo Admin Bantu Skripsi & Laporan,\n\nSaya ingin konsultasi pengerjaan dokumen:\n- No. Referensi: ${refCode}\n- Kategori: ${clientCategory === "akademik" ? "Naskah Akademik" : "Laporan Bisnis / Kontraktor"}\n- Nama: ${studentName}\n`;
      
      if (clientCategory === "akademik") {
        message += `- Kampus: ${campusName || "-"}\n- Jurusan: ${facultyMajor || "-"}\n`;
      } else {
        message += `- Perusahaan/Instansi: ${companyName || "-"}\n- Jenis Laporan: ${reportType || "-"}\n`;
      }
      
      message += `- Paket: ${packageName}\n- Estimasi Halaman: ${pageCount} Halaman\n- Urgensi: ${urgencyText}\n`;
      if (notes) message += `- Catatan Khusus: ${notes}\n`;
      message += `\nMohon informasi teknis penawaran dan langkah selanjutnya. Terima kasih.`;

      const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;

      this.showSuccess({
        referenceCode: refCode,
        whatsapp: { waUrl }
      });
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim & Lanjut ke WhatsApp";
      }
    }
  }

  showSuccess(orderData) {
    if (this.form) this.form.style.display = "none";
    if (this.resultView) this.resultView.style.display = "block";

    if (this.refCodeDisplay) {
      this.refCodeDisplay.textContent = orderData.referenceCode;
    }

    if (this.waDirectBtn && orderData.whatsapp) {
      this.waDirectBtn.href = orderData.whatsapp.waUrl;
    }
  }
}
