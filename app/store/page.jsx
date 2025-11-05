'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const StorePage = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [selectedQuery, setSelectedQuery] = useState('ethnic-lehenga');
  const [isAiMode, setIsAiMode] = useState(false);
  const [showAiPopup, setShowAiPopup] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Hardcoded search suggestions
  const suggestions = [
    {
      id: 'ethnic-lehenga',
      text: 'Ethnic Design Silk Lehenga for south indian style wedding under 5000',
    },
    {
      id: 'diwali-kurta',
      text: 'Kurta for diwali under 2000',
    },
    {
      id: 'professional-suit',
      text: 'Professional Suit according to my preferences',
    },
  ];

  // Sample products for each query
  const productsData = {
    'ethnic-lehenga': [
      {
        id: 1,
        name: 'Banarasi Silk Lehenga Set',
        price: '₹4,799',
        originalPrice: '₹8,999',
        discount: '47% OFF',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop',
        rating: 4.8,
        aiMatch: 95,
      },
      {
        id: 2,
        name: 'South Indian Silk Lehenga',
        price: '₹4,299',
        originalPrice: '₹7,999',
        discount: '46% OFF',
        image: 'https://media.samyakk.in/pub/media/catalog/product/g/r/green-kanchipuram-silk-saree-with-contrast-border-and-unstitched-blouse-sr27810.jpg',
        rating: 4.7,
        aiMatch: 92,
      },
      {
        id: 3,
        name: 'Designer Lehenga with Dupatta',
        price: '₹4,999',
        originalPrice: '₹9,499',
        discount: '47% OFF',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop',
        rating: 4.9,
        aiMatch: 98,
      },
      {
        id: 4,
        name: 'Traditional Silk Lehenga',
        price: '₹3,899',
        originalPrice: '₹6,999',
        discount: '44% OFF',
        image: 'https://cdn.pixabay.com/photo/2023/06/29/13/29/woman-8096424_1280.jpg',
        rating: 4.6,
        aiMatch: 89,
      },
    ],
    'diwali-kurta': [
      {
        id: 5,
        name: 'Festive Cotton Kurta',
        price: '₹1,499',
        originalPrice: '₹2,999',
        discount: '50% OFF',
        image: 'https://cdn.pixabay.com/photo/2019/08/14/21/00/kurta-4406719_1280.jpg',
        rating: 4.5,
        aiMatch: 93,
      },
      {
        id: 6,
        name: 'Embroidered Silk Kurta',
        price: '₹1,899',
        originalPrice: '₹3,499',
        discount: '46% OFF',
        image: 'https://assets0.mirraw.com/images/12365448/3426-1_zoom.jpg?1711981284',
        rating: 4.7,
        aiMatch: 96,
      },
      {
        id: 7,
        name: 'Designer Kurta Pajama',
        price: '₹1,699',
        originalPrice: '₹3,299',
        discount: '48% OFF',
        image: 'https://shilpiahuja.com/cdn/shop/files/SS23Men_sbyShilpiAhuja_1__page-0007_800x.jpg?v=1688540292',
        rating: 4.6,
        aiMatch: 91,
      },
      {
        id: 8,
        name: 'Traditional Kurta Set',
        price: '₹1,299',
        originalPrice: '₹2,499',
        discount: '48% OFF',
        image: 'https://m.media-amazon.com/images/I/71t3fK3+keL._AC_UY1100_.jpg',
        rating: 4.4,
        aiMatch: 88,
      },
    ],
    'professional-suit': [
      {
        id: 9,
        name: 'Slim Fit Business Suit',
        price: '₹6,999',
        originalPrice: '₹12,999',
        discount: '46% OFF',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
        rating: 4.8,
        aiMatch: 97,
      },
      {
        id: 10,
        name: 'Classic Charcoal Suit',
        price: '₹7,499',
        originalPrice: '₹13,999',
        discount: '46% OFF',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
        rating: 4.9,
        aiMatch: 99,
      },
      {
        id: 11,
        name: 'Modern Blazer Suit',
        price: '₹5,999',
        originalPrice: '₹10,999',
        discount: '45% OFF',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop',
        rating: 4.7,
        aiMatch: 94,
      },
      {
        id: 12,
        name: 'Navy Blue Formal Suit',
        price: '₹6,499',
        originalPrice: '₹11,999',
        discount: '46% OFF',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop',
        rating: 4.6,
        aiMatch: 92,
      },
    ],
  };

  const currentProducts = productsData[selectedQuery] || [];
  const currentSuggestion = suggestions.find(s => s.id === selectedQuery);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { type: 'user', text: inputMessage }]);
      setInputMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'ai', 
          text: 'I found some great options for you based on your preferences. Here are the best matches:',
          products: currentProducts.slice(0, 3)
        }]);
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Full-Screen AI Mode Popup - Shows on page load */}
      {!isAiMode && showAiPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          onClick={() => setShowAiPopup(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg mx-4 glass-card rounded-3xl p-8 shadow-2xl border border-[#6c47ff]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#6c47ff] to-[#4169e1] flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-[#151581] font-bold text-2xl mb-3">Enable AI Shopping Mode</h3>
              <p className="text-[#5a5a8f] text-base font-medium leading-relaxed">
                Get personalized recommendations, natural language search, and autonomous shopping assistance powered by AI.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 glass-light p-3 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#6c47ff]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#6c47ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-[#5a5a8f] text-sm font-semibold">3x faster product discovery</p>
              </div>
              <div className="flex items-center gap-3 glass-light p-3 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#ff006e]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#ff006e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-[#5a5a8f] text-sm font-semibold">Personalized to your style</p>
              </div>
              <div className="flex items-center gap-3 glass-light p-3 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#4169e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[#5a5a8f] text-sm font-semibold">Smart price comparisons</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAiPopup(false)}
                className="flex-1 px-5 py-3 glass-light text-[#5a5a8f] rounded-xl font-semibold hover:bg-white/80 transition-all"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  setIsAiMode(true);
                  setShowAiPopup(false);
                }}
                className="liquid-glass-button flex-1 px-5 py-3 bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold"
              >
                Activate AI Mode
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Small Floating AI Button - Shows after dismissing popup */}
      {!isAiMode && !showAiPopup && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsAiMode(true)}
          className="liquid-glass-button fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!isAiMode ? (
          /* Elegant E-commerce Store View */
          <motion.div
            key="store"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen pt-24 pb-16 bg-[#f6f6fa]"
          >
            {/* Search Header */}
            <section className="pt-16 pb-12">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Central Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto mb-12"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchFocused ? '' : currentSuggestion?.text || ''}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      readOnly={!searchFocused}
                      className="w-full px-8 py-5 pl-16 pr-32 glass rounded-2xl text-[#151581] font-semibold placeholder:text-[#5a5a8f] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/20 border border-white/50 transition-all text-base shadow-lg"
                    />
                    <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#5a5a8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <button className="liquid-glass-button absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold">
                      Search
                    </button>
                  </div>

                  {/* Search Suggestions */}
                  {!searchFocused && (
                    <div className="mt-8 flex flex-wrap gap-3 justify-center">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => setSelectedQuery(suggestion.id)}
                          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                            selectedQuery === suggestion.id
                              ? 'liquid-glass-button bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white shadow-lg'
                              : 'glass-light border border-white/50 text-[#5a5a8f] hover:border-[#6c47ff]/30 hover:text-[#151581]'
                          }`}
                        >
                          {suggestion.text}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Filters Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[#151581] text-sm font-bold">Filters:</span>
                    <button className="px-5 py-2.5 glass-light border border-white/50 rounded-xl text-[#5a5a8f] text-sm font-semibold hover:border-[#6c47ff]/30 hover:text-[#151581] transition-all">
                      Category
                    </button>
                    <button className="px-5 py-2.5 glass-light border border-white/50 rounded-xl text-[#5a5a8f] text-sm font-semibold hover:border-[#6c47ff]/30 hover:text-[#151581] transition-all">
                      Price Range
                    </button>
                    <button className="px-5 py-2.5 glass-light border border-white/50 rounded-xl text-[#5a5a8f] text-sm font-semibold hover:border-[#6c47ff]/30 hover:text-[#151581] transition-all">
                      Brand
                    </button>
                    <button className="px-5 py-2.5 glass-light border border-white/50 rounded-xl text-[#5a5a8f] text-sm font-semibold hover:border-[#6c47ff]/30 hover:text-[#151581] transition-all">
                      Size
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#151581] text-sm font-bold">Sort by:</span>
                    <select className="px-5 py-2.5 glass border border-white/50 rounded-xl text-[#151581] text-sm font-semibold hover:border-[#6c47ff]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/20 cursor-pointer">
                      <option className="bg-white text-[#151581]">Relevance</option>
                      <option className="bg-white text-[#151581]">Price: Low to High</option>
                      <option className="bg-white text-[#151581]">Price: High to Low</option>
                      <option className="bg-white text-[#151581]">Customer Rating</option>
                      <option className="bg-white text-[#151581]">Newest First</option>
                    </select>
                  </div>
                </motion.div>

                {/* Results Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col md:flex-row items-start md:items-center gap-3 text-sm mb-8 glass-light px-6 py-4 rounded-xl border border-white/50"
                >
                  <span className="text-[#5a5a8f] font-medium">Showing products matching:</span>
                  <span className="text-[#151581] font-bold">&quot;{currentSuggestion?.text}&quot;</span>
                  <span className="ml-auto flex items-center gap-2 text-[#6c47ff] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#6c47ff]"></span>
                    AI Match Score: High
                  </span>
                </motion.div>
              </div>
            </section>

            {/* Products Grid */}
            <section ref={sectionRef} className="pb-16">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                      className="group cursor-pointer"
                    >
                      <div className="glass rounded-2xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(108,71,255,0.3)] transition-all duration-300 border border-white/50">
                        {/* Product Image */}
                        <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-[#f6f6fa] to-white">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Discount Badge */}
                          <div className="absolute top-4 left-4 bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                            {product.discount}
                          </div>

                          {/* AI Match Badge */}
                          <div className="absolute top-4 right-4 glass backdrop-blur-md text-[#151581] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6c47ff]"></span>
                            <span>{product.aiMatch}% Match</span>
                          </div>

                          {/* Wishlist Icon */}
                          <button className="absolute bottom-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-white/50">
                            <svg className="w-5 h-5 text-[#ff006e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                          <h3 className="text-[#151581] font-bold text-sm mb-2 line-clamp-2 min-h-10">
                            {product.name}
                          </h3>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1 px-2 py-0.5 glass-light rounded-lg">
                              <span className="text-[#6c47ff] text-xs">★</span>
                              <span className="text-[#151581] text-xs font-bold">{product.rating}</span>
                            </div>
                            <span className="text-[#5a5a8f] text-xs font-medium">(234)</span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <span className="text-[#151581] font-bold text-lg">{product.price}</span>
                            <span className="text-[#5a5a8f] line-through text-sm font-medium">{product.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* AI Copilot Chat Interface */
          <motion.div
            key="ai-mode"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-linear-to-br from-[#f6f6fa] via-[#ffffff] to-[#f6f6fa] z-40 pt-24"
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -left-20 w-96 h-96 bg-linear-to-r from-[#6c47ff]/5 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-linear-to-l from-[#4169e1]/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col">
              {/* Chat Header */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-4 mb-6 shadow-lg border border-white/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#6c47ff] to-[#4169e1] flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00d9c8] rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="text-[#151581] font-bold text-xl">Driply AI Assistant</h2>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00d9c8] rounded-full animate-pulse"></span>
                        <p className="text-[#5a5a8f] text-sm font-medium">Active • Powered by Agentic AI</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAiMode(false)}
                    className="group px-5 py-2.5 glass-light border border-white/50 rounded-xl text-[#151581] text-sm font-semibold hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Exit AI Mode
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto py-6 space-y-6 custom-scrollbar">
                {/* Welcome Message */}
                {chatMessages.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="flex gap-4">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="w-10 h-10 rounded-full bg-linear-to-r from-[#6c47ff] to-[#4169e1] flex items-center justify-center shadow-lg shrink-0"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </motion.div>
                      <div className="glass rounded-2xl p-6 flex-1 border border-white/50 shadow-lg">
                        <div className="mb-4">
                          <h3 className="text-[#151581] font-bold text-lg mb-2">👋 Welcome to AI Shopping Mode!</h3>
                          <p className="text-[#151581] font-semibold leading-relaxed">
                            I&apos;m your personal AI shopping assistant. I can help you discover products, compare prices, and find exactly what you&apos;re looking for with natural conversation.
                          </p>
                        </div>
                        
                        <div className="bg-linear-to-r from-[#6c47ff]/10 to-[#4169e1]/10 rounded-xl p-4 mb-4">
                          <p className="text-[#5a5a8f] text-sm font-semibold mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#6c47ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Quick Suggestions:
                          </p>
                          <div className="space-y-2">
                            {suggestions.map((suggestion, index) => (
                              <motion.button
                                key={suggestion.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                onClick={() => {
                                  setInputMessage(suggestion.text);
                                  setTimeout(handleSendMessage, 100);
                                }}
                                className="group block w-full text-left px-4 py-3 glass hover:bg-white/90 border border-white/50 rounded-xl text-[#5a5a8f] text-sm font-semibold transition-all hover:text-[#151581] hover:scale-[1.02] hover:shadow-md active:scale-95"
                              >
                                <span className="flex items-center gap-3">
                                  <span className="text-lg">💬</span>
                                  <span className="flex-1">{suggestion.text}</span>
                                  <svg className="w-4 h-4 text-[#6c47ff] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-xs text-[#5a5a8f]">
                          <svg className="w-4 h-4 text-[#00d9c8] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="font-medium">
                            You can ask me anything - from product recommendations to price comparisons. I understand natural language!
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Chat Messages */}
                {chatMessages.map((message, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-3xl mx-auto"
                  >
                    {message.type === 'user' ? (
                      <div className="flex gap-4 justify-end">
                        <motion.div 
                          initial={{ scale: 0.9, x: 20 }}
                          animate={{ scale: 1, x: 0 }}
                          className="liquid-glass-button bg-linear-to-r from-[#6c47ff] to-[#4169e1] rounded-2xl rounded-tr-sm p-5 max-w-lg shadow-lg"
                        >
                          <p className="text-white font-semibold leading-relaxed">{message.text}</p>
                        </motion.div>
                        <div className="w-10 h-10 rounded-full glass border-2 border-white/50 shrink-0 flex items-center justify-center shadow-md">
                          <svg className="w-5 h-5 text-[#6c47ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-10 h-10 rounded-full bg-linear-to-r from-[#6c47ff] to-[#4169e1] shrink-0 flex items-center justify-center shadow-lg"
                        >
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </motion.div>
                        <motion.div 
                          initial={{ scale: 0.9, x: -20 }}
                          animate={{ scale: 1, x: 0 }}
                          className="glass rounded-2xl rounded-tl-sm p-5 flex-1 border border-white/50 shadow-lg"
                        >
                          <p className="text-[#151581] font-semibold leading-relaxed mb-2">{message.text}</p>
                          {message.products && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="mt-6"
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <svg className="w-5 h-5 text-[#6c47ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                <span className="text-[#151581] font-bold text-sm">Recommended Products:</span>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                {message.products.map((product, i) => (
                                  <motion.div 
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="group glass rounded-xl overflow-hidden border border-white/50 hover:border-[#6c47ff]/50 transition-all hover:shadow-xl hover:scale-105 cursor-pointer"
                                  >
                                    <div className="relative aspect-3/4 bg-linear-to-br from-white to-[#f6f6fa]">
                                      <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                      />
                                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-3 bg-white/50 backdrop-blur-sm">
                                      <h4 className="text-[#151581] text-sm font-bold line-clamp-1 mb-1">{product.name}</h4>
                                      <div className="flex items-center justify-between">
                                        <p className="text-[#6c47ff] font-bold text-base">{product.price}</p>
                                        <svg className="w-4 h-4 text-[#6c47ff] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="py-6"
              >
                <div className="glass rounded-2xl p-4 shadow-lg border border-white/50">
                  <div className="flex gap-3 items-center">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message... (Press Enter to send)"
                        className="w-full px-6 py-4 glass-light border border-white/50 rounded-xl text-[#151581] font-semibold placeholder:text-[#5a5a8f] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30 focus:border-[#6c47ff]/50 transition-all"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button className="p-2 hover:bg-white/50 rounded-lg transition-all">
                          <svg className="w-5 h-5 text-[#5a5a8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="group liquid-glass-button px-8 py-4 bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                    >
                      <span className="flex items-center gap-2">
                        Send
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 mt-3 px-2">
                    <span className="text-xs text-[#5a5a8f] font-medium">Quick actions:</span>
                    <button className="px-3 py-1.5 glass-light rounded-lg text-xs font-semibold text-[#5a5a8f] hover:text-[#151581] hover:bg-white/80 transition-all">
                      🔍 Search products
                    </button>
                    <button className="px-3 py-1.5 glass-light rounded-lg text-xs font-semibold text-[#5a5a8f] hover:text-[#151581] hover:bg-white/80 transition-all">
                      💰 Compare prices
                    </button>
                    <button className="px-3 py-1.5 glass-light rounded-lg text-xs font-semibold text-[#5a5a8f] hover:text-[#151581] hover:bg-white/80 transition-all">
                      ⭐ Top rated
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StorePage;
