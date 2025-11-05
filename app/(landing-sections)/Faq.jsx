'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Reusable Accordion Item with animation
const FaqItem = ({ question, children, delay = 0, isOpen, onToggle }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="w-full border-b border-[#f0f0f5] py-6"
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center cursor-pointer list-none group"
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#292824] text-left pr-4" style={{ fontFamily: 'var(--font-primary)' }}>
          {question}
        </h3>
        <div className="relative w-8 h-8 shrink-0">
          <motion.div
            className="absolute w-5 h-0.5 bg-[#606DFF] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute w-0.5 h-5 bg-[#606DFF] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-[#5a5a5f] text-base md:text-lg leading-relaxed max-w-3xl" style={{ fontFamily: 'var(--font-primary)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main FAQ Component
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="w-full pt-24 md:pt-32 pb-6 md:pb-8">
      <div className="container-center">
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="glass-light rounded-full py-3 px-6 inline-block">
              <p className="font-semibold text-[#606DFF] text-sm uppercase tracking-wider">FAQs</p>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold text-[#292824]"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>
        
        <div className="flex flex-col">
          <FaqItem 
            question="What is Driply™?" 
            delay={0.1}
            isOpen={openIndex === 0}
            onToggle={() => toggleItem(0)}
          >
            <p>
              Driply™ is an agentic AI fashion e-commerce platform. It features
              a style scanner, outfit analyzer powered by fashion AI, and
              personalized styling guidance through our AI stylist agent.
            </p>
            <p className="mt-4">
              It also has smart shopping agents, omnichannel cart, mood-based
              search, and Drip Score - all tailored to your unique style and budget.
            </p>
          </FaqItem>

          <FaqItem 
            question="Is it safe & secure?" 
            delay={0.2}
            isOpen={openIndex === 1}
            onToggle={() => toggleItem(1)}
          >
            <p>
              At Driply, we are dedicated to ensuring a secure shopping environment. All
              fashion recommendations are unbiased and we protect your data with
              industry-standard encryption. Your payment information is processed
              securely through trusted payment partners.
            </p>
          </FaqItem>

          <FaqItem 
            question="Are you brand-affiliated?" 
            delay={0.3}
            isOpen={openIndex === 2}
            onToggle={() => toggleItem(2)}
          >
            <p>
              Driply stands as a 100% independent platform. We prioritize style
              intelligence, offering recommendations based on your personal taste,
              body type, and budget—not brand sponsorships or paid placements.
            </p>
          </FaqItem>

          <FaqItem 
            question="How does the AI styling work?" 
            delay={0.4}
            isOpen={openIndex === 3}
            onToggle={() => toggleItem(3)}
          >
            <p>
              Driply&apos;s recommendations are powered by advanced AI agents
              trained on millions of fashion data points, trend forecasts, and
              style principles.
            </p>
            <p className="mt-4">
              Our autonomous agents analyze your preferences, body measurements,
              color palette, and budget to curate personalized outfit suggestions.
              They shop across multiple brands simultaneously to find the best
              matches for your unique style.
            </p>
          </FaqItem>
        </div>
      </div>
    </section>
  );
};

export default Faq;
