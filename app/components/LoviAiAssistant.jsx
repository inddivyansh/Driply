'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Chat message component matching lovi.care style exactly
const ChatMessage = ({ message, isUser, delay = 0, onSliderChange }) => {
  const [sliderValue, setSliderValue] = useState(75);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex gap-3 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#606DFF] to-[#C4A4FF] flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-primary)' }}>D</span>
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? 'bg-[#606DFF]' : 'bg-white'} rounded-2xl px-5 py-4 shadow-sm`}>
        {message.type === 'text' && (
          <p className={`text-sm ${isUser ? 'text-white' : 'text-[#292824]'} leading-relaxed`}>
            {message.content}
          </p>
        )}
        {message.type === 'slider' && (
          <div className="space-y-3">
            <p className="text-sm text-[#292824] font-medium mb-4">{message.question}</p>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => {
                  setSliderValue(e.target.value);
                  onSliderChange && onSliderChange(e.target.value);
                }}
                className="w-full h-3 bg-gradient-to-r from-[#FF9EAA] via-[#C4A4FF] to-[#8FD0FF] rounded-full appearance-none cursor-pointer slider-custom"
                style={{
                  background: `linear-gradient(to right, #FF9EAA 0%, #C4A4FF 50%, #8FD0FF 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-[#888890] mt-3 px-1">
                <span>Not good</span>
                <span>It&apos;s fine</span>
                <span>Great</span>
              </div>
            </div>
          </div>
        )}
        {message.type === 'products' && (
          <div className="space-y-3">
            <p className="text-xs text-[#888890] mb-2 font-medium">✨ Based on your StyleID and current preferences</p>
            <p className="text-sm text-[#292824] mb-4 leading-relaxed">{message.content}</p>
            <div className="grid grid-cols-3 gap-3">
              {message.products.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * idx, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white rounded-xl p-3 shadow-sm border border-[#f0f0f5] relative cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#7EE3BF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
                    {product.fit}% fit
                  </div>
                  <div className="relative w-full h-20 mb-2 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] text-[#292824] font-medium leading-tight text-center mb-2 line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-[10px] text-[#606DFF] font-semibold text-center">
                    from {product.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-[#f6f6fa] border border-[#f0f0f5] flex items-center justify-center shrink-0">
          <Image
            src="https://framerusercontent.com/images/qlMXFhQ1Q77UF2VP16sCTzAkrSs.png"
            alt="User"
            width={40}
            height={40}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};

// Main AI Assistant Demo Component - matching lovi.care exactly
export const LoviAiAssistantDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [sliderValue, setSliderValue] = useState(75);
  const messagesEndRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Conversation flow matching lovi.care exactly but in fashion context
  const conversationFlow = React.useMemo(() => [
    {
      message: {
        type: 'text',
        content: "👋 Hi! I'm Driply AI Assistant, here to help you with all things fashion.",
        isUser: false
      },
      delay: 800
    },
    {
      message: {
        type: 'slider',
        question: 'How does your style feel today?',
        isUser: false
      },
      delay: 2500
    },
    {
      message: {
        type: 'text',
        content: "Great to hear that! ☀️ Based on your style profile, I've found some perfect pieces that match your wardrobe preferences.",
        isUser: false
      },
      delay: 5000
    },
    {
      message: {
        type: 'text',
        content: 'How can I improve my wardrobe?',
        isUser: true
      },
      delay: 7000
    },
    {
      message: {
        type: 'products',
        content: 'Consider adding these versatile pieces to your wardrobe to elevate your style and create more outfit combinations:',
        products: [
          {
            name: 'Classic White Shirt',
            image: 'https://framerusercontent.com/images/6seYl3Kv8B4aQhxzx4CPNv8LPE.png',
            fit: '92',
            price: '₹1,299'
          },
          {
            name: 'Dark Denim Jeans',
            image: 'https://framerusercontent.com/images/DWdx6d9EYkPV9j1bIGIHWcgHBs.png',
            fit: '89',
            price: '₹2,499'
          },
          {
            name: 'Neutral Blazer',
            image: 'https://framerusercontent.com/images/QguDIwIsH0ZPbQLUt51Siw5Yvg.png',
            fit: '90',
            price: '₹4,999'
          }
        ],
        isUser: false
      },
      delay: 8500
    }
  ], []);

  useEffect(() => {
    if (!mountedRef.current) return;
    
    if (currentStep < conversationFlow.length) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setCurrentStep(currentStep + 1);
        }, 1000);
      }, conversationFlow[currentStep].delay);
      return () => clearTimeout(timer);
    } else if (currentStep >= conversationFlow.length) {
      // Reset to beginning after a pause
      const resetTimer = setTimeout(() => {
        setCurrentStep(0);
      }, 10000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep, conversationFlow]);

  useEffect(() => {
    if (mountedRef.current && messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.parentElement;
      if (chatContainer && chatContainer.classList.contains('overflow-y-auto')) {
        const scrollTop = messagesEndRef.current.offsetTop - chatContainer.clientHeight + 100;
        chatContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }
  }, [currentStep]);

  return (
    <div className="relative w-full h-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#f0f0f5] flex flex-col" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 19%, #f6f6fa 21%)' }}>
      {/* Phone Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[#f0f0f5] sticky top-0 z-10 backdrop-blur-sm bg-white/95 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#606DFF] to-[#C4A4FF] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-primary)' }}>D</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#292824]">Driply AI Assistant</p>
              <p className="text-xs text-[#888890]">Online</p>
            </div>
          </div>
          <button className="text-[#888890] text-xl hover:text-[#292824] transition-colors">×</button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-transparent scroll-smooth min-h-0">
        <AnimatePresence mode="popLayout">
          {conversationFlow.slice(0, currentStep).map((item, idx) => (
            <ChatMessage
              key={idx}
              message={item.message}
              isUser={item.message.isUser}
              delay={0}
              onSliderChange={setSliderValue}
            />
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#606DFF] to-[#C4A4FF] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-primary)' }}>D</span>
            </div>
            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
              <div className="flex gap-1.5">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-[#888890] rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-[#888890] rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-[#888890] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons - Matching lovi.care style exactly */}
      <div className="border-t border-[#f0f0f5] px-6 py-4 backdrop-blur-sm bg-white/95 flex-shrink-0 space-y-2">
        <button 
          onClick={() => {}}
          className="w-full py-4 bg-[#606DFF] text-white rounded-xl font-semibold text-sm hover:bg-[#5570FF] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span>What else could you suggest?</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button 
          onClick={() => {}}
          className="w-full py-4 bg-[#606DFF] text-white rounded-xl font-semibold text-sm hover:bg-[#5570FF] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span>What else can you do?</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Alternative capabilities demo
export const LoviCapabilitiesDemo = () => {
  const capabilities = [
    {
      question: "Will this fit match my vibe?",
      icon: "👔"
    },
    {
      question: "What goes with my wardrobe?",
      icon: "👗"
    },
    {
      question: "What's trending for my body type?",
      icon: "✨"
    }
  ];

  return (
    <div className="space-y-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center text-[#292824] text-lg font-medium"
      >
        Get an answer on any fashion question
      </motion.p>

      {/* Common Questions */}
      <div className="max-w-2xl mx-auto space-y-3">
        {capabilities.map((cap, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ x: 5 }}
            className="w-full text-left px-6 py-4 bg-white border border-[#f0f0f5] rounded-xl text-[#292824] text-sm font-medium hover:border-[#606DFF]/30 hover:bg-[#f6f6fa] transition-all flex items-center gap-3"
          >
            <span className="text-xl">{cap.icon}</span>
            <span>{cap.question}</span>
            <span className="ml-auto text-[#606DFF]">→</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LoviAiAssistantDemo;
