'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LoviAiAssistantDemo, LoviCapabilitiesDemo } from '../components/LoviAiAssistant';

const AiAssistantSection = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section ref={sectionRef} className="w-full py-12 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-light rounded-full py-2.5 px-5 inline-block">
              <p className="font-semibold text-[#606DFF] text-sm tracking-wide">SUPERPOWER #3</p>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-semibold text-[#292824] mt-6 leading-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-rebond)' }}
          >
            24/7 Fashion Stylist in your pocket
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#5a5a5f] mt-4 max-w-3xl font-medium"
          >
            Natural language shopping that learns your style — talk to Driply like you&apos;d talk to a stylist friend.
          </motion.p>
        </div>

        {/* AI Assistant Demo - Centered like lovi.care */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative w-full aspect-[9/19] max-w-[360px] mx-auto">
            <LoviAiAssistantDemo />
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <LoviCapabilitiesDemo />
        </motion.div>
      </div>
    </section>
  );
};

export default AiAssistantSection;
