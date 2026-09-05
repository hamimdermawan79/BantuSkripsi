/**
 * Generates a structured reference code for consultations and orders.
 * Example: REF-SKR-2026-7842
 */
export function generateReferenceCode(prefix = "REF-SKR") {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}
