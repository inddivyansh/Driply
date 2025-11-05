'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WordByWordReveal = ({ text, delay = 0 }) => {
  const words = text.split(' ');
  
  return (
    <span>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const ComprehensiveApproach = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section ref={sectionRef} className="w-full py-16 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-12">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Heading with Scroll Reveal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold leading-tight text-[#151581] mb-8"
            style={{ fontFamily: 'var(--font-rebond)' }}
          >
            Driply is a comprehensive approach to your fashion journey.
          </motion.h2>

          {/* Description Paragraphs with Word-by-Word Darken Effect */}
          <div className="space-y-6 text-left">
            <p
              className="text-lg md:text-xl leading-relaxed text-[#5a5a8f] font-medium"
              style={{ fontFamily: 'var(--font-rebond)' }}
            >
              <WordByWordReveal 
                text="Set your style goals and build your perfect wardrobe. Track trends with AI agents that work around the clock to discover fashion that fits your vibe and budget."
                delay={0}
              />
            </p>

            <p
              className="text-lg md:text-xl leading-relaxed text-[#5a5a8f] font-medium"
              style={{ fontFamily: 'var(--font-rebond)' }}
            >
              <WordByWordReveal 
                text="Get all your fashion questions answered with AI-powered style intelligence that learns your preferences and recommends pieces you'll actually love."
                delay={0}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveApproach;
