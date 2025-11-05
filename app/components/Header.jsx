'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(30px) saturate(180%)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(30px) saturate(180%)' : 'blur(0px)',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
        borderBottom: scrolled ? '1px solid rgba(96, 109, 255, 0.1)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(96, 109, 255, 0.06)' : 'none',
      }}
    >
      <div className="flex justify-between items-center container-center py-6">
        {/* Logo */}
        <Link href="/" aria-label="Driply Homepage">
          <motion.div 
            className="text-3xl md:text-4xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-primary)' }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-[#606DFF] via-[#5570FF] to-[#606DFF] bg-clip-text text-transparent">
              Driply
            </span>
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-[#5a5a5f] hover:text-[#292824] font-medium transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Home
          </Link>
          <Link 
            href="/store" 
            className="text-[#5a5a5f] hover:text-[#292824] font-medium transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Shop
          </Link>
          <Link 
            href="/#features" 
            className="text-[#5a5a5f] hover:text-[#292824] font-medium transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Features
          </Link>
        </nav>

        {/* CTA Button */}
        <Link 
          href="/store"
          className="liquid-glass-button px-6 py-3 rounded-full font-semibold"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Explore Store →
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;