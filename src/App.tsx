import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BeforeAfter from '@/components/BeforeAfter';
import WhyUs from '@/components/WhyUs';
import Packages from '@/components/Packages';
import Calculator from '@/components/Calculator';
import Workflow from '@/components/Workflow';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { ServiceCategoryKey } from '@/types/calculator';

export default function App() {
  const isComparisonPage = window.location.pathname.replace(/\/+$/, '') === '/perbandingan';
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryKey>('skripsi');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('standard');

  useEffect(() => {
    // Native anchor navigation can run before this client-rendered page mounts.
    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      let sectionId: string;
      try {
        sectionId = decodeURIComponent(hash);
      } catch {
        return;
      }

      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleSelectServiceOrPackage = (category: ServiceCategoryKey, serviceId: string) => {
    setSelectedCategory(category);
    setSelectedServiceId(serviceId);
  };

  return (
    <>
      <Navbar solid={isComparisonPage} />
      <main className={isComparisonPage ? 'comparison-page' : undefined}>
        {isComparisonPage ? (
          <BeforeAfter standalone />
        ) : (
          <>
            <Hero />
            <Services onSelectService={handleSelectServiceOrPackage} />
            <BeforeAfter />
            <WhyUs />
            <Packages onSelectPackage={handleSelectServiceOrPackage} />
            <Calculator
              selectedCategory={selectedCategory}
              selectedServiceId={selectedServiceId}
            />
            <Workflow />
            <Faq />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
