import React from 'react';

const PageLayout = ({ title, lastUpdate, children }) => {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header Section */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {lastUpdate && (
            <div className="mb-4">
              <p className="text-sm md:text-base text-gray-400" style={{ fontFamily: 'var(--font-geist)' }}>
                Latest update: {lastUpdate}
              </p>
            </div>
          )}
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl font-normal text-[#292824] tracking-[-1px]"
            style={{ fontFamily: 'var(--font-rebond)' }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div 
          className="prose prose-lg max-w-none text-[#292824]/80 leading-relaxed"
          style={{ fontFamily: 'var(--font-geist)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
