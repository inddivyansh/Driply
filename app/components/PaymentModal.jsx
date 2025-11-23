'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose, product, onSelectPayment }) => {
  if (!isOpen || !product) return null;

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '📱', description: 'Pay using UPI apps' },
    { id: 'credit_card', name: 'Credit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive' }
  ];

  const handlePaymentSelect = (method) => {
    onSelectPayment(method.id);
  };

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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full glass-light flex items-center justify-center hover:bg-red-50 transition-all"
        >
          <svg className="w-5 h-5 text-[#5a5a8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6c47ff] to-[#4169e1] flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="text-[#151581] font-bold text-2xl mb-2">Select Payment Method</h3>
          <p className="text-[#5a5a8f] text-sm">Choose how you'd like to pay</p>
        </div>

        {/* Order Summary */}
        <div className="glass-light rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4">
            {product.image_url && (
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={product.image_url} alt={product.title || product.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-bold text-[#151581] text-sm line-clamp-1">{product.title || product.name}</h4>
              <p className="text-[#6c47ff] font-bold text-lg">₹{product.price}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handlePaymentSelect(method)}
              className="w-full glass-light rounded-xl p-4 flex items-center gap-4 hover:bg-white/80 transition-all border border-white/50 hover:border-[#6c47ff]/30"
            >
              <div className="text-3xl">{method.icon}</div>
              <div className="flex-1 text-left">
                <h5 className="font-bold text-[#151581]">{method.name}</h5>
                <p className="text-xs text-[#5a5a8f]">{method.description}</p>
              </div>
              <svg className="w-5 h-5 text-[#6c47ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;
