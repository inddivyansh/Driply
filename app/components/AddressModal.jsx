'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AddressModal = ({ isOpen, onClose, product, paymentMethod, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    deliveryMethod: 'Delivery',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const fullAddress = `${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}, Phone: ${formData.phone}`;
      onSubmit(fullAddress, formData.deliveryMethod);
    }
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
        className="relative w-full max-w-lg mx-4 glass-card rounded-3xl p-8 shadow-2xl border border-[#6c47ff]/20 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full glass-light flex items-center justify-center hover:bg-red-50 transition-all disabled:opacity-50"
        >
          <svg className="w-5 h-5 text-[#5a5a8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6c47ff] to-[#4169e1] flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-[#151581] font-bold text-2xl mb-2">Delivery Address</h3>
          <p className="text-[#5a5a8f] text-sm">Where should we deliver your order?</p>
        </div>

        {/* Order Summary */}
        <div className="glass-light rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4 mb-3">
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
          <div className="pt-3 border-t border-white/50">
            <p className="text-xs text-[#5a5a8f]">Payment Method: <span className="font-bold text-[#151581]">{paymentMethod.toUpperCase()}</span></p>
          </div>
        </div>

        {/* Delivery Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#151581] mb-3">Delivery Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'Delivery' }))}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                formData.deliveryMethod === 'Delivery'
                  ? 'bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white'
                  : 'glass-light text-[#5a5a8f] hover:bg-white/80'
              }`}
            >
              🚚 Delivery
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'Pickup' }))}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                formData.deliveryMethod === 'Pickup'
                  ? 'bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white'
                  : 'glass-light text-[#5a5a8f] hover:bg-white/80'
              }`}
            >
              🏪 Pickup
            </button>
          </div>
        </div>

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#151581] mb-2">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="House no., Building name, Street"
              className={`w-full px-4 py-3 glass-light border ${errors.street ? 'border-red-400' : 'border-white/50'} rounded-xl text-[#151581] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30`}
            />
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#151581] mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={`w-full px-4 py-3 glass-light border ${errors.city ? 'border-red-400' : 'border-white/50'} rounded-xl text-[#151581] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#151581] mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className={`w-full px-4 py-3 glass-light border ${errors.state ? 'border-red-400' : 'border-white/50'} rounded-xl text-[#151581] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30`}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#151581] mb-2">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                maxLength={6}
                className={`w-full px-4 py-3 glass-light border ${errors.pincode ? 'border-red-400' : 'border-white/50'} rounded-xl text-[#151581] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30`}
              />
              {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-[#151581] mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                maxLength={10}
                className={`w-full px-4 py-3 glass-light border ${errors.phone ? 'border-red-400' : 'border-white/50'} rounded-xl text-[#151581] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-4 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Confirm Order
              </>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddressModal;
