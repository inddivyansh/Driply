'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollFadeIn } from '../hooks/useScrollAnimation';

/**
 * Reusable card component with hover effects
 */
export function Card({ children, className = '', hover = true, delay = 0 }) {
  const { ref, inView } = useScrollFadeIn(0.1);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl glass-card ${className}`}
      style={{
        willChange: 'opacity, transform',
      }}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={hover ? {
        y: -4,
        scale: 1.01,
        transition: { duration: 0.2 },
      } : {}}
    >
      {children}
    </motion.div>
  );
}

/**
 * Feature card component
 */
export function FeatureCard({ icon, title, description, className = '', delay = 0 }) {
  return (
    <Card className={`p-8 md:p-10 ${className}`} delay={delay}>
      {icon && (
        <div className="mb-5 md:mb-7">
          {icon}
        </div>
      )}
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#292824] tracking-[-0.5px]" style={{ fontFamily: 'var(--font-primary)' }}>
        {title}
      </h3>
      <p className="text-base text-[#5a5a5f] leading-relaxed font-medium" style={{ fontFamily: 'var(--font-primary)' }}>
        {description}
      </p>
    </Card>
  );
}

/**
 * Testimonial card component with equal sizing
 */
export function TestimonialCard({ title, text, author, date, source, image, isVerified, delay = 0 }) {
  const quote = text || title;
  const role = date && source ? `${date} • ${source}` : date || source || '';

  return (
    <Card className="p-6 md:p-8 h-full flex flex-col min-h-[400px]" delay={delay} hover={true}>
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        {/* Title */}
        {title && (
          <h4 className="text-lg md:text-xl font-semibold text-[#292824] leading-tight shrink-0" style={{ fontFamily: 'var(--font-primary)' }}>
            {title}
          </h4>
        )}
        
        {/* Quote/Text */}
        <p className="text-base md:text-lg text-[#5a5a5f] leading-relaxed font-medium flex-1 min-h-0 overflow-hidden" style={{ fontFamily: 'var(--font-primary)' }}>
          &ldquo;{quote}&rdquo;
        </p>
        
        {/* Author info */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#f0f0f5] shrink-0">
          {image && (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#f6f6fa] shrink-0">
              <Image 
                src={image} 
                alt={author} 
                width={48}
                height={48}
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-[#292824] text-sm" style={{ fontFamily: 'var(--font-primary)' }}>
                {author}
              </div>
              {isVerified && (
                <svg className="w-4 h-4 text-[#606DFF] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            {role && (
              <div className="text-xs text-[#888890] font-medium mt-0.5">{role}</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Bento grid item component
 */
export function BentoCard({ children, className = '', size = 'default', delay = 0 }) {
  const sizes = {
    small: 'col-span-1 row-span-1',
    default: 'col-span-1 row-span-1 md:col-span-2',
    large: 'col-span-1 row-span-2 md:col-span-2',
    wide: 'col-span-1 md:col-span-3',
  };

  return (
    <Card 
      className={`${sizes[size]} ${className}`}
      delay={delay}
    >
      {children}
    </Card>
  );
}
