'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const OrderConfirmation = ({ isOpen, onClose, orderData }) => {
  useEffect(() => {
    if (isOpen && orderData) {
      // Trigger confetti animation
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen, orderData]);

  if (!isOpen || !orderData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg mx-4 glass-card rounded-3xl p-8 shadow-2xl border border-[#6c47ff]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mb-4 mx-auto"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="text-[#151581] font-bold text-3xl mb-2">Order Confirmed!</h3>
          <p className="text-[#5a5a8f] text-base">Your order has been placed successfully</p>
        </div>

        {/* Order Details */}
        <div className="glass-light rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/50">
            <span className="text-[#5a5a8f] text-sm font-medium">Order ID</span>
            <span className="text-[#151581] font-bold">#{orderData.order_id}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-white/50">
            <span className="text-[#5a5a8f] text-sm font-medium">Tracking Number</span>
            <span className="text-[#151581] font-bold text-sm">{orderData.tracking_number}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-white/50">
            <span className="text-[#5a5a8f] text-sm font-medium">Total Amount</span>
            <span className="text-[#6c47ff] font-bold text-xl">₹{orderData.total_amount}</span>
          </div>
          
          <div className="pt-2">
            <p className="text-[#5a5a8f] text-sm font-medium mb-2">Delivery Address</p>
            <p className="text-[#151581] text-sm">{orderData.message?.split('delivered to: ')[1] || 'Address on file'}</p>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="glass-light rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#6c47ff]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#6c47ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          <div>
            <p className="text-[#151581] font-bold text-sm">Estimated Delivery</p>
            <p className="text-[#5a5a8f] text-xs">3-5 business days</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 glass-light border border-white/50 rounded-xl text-[#151581] font-semibold hover:bg-white/80 transition-all"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              onClose();
              // Could navigate to orders page
            }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all"
          >
            View Orders
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmation;
