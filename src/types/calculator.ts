export type ServiceCategoryKey = 'skripsi' | 'keuangan' | 'kantoran';

export type SpeedKey = 'regular' | 'fast' | 'express';

export interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  includedPages: number;
  extraPerUnit: number;
  desc: string;
}

export interface CategoryData {
  name: string;
  volumeLabel: string;
  volumeUnit: string;
  volumeMin: number;
  volumeMax: number;
  volumeDefault: number;
  volumeStep: number;
  services: ServiceOption[];
}

export interface SpeedOption {
  name: string;
  multiplier: number;
  label: string;
  badgeText: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  applicableTo: ServiceCategoryKey[];
}

export interface CalculationResult {
  categoryData: CategoryData;
  service: ServiceOption;
  speed: SpeedOption;
  volume: number;
  basePrice: number;
  volumeAdjustment: number;
  speedSurcharge: number;
  baseAndVolumePrice?: number;
  speedAdjustedPrice?: number;
  addonsTotal: number;
  selectedAddons: AddonOption[];
  grandTotal: number;
}

