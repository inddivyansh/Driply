'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BentoCard } from '../components/Card';
import WordReveal from '../components/WordReveal';

// A reusable component for the info tags with scroll animation
const InfoTag = ({ text, color = 'text-[#606DFF]', delay = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white border border-[#f0f0f5] rounded-full py-2.5 px-5 shadow-sm hover:shadow-md hover:border-[#606DFF]/30 transition-all"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
    >
      <p className={`font-semibold text-sm ${color}`}>{text}</p>
    </motion.div>
  );
};

const FeaturesBento = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section ref={sectionRef} className="w-full max-w-6xl mx-auto px-4 md:px-12 py-12 lg:py-24">
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-light rounded-full py-2.5 px-5 inline-block">
            <p className="font-semibold text-[#606DFF] text-sm tracking-wide">SUPERPOWER #1</p>
          </div>
        </motion.div>
        
        <WordReveal
          text="Agentic Automation — Your AI Sales Team"
          className="text-3xl md:text-5xl font-semibold text-[#292824] mt-6 leading-tight max-w-2xl"
          delay={0.2}
        />
        
        <WordReveal
          text="Powered by autonomous AI agents that understand your intent, find the best matches, and handle everything from discovery to checkout. Your personal sales team working 24/7 to make shopping effortless."
          className="text-lg text-[#5a5a5f] mt-4 max-w-3xl font-medium leading-relaxed"
          delay={0.4}
        />
      </div>

      {/* Layout: Video card on left, 2 cards on right split vertically */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Video Card - Full height */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-1"
        >
          <BentoCard delay={0} className="p-6 flex flex-col items-center justify-between gap-6 h-full min-h-[700px] overflow-visible">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl font-semibold text-[#292824] text-center mb-2"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Natural Language Shopping
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-sm text-[#5a5a5f] text-center mb-4"
            >
              &quot;Show me a festive kurta under ₹3000&quot;
            </motion.p>
            <motion.div 
              className="relative w-full flex-1 flex items-center justify-center min-h-[500px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <video
                src="https://framerusercontent.com/assets/ilCtWrkphoLbWT5ZCt192mFAsSU.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-[30px] shadow-lg w-full h-full object-contain max-h-[550px]"
              />
            </motion.div>
          </BentoCard>
        </motion.div>

        {/* Right: Two cards stacked vertically */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-6">
          {/* Top Card: AI Agents */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <BentoCard delay={0.1} className="p-8 flex flex-col items-center gap-6 h-full min-h-[340px] overflow-visible">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl font-semibold text-[#292824] text-center mb-2"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Meet Your AI Agent Team
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-sm text-[#888890] text-center mb-6"
              >
                Specialized agents working together seamlessly
              </motion.p>
              <div className="flex flex-wrap justify-center gap-3 overflow-visible">
                <InfoTag text="Sales Agent" color="text-[#606DFF]" delay={0.4} />
                <InfoTag text="Recommendation Agent" color="text-[#5570FF]" delay={0.45} />
                <InfoTag text="Inventory Agent" color="text-[#606DFF]" delay={0.5} />
                <InfoTag text="Customer Support" color="text-[#7EE3BF]" delay={0.55} />
                <InfoTag text="Personalization" color="text-[#606DFF]" delay={0.6} />
                <InfoTag text="Analytics Agent" color="text-[#5570FF]" delay={0.65} />
                <InfoTag text="Returns Agent" color="text-[#7EE3BF]" delay={0.7} />
                <InfoTag text="Loyalty Agent" color="text-[#606DFF]" delay={0.75} />
              </div>
            </BentoCard>
          </motion.div>

          {/* Bottom Card: Automation Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <BentoCard delay={0.2} className="p-8 flex flex-col justify-center items-center gap-6 h-full min-h-[340px] overflow-visible">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl font-semibold text-[#292824] text-center mb-2"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Always-On Intelligence
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-sm text-[#888890] text-center mb-6"
              >
                Real-time performance metrics
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col gap-5 w-full"
              >
                <div className="flex items-center justify-between p-4 bg-[#f6f6fa] rounded-xl">
                  <span className="text-[#292824] font-semibold text-base">Queries Handled</span>
                  <span className="text-2xl font-bold text-[#606DFF]">24/7</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f6f6fa] rounded-xl">
                  <span className="text-[#292824] font-semibold text-base">Avg Response Time</span>
                  <span className="text-2xl font-bold text-[#5570FF]">&lt;2s</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f6f6fa] rounded-xl">
                  <span className="text-[#292824] font-semibold text-base">Conversion Rate</span>
                  <span className="text-2xl font-bold text-[#606DFF]">3.2x</span>
                </div>
              </motion.div>
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBento;
