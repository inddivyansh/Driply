'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BentoCard } from '../components/Card';
import WordReveal from '../components/WordReveal';

const ProductScanner = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section ref={sectionRef} className="w-full py-12 lg:py-24 relative overflow-hidden">
      {/* Moving Brand Names Background - Single Row */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center">
        <motion.div
          className="whitespace-nowrap"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="text-[60px] md:text-[80px] font-bold text-[#151581] opacity-[0.03]" style={{ fontFamily: 'var(--font-rebond)' }}>
            ZARA • H&M • ADIDAS • NIKE • GUCCI • PRADA • DIOR • CHANEL • UNIQLO • MANGO • GAP • LEVIS • ARMANI • VERSACE • BURBERRY • FOREVER21 • TOPSHOP • ASOS • SHEIN • TOMMY • CALVIN KLEIN • VANS • CONVERSE • REEBOK • PUMA • NEW BALANCE • FILA • LACOSTE •
          </span>
        </motion.div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-light rounded-full py-2.5 px-5 inline-block">
              <p className="font-semibold text-[#606DFF] text-sm tracking-wide">SUPERPOWER #2</p>
            </div>
          </motion.div>
          <WordReveal
            text="Omnichannel Personalization — One Experience, Everywhere"
            className="text-3xl md:text-5xl font-semibold text-[#292824] mt-6 leading-tight max-w-2xl"
            delay={0.2}
          />
          <WordReveal
            text="Whether you start browsing on WhatsApp, try items in-store, or checkout on web — your cart, preferences, and conversation history seamlessly sync across all channels. One continuous shopping experience, everywhere."
            className="text-lg text-[#5a5a5f] mt-4 max-w-3xl font-medium leading-relaxed"
            delay={0.4}
          />
        </div>

        {/* Brand Logos Background */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <div className="flex gap-12 items-center justify-center flex-wrap p-12">
            {['ZARA', 'H&M', 'UNIQLO', 'Nike', 'Adidas', 'Urban Outfitters', 'ASOS'].map((brand, idx) => (
              <div key={idx} className="text-4xl font-bold text-gray-400">{brand}</div>
            ))}
          </div>
        </div>

        {/* Layout: Video card on left, 2 cards on right split vertically */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-visible">
          
          {/* Left: Video Card - Full height */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <BentoCard delay={0} className="p-6 flex flex-col h-full min-h-[700px] overflow-visible">
              <motion.div 
                className="w-full h-[500px] relative mb-4 overflow-hidden rounded-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <video
                  src="https://framerusercontent.com/assets/NcLX31S1UdGK5LBeVSo3glBjxzE.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div className="flex flex-col items-center gap-4 text-center flex-1">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl md:text-2xl font-semibold text-[#292824] mb-2"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Seamless Cross-Channel Sync
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="text-sm text-[#888890] text-center mb-4"
                >
                  Real-time synchronization across all platforms
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  <div className="py-2.5 px-5 bg-white border border-[#f0f0f5] rounded-xl text-sm font-semibold text-[#292824] shadow-sm hover:border-[#606DFF]/30 transition-all">
                    WhatsApp
                  </div>
                  <div className="py-2.5 px-5 bg-white border border-[#f0f0f5] rounded-xl text-sm font-semibold text-[#292824] shadow-sm hover:border-[#606DFF]/30 transition-all">
                    In-Store Kiosk
                  </div>
                  <div className="py-2.5 px-5 bg-white border border-[#f0f0f5] rounded-xl text-sm font-semibold text-[#292824] shadow-sm hover:border-[#606DFF]/30 transition-all">
                    Web App
                  </div>
                  <div className="py-2.5 px-5 bg-white border border-[#f0f0f5] rounded-xl text-sm font-semibold text-[#292824] shadow-sm hover:border-[#606DFF]/30 transition-all">
                    Mobile App
                  </div>
                </motion.div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Right: Two cards stacked vertically */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 overflow-visible">
            {/* Top Card: Cross-Channel Journey */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <BentoCard delay={0.1} className="p-6 flex flex-col h-full min-h-[340px] overflow-visible">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl font-semibold text-[#292824] text-center mb-2"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Your Cart Travels With You
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-sm text-[#888890] text-center mb-6"
                >
                  Seamless journey across all channels
                </motion.p>
                {/* Channel Icons */}
                <div className="flex flex-col gap-6 w-full items-center justify-center flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-4 w-full max-w-md"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold shadow-sm">
                      <span className="text-lg">W</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#292824] text-base">WhatsApp</p>
                      <p className="text-sm text-[#888890] font-medium">Start browsing</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-2xl"
                  >
                    ↓
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-center gap-4 w-full max-w-md"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#606DFF] flex items-center justify-center text-white font-bold shadow-sm">
                      <span className="text-lg">K</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#292824] text-base">In-Store Kiosk</p>
                      <p className="text-sm text-[#888890] font-medium">Try on physically</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-2xl"
                  >
                    ↓
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center gap-4 w-full max-w-md"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#5570FF] flex items-center justify-center text-white font-bold shadow-sm">
                      <span className="text-lg">W</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#292824] text-base">Web Checkout</p>
                      <p className="text-sm text-[#888890] font-medium">Complete purchase</p>
                    </div>
                  </motion.div>
                </div>
              </BentoCard>
            </motion.div>

            {/* Bottom Card: Unified Profile */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <BentoCard delay={0.2} className="p-6 flex flex-col justify-center items-center gap-6 h-full min-h-[340px] overflow-visible">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl font-semibold text-[#292824] text-center mb-2"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  Unified Customer Profile
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-sm text-[#888890] text-center mb-6"
                >
                  Everything synced across all touchpoints
                </motion.p>
                <motion.div 
                  className="relative w-full flex flex-col gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between p-4 bg-[#f6f6fa] rounded-xl">
                    <span className="text-[#292824] font-semibold text-base">Preferences Synced</span>
                    <span className="text-2xl font-bold text-[#606DFF]">✓</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f6f6fa] rounded-xl">
                    <span className="text-[#292824] font-semibold text-base">Cart Synced</span>
                    <span className="text-2xl font-bold text-[#5570FF]">✓</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f6f6fa] rounded-xl">
                    <span className="text-[#292824] font-semibold text-base">Chat History Synced</span>
                    <span className="text-2xl font-bold text-[#606DFF]">✓</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f6f6fa] rounded-xl">
                    <span className="text-[#292824] font-semibold text-base">Style Profile Synced</span>
                    <span className="text-2xl font-bold text-[#5570FF]">✓</span>
                  </div>
                </motion.div>
              </BentoCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for the floating product cards in Box 2
const ProductCard = ({ imgSrc, brand, name, tag, tagColor, position, delay = 0, sectionInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`absolute w-44 bg-white p-3 rounded-2xl shadow-xl ${position} z-10`}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md z-20">
        <span className={`text-xs font-semibold ${tagColor}`}>{tag}</span>
      </div>
      <Image
        src={imgSrc}
        alt={name}
        width={150}
        height={150}
        className="w-full h-24 object-contain"
      />
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500">{brand}</p>
        <p className="text-sm font-medium leading-tight">{name}</p>
      </div>
    </motion.div>
  );
};

export default ProductScanner;
