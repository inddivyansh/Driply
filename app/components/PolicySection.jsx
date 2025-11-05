import React from 'react';

const PolicySection = ({ title, number, children }) => {
  return (
    <section className="mb-8">
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-medium text-[#151581]">
          {number && <span className="mr-2">{number}.</span>}
          {title}
        </h2>
      </div>
      
      {/* Section Content */}
      <div className="prose prose-lg max-w-none text-gray-700">
        {children}
      </div>
    </section>
  );
};

export default PolicySection;