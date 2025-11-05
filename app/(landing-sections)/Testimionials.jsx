'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TestimonialCard } from '../components/Card';

// Expanded testimonials data with dummy content
const testimonials = [
  {
    author: 'Melissa P.',
    date: 'Dec 27th, 2024',
    source: 'UX Research',
    title: 'I was recommended outfits that match me 100%!',
    text: "I was recommended outfits that fit me 100% and, more importantly, didn't cost like a fortune. Thank you!",
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Merilyn D.',
    date: 'Nov 18th, 2024',
    source: 'AppStore',
    title: 'Simply Love it!',
    text: 'My style game has definitely leveled up. The AI really understands what looks good on me. And the Drip Score helps me track my fashion evolution.',
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Tracy K.',
    date: 'May 23, 2025',
    source: 'Verified',
    title: 'No more wasting money on the wrong clothes',
    text: 'It feels like the app knows my style better than me. The recommendations are spot-on every single time!',
    isVerified: true,
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Chelsey J.',
    date: 'Dec 15th, 2023',
    source: 'UX Research',
    title: 'Just thank you',
    text: 'It is a useful app with the notion of maintaining a confident style, keeping time for yourself, and expressing your personality through fashion.',
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Kate K.',
    date: 'Nov 18th, 2023',
    source: 'Diary Research',
    title: "I've been enjoying the Driply app",
    text: "I've been enjoying the Driply app, especially the outfit suggestions and trend insights. The style analysis was eye-opening, and finding similar items across brands is super helpful.",
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Katie R.',
    date: 'May 17, 2025',
    source: 'Verified',
    title: 'Makes things easier',
    text: "I don't have to spend hours researching what to buy anymore, which is a nice bonus. Oh and tracking my style evolution kept me motivated to experiment with new looks",
    isVerified: true,
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Sarah M.',
    date: 'Jan 10th, 2025',
    source: 'AppStore',
    title: 'Best fashion app I\'ve used',
    text: 'The AI suggestions are incredibly accurate. I\'ve discovered so many new styles that I never would have tried on my own. The fit predictions are spot-on!',
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Jessica L.',
    date: 'Feb 5th, 2025',
    source: 'UX Research',
    title: 'Game changer for my wardrobe',
    text: 'Driply has completely transformed how I shop. The omnichannel experience means I can start browsing on my phone and finish in-store seamlessly.',
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Emma W.',
    date: 'Mar 12th, 2025',
    source: 'Verified',
    title: 'Saves me so much time',
    text: 'As a busy professional, I don\'t have time to browse through hundreds of products. Driply\'s AI knows exactly what I like and shows me only relevant options.',
    isVerified: true,
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
  {
    author: 'Olivia T.',
    date: 'Apr 8th, 2025',
    source: 'AppStore',
    title: 'Love the personalization',
    text: 'The app learns my preferences so well. Every recommendation feels like it was made just for me. My friends keep asking how I found such perfect outfits!',
    image: 'https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png',
  },
];

// Sub-component for the review card with equal sizing
const ReviewCard = ({ author, date, source, title, text, image, isVerified, delay = 0, sectionInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      className="shrink-0 w-80 snap-start"
      style={{ height: '100%' }}
    >
      <TestimonialCard
        author={author}
        date={date}
        source={source}
        title={title}
        text={text}
        image={image}
        isVerified={isVerified}
        delay={0}
      />
    </motion.div>
  );
};

const Testimonials = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollIntervalRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!sectionInView || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = 320; // w-80 = 320px
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;

    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % testimonials.length;
          container.scrollTo({
            left: nextIndex * scrollAmount,
            behavior: 'smooth',
          });
          return nextIndex;
        });
      }, 4000); // Change card every 4 seconds
    };

    startAutoScroll();

    // Pause on hover
    const handleMouseEnter = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };

    const handleMouseLeave = () => {
      startAutoScroll();
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sectionInView]);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32">
      <div className="container-center">
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="glass-light rounded-full py-3 px-6 inline-block">
              <p className="font-semibold text-[#606DFF] text-sm uppercase tracking-wider">Testimonials</p>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold text-[#292824] text-center leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Loved by both fashion newbies & trendsetters
          </motion.h2>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative w-full mt-12">
          {/* Inner container for scrolling */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory py-8 gap-6 scrollbar-hide items-stretch"
            style={{ scrollBehavior: 'smooth', minHeight: '400px' }}
          >
            {testimonials.map((review, index) => (
              <ReviewCard 
                key={index} 
                {...review} 
                delay={index * 0.05} 
                sectionInView={sectionInView}
              />
            ))}
          </div>
          {/* Fades for desktop */}
          <div className="hidden md:block absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="hidden md:block absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
