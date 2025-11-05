'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ComprehensiveSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const imageRef = React.useRef(null);
  const { ref: imageInViewRef, inView: imageInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section ref={ref} className="relative w-full py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left side - Image/Graphic */}
          <motion.div
            ref={imageInViewRef}
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={imageInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative w-full max-w-[543px]">
              <Image
                src="https://framerusercontent.com/images/IQbLZKaGqYctpqcPPBDttmcZXX0.png"
                alt="Driply app interface"
                width={1290}
                height={1306}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Right side - Animated Text */}
          <div className="relative">
            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[28px] md:text-[36px] lg:text-[48px] leading-8 md:leading-10 lg:leading-[52px] tracking-[-1px] md:tracking-[-1.1px] text-[#292824] mb-8 font-semibold"
            >
              Driply is a comprehensive approach to your style journey.
            </motion.h2>
            
            {/* Paragraphs */}
            <div 
              className="text-[16px] md:text-[18px] leading-6 md:leading-7 text-[#5a5a5f] space-y-6"
              style={{ fontFamily: 'var(--font-geist)' }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-medium"
              >
                Set your style goals and build your perfect wardrobe, track trends with AI agents, discover fashion that fits your vibe and budget.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-medium"
              >
                Get all your fashion questions answered with AI-powered style intelligence.
              </motion.p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComprehensiveSection;
