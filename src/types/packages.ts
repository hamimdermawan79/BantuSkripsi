export interface PricingPackage {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  features: string[];
  calcCategory: 'skripsi' | 'keuangan' | 'kantoran';
  calcServiceId: string;
  isRecommended?: boolean;
}
