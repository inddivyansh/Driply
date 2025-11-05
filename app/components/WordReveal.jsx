'use client';

import { motion } from 'framer-motion';

const WordReveal = ({ text, className = '', delay = 0, duration = 0.5 }) => {
  // Split text into words
  const words = text.split(' ');

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.06, 
        delayChildren: delay 
      },
    }),
  };

  // Individual word animation - optimized for performance
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WordReveal;
