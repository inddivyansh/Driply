import React from 'react';

// Import landing page sections
import HeroSection from './(landing-sections)/HeroSection';
import ComprehensiveApproach from './(landing-sections)/ComprehensiveApproach';
import FeaturesBento from './(landing-sections)/FeaturesBento';
import ProductScanner from './(landing-sections)/ProductScanner';
import AiAssistantSection from './(landing-sections)/AiAssistantSection';
import Testimonials from './(landing-sections)/Testimionials';
import Faq from './(landing-sections)/Faq';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Main content sections - lovi.care style */}
      <HeroSection />
      <div className="section-padding-sm">
        <ComprehensiveApproach />
      </div>
      <div className="section-padding">
        <FeaturesBento />
      </div>
      <div className="section-padding">
        <ProductScanner />
      </div>
      <div className="section-padding">
        <AiAssistantSection />
      </div>
      <div className="section-padding-sm">
        <Testimonials />
      </div>
      <div className="pt-6 pb-0">
        <Faq />
      </div>
    </div>
  );
}