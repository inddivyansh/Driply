'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WordReveal from '../components/WordReveal';

// Pre-generate deterministic dot positions to avoid hydration issues
const dotPositions = Array.from({ length: 40 }, (_, i) => ({
  left: `${20 + (i * 7) % 60}%`,
  top: `${30 + (i * 11) % 40}%`,
  delay: (i * 0.05) % 2,
}));

// Traditional Indian dress images from Unsplash
const traditionalDresses = [
  {
    id: 1,
    name: 'Punjabi Kurta',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', // Punjabi suit/kurta
  },
  {
    id: 2,
    name: "Men's Kurta",
    url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80', // Men's traditional kurta
  },
  {
    id: 3,
    name: 'Goan Dress',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80', // Traditional Indian dress
  },
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Initialize with unshuffled array for SSR, then shuffle on client
  const [shuffledDresses, setShuffledDresses] = useState(traditionalDresses);

  useEffect(() => {
    // Shuffle only on client-side to maintain consistency
    setShuffledDresses(shuffleArray(traditionalDresses));
  }, []);

  return (
    <section ref={ref} className="relative flex flex-col items-center justify-center pt-32 md:pt-48 pb-20 overflow-hidden text-center">
      {/* Moving Brand Names Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Row 1 - Moving Left to Right */}
        <motion.div
          className="absolute top-[15%] left-0 whitespace-nowrap"
          style={{ willChange: 'transform' }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <span className="text-[120px] md:text-[180px] font-bold text-[#151581] opacity-5" style={{ fontFamily: 'var(--font-rebond)' }}>
            ZARA • H&M • ADIDAS • NIKE • GUCCI • PRADA • DIOR • CHANEL • ZARA • H&M • ADIDAS • NIKE • GUCCI • PRADA • DIOR • CHANEL •
          </span>
        </motion.div>

        {/* Row 2 - Moving Right to Left */}
        <motion.div
          className="absolute top-[35%] left-0 whitespace-nowrap"
          style={{ willChange: 'transform' }}
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <span className="text-[120px] md:text-[180px] font-bold text-[#6c47ff] opacity-5" style={{ fontFamily: 'var(--font-rebond)' }}>
            UNIQLO • MANGO • GAP • LEVIS • ARMANI • VERSACE • BURBERRY • UNIQLO • MANGO • GAP • LEVIS • ARMANI • VERSACE • BURBERRY •
          </span>
        </motion.div>

        {/* Row 3 - Moving Left to Right */}
        <motion.div
          className="absolute top-[55%] left-0 whitespace-nowrap"
          style={{ willChange: 'transform' }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <span className="text-[120px] md:text-[180px] font-bold text-[#4169e1] opacity-5" style={{ fontFamily: 'var(--font-rebond)' }}>
            FOREVER21 • TOPSHOP • ASOS • SHEIN • TOMMY • CALVIN KLEIN • FOREVER21 • TOPSHOP • ASOS • SHEIN • TOMMY • CALVIN KLEIN •
          </span>
        </motion.div>

        {/* Row 4 - Moving Right to Left */}
        <motion.div
          className="absolute top-[75%] left-0 whitespace-nowrap"
          style={{ willChange: 'transform' }}
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <span className="text-[120px] md:text-[180px] font-bold text-[#ff006e] opacity-5" style={{ fontFamily: 'var(--font-rebond)' }}>
            VANS • CONVERSE • REEBOK • PUMA • NEW BALANCE • FILA • LACOSTE • VANS • CONVERSE • REEBOK • PUMA • NEW BALANCE • FILA • LACOSTE •
          </span>
        </motion.div>
      </div>

      {/* Decorative orbs */}
      <div className="orb orb-purple" style={{ top: '10%', left: '5%' }} />
      <div className="orb orb-blue" style={{ top: '20%', right: '10%' }} />
      <div className="orb orb-teal" style={{ bottom: '15%', left: '15%' }} />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center gap-4 md:gap-6 px-4 mb-16">
        <WordReveal 
          text="Meet Driply — Your AI Fashion Co-Pilot"
          className="text-[30px] md:text-5xl lg:text-[64px] font-normal leading-tight md:leading-[60px] lg:leading-[68px] max-w-4xl text-[#292824] tracking-[-2px] text-center" 
          delay={0}
        />
        
        <WordReveal
          text="Scan any product from any store. Get instant personalized fit scores, style recommendations, and seamless shopping across all your favorite brands."
          className="text-base md:text-xl text-[#5a5a5f] tracking-[-0.5px] leading-relaxed max-w-2xl px-4 text-center"
          delay={0.3}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/store"
            className="liquid-glass-button px-10 py-4 rounded-full text-lg font-bold"
          >
            Explore Store
          </Link>
        </motion.div>
      </div>

      {/* Three Phone Mockups - Horizontal Layout */}
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12">
          {/* Phone 1: Style Analysis with dots */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-[200px] md:w-[250px] lg:w-[300px] aspect-[9/19]"
          >
            <div className="relative w-full h-full bg-black rounded-[2.5rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
              <div className="relative w-full h-full bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden" suppressHydrationWarning>
                <Image
                  src={shuffledDresses[0].url}
                  alt={shuffledDresses[0].name}
                  fill
                  className="object-cover"
                  suppressHydrationWarning
                />
                {/* Scan dots overlay - optimized */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {dotPositions.slice(0, 20).map((dot, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-pink-400 rounded-full"
                      style={{
                        left: dot.left,
                        top: dot.top,
                        willChange: 'transform, opacity',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: dot.delay,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white text-sm md:text-base">Analyzing your style vibe...</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phone 2: Center - Outfit with green circle overlay (main) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative w-[240px] md:w-[300px] lg:w-[360px] aspect-[9/19] z-10"
          >
            <div className="relative w-full h-full bg-black rounded-[2.5rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
              <div className="relative w-full h-full bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden" suppressHydrationWarning>
                <Image
                  src={shuffledDresses[1].url}
                  alt={shuffledDresses[1].name}
                  fill
                  className="object-cover"
                  suppressHydrationWarning
                />
                {/* Scan dots overlay - optimized */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {dotPositions.slice(0, 20).map((dot, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-pink-400 rounded-full"
                      style={{
                        left: dot.left,
                        top: dot.top,
                        willChange: 'transform, opacity',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: dot.delay,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white text-xs md:text-sm">Capturing your look</p>
                  <p className="text-white text-xs md:text-sm">for personalized styling</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phone 3: Style Results with colored dots */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative w-[200px] md:w-[250px] lg:w-[300px] aspect-[9/19]"
          >
            <div className="relative w-full h-full bg-black rounded-[2.5rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
              <div className="relative w-full h-full bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden" suppressHydrationWarning>
                <Image
                  src={shuffledDresses[2].url}
                  alt={shuffledDresses[2].name}
                  fill
                  className="object-cover"
                  suppressHydrationWarning
                />
                {/* Scan dots overlay - optimized */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {dotPositions.slice(0, 20).map((dot, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-pink-400 rounded-full"
                      style={{
                        left: dot.left,
                        top: dot.top,
                        willChange: 'transform, opacity',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: dot.delay,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Caption below phones */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-8 text-[#5a5a5f] text-base md:text-lg font-medium"
        >
          AI-powered style analysis that understands your vibe
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;