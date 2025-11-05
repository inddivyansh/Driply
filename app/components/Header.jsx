'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Connect to auth state
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isStorePage = pathname === '/store';
  const isAuthPage = pathname === '/login' || pathname === '/signup';

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
            <span className="bg-linear-to-r from-[#606DFF] via-[#5570FF] to-[#606DFF] bg-clip-text text-transparent">
              Driply
            </span>
          </motion.div>
        </Link>

        {/* Navigation - Hidden on store page and auth pages */}
        {!isStorePage && !isAuthPage && (
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
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Auth pages - Show minimal UI */}
          {isAuthPage && (
            <Link 
              href="/"
              className="px-4 py-2 text-[#5a5a5f] hover:text-[#292824] font-medium transition-colors"
            >
              ← Back
            </Link>
          )}

          {/* Store page - Show Back to Home */}
          {isStorePage && !isAuthPage && (
            <>
              {isLoggedIn ? (
                <Link 
                  href="/profile"
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-[#5a5a5f] hover:text-[#292824] font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
              ) : null}
              <Link 
                href="/"
                className="liquid-glass-button px-6 py-3 rounded-full font-semibold"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                ← Back to Home
              </Link>
            </>
          )}

          {/* Home page - Show Login/Signup or Profile */}
          {!isStorePage && !isAuthPage && (
            <>
              {isLoggedIn ? (
                <Link 
                  href="/profile"
                  className="liquid-glass-button px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="hidden md:block px-6 py-3 text-[#606DFF] hover:text-[#5570FF] font-semibold transition-colors"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/signup"
                    className="liquid-glass-button px-6 py-3 rounded-full font-semibold"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
