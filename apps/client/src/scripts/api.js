/**
 * API Client for Bantu Skripsimu Backend
 */

const API_BASE = "/api";

export async function fetchOverview() {
  const res = await fetch(`${API_BASE}/services/overview`);
  if (!res.ok) throw new Error("Gagal memuat ringkasan layanan.");
  return await res.json();
}

export async function fetchCampuses() {
  const res = await fetch(`${API_BASE}/services/campuses`);
  if (!res.ok) throw new Error("Gagal memuat data pedoman kampus.");
  return await res.json();
}

export async function fetchPricingOptions() {
  const res = await fetch(`${API_BASE}/pricing/options`);
  if (!res.ok) throw new Error("Gagal memuat opsi paket.");
  return await res.json();
}

export async function postEstimatePrice(payload) {
  const res = await fetch(`${API_BASE}/pricing/estimate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Gagal mengkalkulasi estimasi biaya.");
  return await res.json();
}

export async function postConsultation(payload) {
  const res = await fetch(`${API_BASE}/orders/consult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Gagal membuat formulir konsultasi.");
  }
  return data;
}

export async function getOrderTracking(refCode) {
  const clean = encodeURIComponent(refCode.trim());
  const res = await fetch(`${API_BASE}/orders/track/${clean}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Nomor referensi pesanan tidak ditemukan.");
  }
  return data;
}
