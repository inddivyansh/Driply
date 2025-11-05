'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Hook for scroll-triggered fade-in animations
 */
export function useScrollFadeIn(threshold = 0.2, triggerOnce = true) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return { ref, inView };
}

/**
 * Hook for word-by-word reveal animation on scroll
 */
export function useWordReveal(text, threshold = 0.3) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  const words = text.split(' ');

  return { ref, inView, words };
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax(speed = 0.5) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
        const offset = (scrolled - elementTop + windowHeight) * speed;
        element.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elementRef;
}

/**
 * Hook for staggered children animation
 */
export function useStaggerAnimation(threshold = 0.2) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return { ref, inView };
}
