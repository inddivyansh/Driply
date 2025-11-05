import React from 'react';

// Reusable Accordion Item
const FaqItem = ({ question, children }) => {
  return (
    <details className="w-full border-b border-gray-200 py-6 group">
      <summary className="flex justify-between items-center cursor-pointer list-none">
        <h3 className="text-2xl md:text-3xl font-medium text-[#151581]">
          {question}
        </h3>
        <div className="relative w-8 h-8">
          <div className="absolute w-5 h-0.5 bg-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-0.5 h-5 bg-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-open:rotate-90"></div>
        </div>
      </summary>
      <div className="pt-4 text-gray-700 text-lg max-w-3xl">
        {children}
      </div>
    </details>
  );
};

// Main FAQ Component
const Faq = () => {
  return (
    <section className="w-full bg-white py-12 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-12">
        <h2 className="text-3xl md:text-5xl font-medium text-[#151581] mb-6">
          FAQ
        </h2>
        
        <div className="flex flex-col">
          <FaqItem question="What is Lovi™?">
            <p>
              Lovi™ is a personal skincare assistant iOS app. It features a
              cosmetics scanner, a face scanner trained by a medical board, and
              expert skincare guidance provided through a chat with our AI
              assistant.
            </p>
            <p className="mt-4">
              It also has personalized routine programs and product
              recommendations tailored to your unique needs.
            </p>
          </FaqItem>

          <FaqItem question="Is it safe & secure?">
            <p>
              At Lóvi, we are dedicated to ensuring a secure user environment. All
              skincare recommendations in the app are safe for all skin types,
              including sensitive skin, and are suitable for pregnant or
              breastfeeding women.
            </p>
          </FaqItem>

          <FaqItem question="Are you brand-affiliated?">
            <p>
              Lóvi stands as a 100% independent project. We prioritize skincare
              science, offering recommendations based on product composition
              rather than brand hype.
            </p>
          </FaqItem>

          <FaqItem question="How are you science-backed exactly?">
            <p>
              Lóvi’s recommendations are rooted in a comprehensive,
              science-backed methodology that prioritizes safety and
              evidence-based insights.
            </p>
            <p className="mt-4">
              Our Comprehensive Safety Evaluation assesses each product against
              international standards, referencing trusted sources like the
              European Chemical Agency, FDA, TGA, and the Cosmetic Ingredient
              Review (CIR). This ensures we identify and flag harmful
              ingredients based on authoritative data.
            </p>
          </FaqItem>
        </div>
      </div>
    </section>
  );
};

export default Faq;