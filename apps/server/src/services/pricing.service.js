import { PACKAGES } from "../config/constants.js";
import { formatRupiah } from "../utils/reference.js";

const URGENCY_TIERS = {
  regular: {
    id: "regular",
    name: "Reguler (3 - 5 Hari Kerja)",
    multiplier: 1.0,
    additionalFee: 0,
    daysEstimate: 4
  },
  fast: {
    id: "fast",
    name: "Cepat (1 - 2 Hari Kerja)",
    multiplier: 1.25,
    additionalFee: 35000,
    daysEstimate: 2
  },
  express: {
    id: "express",
    name: "Kilat (< 24 Jam Kerja)",
    multiplier: 1.6,
    additionalFee: 75000,
    daysEstimate: 1
  }
};

const ADD_ONS = {
  mendeley_sync: {
    id: "mendeley_sync",
    name: "Sinkronisasi Reference Manager (Mendeley/Zotero)",
    price: 30000
  },
  lampiran_heavy: {
    id: "lampiran_heavy",
    name: "Perapian Lampiran Kompleks (> 15 Halaman)",
    price: 25000
  },
  turnitin_report: {
    id: "turnitin_report",
    name: "Laporan Pengecekan Plagiarisme Mendalam",
    price: 35000
  }
};

export class PricingService {
  static calculateEstimate({
    packageId = "standard",
    pageCount = 60,
    urgency = "regular",
    selectedAddons = []
  }) {
    const pkg = PACKAGES.find(p => p.id.toLowerCase() === packageId.toLowerCase()) || PACKAGES[1];
    const pages = Math.max(1, parseInt(pageCount, 10) || 50);
    const urgencyTier = URGENCY_TIERS[urgency] || URGENCY_TIERS.regular;

    let basePrice = pkg.price;
    let extraPages = 0;
    let extraPageFee = 0;

    // Additional page pricing if exceeds base limit
    const pageThreshold = pkg.includedPagesBase;
    if (pages > pageThreshold) {
      extraPages = pages - pageThreshold;
      const ratePerPage = pkg.id === "basic" ? 1200 : pkg.id === "standard" ? 1500 : 1800;
      extraPageFee = extraPages * ratePerPage;
    }

    const subtotalService = basePrice + extraPageFee;

    // Urgency calculation
    let urgencyFee = 0;
    if (urgencyTier.id !== "regular") {
      urgencyFee = Math.round(subtotalService * (urgencyTier.multiplier - 1)) + urgencyTier.additionalFee;
    }

    // Addons calculation
    const addonsDetail = [];
    let addonsTotal = 0;
    if (Array.isArray(selectedAddons)) {
      for (const addonId of selectedAddons) {
        if (ADD_ONS[addonId]) {
          addonsDetail.push(ADD_ONS[addonId]);
          addonsTotal += ADD_ONS[addonId].price;
        }
      }
    }

    const totalPrice = subtotalService + urgencyFee + addonsTotal;

    const completionTarget = new Date();
    completionTarget.setDate(completionTarget.getDate() + urgencyTier.daysEstimate);

    return {
      package: {
        id: pkg.id,
        name: pkg.name,
        basePrice: pkg.price,
        basePriceFormatted: formatRupiah(pkg.price),
        includedPages: pkg.includedPagesBase
      },
      input: {
        pageCount: pages,
        urgency: urgencyTier.id,
        urgencyName: urgencyTier.name
      },
      breakdown: {
        basePrice,
        basePriceFormatted: formatRupiah(basePrice),
        extraPages,
        extraPageFee,
        extraPageFeeFormatted: formatRupiah(extraPageFee),
        urgencyFee,
        urgencyFeeFormatted: formatRupiah(urgencyFee),
        addons: addonsDetail.map(a => ({
          ...a,
          priceFormatted: formatRupiah(a.price)
        })),
        addonsTotal,
        addonsTotalFormatted: formatRupiah(addonsTotal)
      },
      totalPrice,
      totalPriceFormatted: formatRupiah(totalPrice),
      estimatedCompletionText: `${urgencyTier.daysEstimate} hari kerja (${completionTarget.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })})`,
      note: "Harga estimasi dapat disesuaikan kembali setelah peninjauan file naskah & pedoman kampus secara langsung."
    };
  }

  static getAvailableOptions() {
    return {
      packages: PACKAGES,
      urgencyTiers: Object.values(URGENCY_TIERS),
      addons: Object.values(ADD_ONS)
    };
  }
}
