'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WordReveal from '../components/WordReveal';

const CoreUsps = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const usps = [
    {
      number: '1️⃣',
      title: 'Agentic Automation — Your AI Sales Team',
      description: 'Powered by a network of autonomous AI agents that understand what you want, find the best deals, and handle checkout for you.',
      details: "Driply's Sales, Recommendation, and Inventory Agents work together like a smart retail assistant — guiding your entire shopping journey end-to-end.",
      highlight: '🪄 From "show me a festive kurta under ₹3000" to "pick up in Pune" — done automatically.',
      gradient: 'from-[#00d9ff] to-[#0066ff]',
      icon: '🤖',
    },
    {
      number: '2️⃣',
      title: 'Omnichannel Personalization — One Experience, Everywhere',
      description: "Whether you're browsing online, chatting via WhatsApp, or visiting a kiosk — Driply keeps your session alive across all channels.",
      details: 'Your preferences, search intent, and cart sync in real-time, ensuring zero context loss.',
      highlight: '💬 Shop seamlessly between web, app, and store — your AI stylist remembers everything.',
      gradient: 'from-[#ff2d95] to-[#b537f2]',
      icon: '🌐',
    },
    {
      number: '3️⃣',
      title: 'Smart, Human-Like Recommendations',
      description: 'Driply learns your style, budget, and intent through natural language.',
      details: 'It reads product reviews, checks compatibility with your profile, and ranks options that truly fit you.',
      highlight: '🧠 Ask in your own words — "Show me streetwear for under ₹2000" — Driply gets it.',
      gradient: 'from-[#b537f2] to-[#ff006e]',
      icon: '✨',
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="container-center">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <div className="glass-light rounded-full py-3 px-6 inline-block mb-6">
              <p className="font-semibold text-[#606DFF] text-sm uppercase tracking-wider">Core Features</p>
            </div>
          </motion.div>
          
          <WordReveal
            text="Driply — 3 Core USPs to Showcase on Homepage"
            className="text-4xl md:text-6xl font-bold text-[#292824] leading-tight max-w-4xl mx-auto"
            delay={0.2}
          />
        </div>

        {/* USP Cards */}
        <div className="space-y-8 md:space-y-12">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="glass rounded-3xl p-8 md:p-12 hover:scale-[1.01] transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,109,255,0.1)]">
                {/* Subtle gradient border effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#606DFF] to-[#5570FF] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon and Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl">{usp.icon}</div>
                    <div className="text-5xl font-bold bg-linear-to-r from-[#606DFF] to-[#5570FF] bg-clip-text text-transparent">
                      {usp.number}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-2xl md:text-4xl font-bold text-[#292824] mb-4 leading-tight"
                    style={{ fontFamily: 'var(--font-primary)' }}
                  >
                    {usp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-[#5a5a5f] mb-4 leading-relaxed">
                    {usp.description}
                  </p>

                  {/* Details */}
                  <p className="text-base md:text-lg text-[#888890] mb-6 leading-relaxed">
                    {usp.details}
                  </p>

                  {/* Highlight */}
                  <div className="glass-light rounded-2xl p-5 border-l-4 border-[#606DFF] border-opacity-30">
                    <p className="text-lg font-semibold text-[#292824]">
                      {usp.highlight}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <a
            href="#ai-mode"
            className="inline-block px-10 py-5 bg-[#606DFF] text-white rounded-full font-bold text-xl hover:bg-[#5570FF] transition-all shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Experience AI Mode ✨
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreUsps;
