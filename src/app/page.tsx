'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BeforeAfter from '@/components/BeforeAfter';
import Packages from '@/components/Packages';
import Calculator from '@/components/Calculator';
import Workflow from '@/components/Workflow';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { ServiceCategoryKey } from '@/types/calculator';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryKey>('skripsi');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('standard');

  const handleSelectServiceOrPackage = (category: ServiceCategoryKey, serviceId: string) => {
    setSelectedCategory(category);
    setSelectedServiceId(serviceId);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services onSelectService={handleSelectServiceOrPackage} />
        <BeforeAfter />
        <Packages onSelectPackage={handleSelectServiceOrPackage} />
        <Calculator
          selectedCategory={selectedCategory}
          selectedServiceId={selectedServiceId}
        />
        <Workflow />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
