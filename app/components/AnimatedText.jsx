'use client';

import { motion } from 'framer-motion';
import { useScrollFadeIn, useWordReveal } from '../hooks/useScrollAnimation';

/**
 * Animated text component that reveals words one by one on scroll
 */
export function AnimatedWordReveal({ text, className = '', delay = 0 }) {
  const { ref, inView, words } = useWordReveal(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 120,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

/**
 * Simple fade-in animation component
 */
export function AnimatedFadeIn({ children, className = '', delay = 0 }) {
  const { ref, inView } = useScrollFadeIn();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered children animation
 */
export function AnimatedStagger({ children, className = '' }) {
  const { ref, inView } = useScrollFadeIn(0.1);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}
