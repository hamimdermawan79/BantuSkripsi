export interface ServiceCardItem {
  id: string;
  category: 'skripsi' | 'keuangan' | 'kantoran';
  title: string;
  description: string;
  bullets: string[];
  startingPrice: string;
  calculatorCategory: 'skripsi' | 'keuangan' | 'kantoran';
  calculatorServiceId: string;
}

export interface QualityStandard {
  step: number;
  title: string;
  desc: string;
}
