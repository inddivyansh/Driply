'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="gradient-orb orb-blue w-[500px] h-[500px] absolute top-[-250px] left-[-100px]" />
        <div className="gradient-orb orb-purple w-[600px] h-[600px] absolute top-[30%] right-[-200px]" />
        <div className="gradient-orb orb-pink w-[400px] h-[400px] absolute bottom-[10%] left-[20%]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full max-w-md p-8 rounded-3xl"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-linear-to-r from-[#606DFF] via-[#5570FF] to-[#606DFF] bg-clip-text text-transparent">
              Driply
            </span>
          </h1>
          <p className="text-[#5a5a5f] text-lg">Welcome back!</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[#292824] font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#606DFF]/20 focus:border-[#606DFF] focus:outline-none focus:ring-2 focus:ring-[#606DFF]/20 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-[#292824] font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#606DFF]/20 focus:border-[#606DFF] focus:outline-none focus:ring-2 focus:ring-[#606DFF]/20 transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="#" className="text-[#606DFF] hover:text-[#5570FF] text-sm font-medium">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="liquid-glass-button w-full py-3 rounded-xl font-semibold text-lg"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#606DFF]/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-[#888890]">OR</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full py-3 px-4 rounded-xl border border-[#606DFF]/20 hover:border-[#606DFF] transition-all flex items-center justify-center gap-3 font-medium text-[#292824]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-[#5a5a5f]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#606DFF] hover:text-[#5570FF] font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
