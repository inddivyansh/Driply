'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedWordReveal } from '../components/AnimatedText';
import { useScrollFadeIn } from '../hooks/useScrollAnimation';

const CtaSection = () => {
  const { ref, isVisible } = useScrollFadeIn();
  
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-12 pb-8 md:pb-12">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[60vh] md:h-[80vh] rounded-[40px] overflow-hidden flex items-center justify-center text-center p-6"
      >
        {/* Background Image */}
        <Image
          src="https://framerusercontent.com/images/Z2oTjU6YZO4guLNtoYRnbZzYmAo.png"
          alt="Abstract background"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-5"></div>
        
        {/* Text Content */}
        <div className="relative z-10">
          <AnimatedWordReveal 
            text="Driply is fashion that feels like self expression"
            className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            delay={0.2}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;