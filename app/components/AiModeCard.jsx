'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AiModeCard = () => {
  const [isAiMode, setIsAiMode] = useState(false);

  const toggleAiMode = () => {
    setIsAiMode(!isAiMode);
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative"
      >
        {/* AI Mode Toggle Card */}
        <div 
          className={`glass rounded-3xl p-8 w-80 transition-all duration-500 ${
            isAiMode 
              ? 'shadow-[0_0_80px_rgba(181,55,242,0.6)] border-2 border-[#b537f2]' 
              : 'shadow-2xl border border-white/10'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✨</div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-primary)' }}>
                AI Mode
              </h3>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={toggleAiMode}
              className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                isAiMode 
                  ? 'bg-linear-to-r from-[#00d9ff] to-[#b537f2]' 
                  : 'bg-[#2a2a35]'
              }`}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{ x: isAiMode ? 36 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {isAiMode ? (
              <motion.div
                key="ai-on"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {/* AI Active Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                    <span className="text-[#00ff88] text-sm font-semibold">AI Assistant Active</span>
                  </div>

                  <p className="text-[#b4b4c8] text-sm mb-6">
                    Your personal AI shopping agent is now analyzing your preferences and finding the best matches for you.
                  </p>

                  {/* AI Features */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-lg">🤖</div>
                      <div>
                        <p className="text-white text-sm font-semibold">Smart Recommendations</p>
                        <p className="text-[#6b6b7a] text-xs">Based on your style & budget</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="text-lg">💬</div>
                      <div>
                        <p className="text-white text-sm font-semibold">Natural Language Search</p>
                        <p className="text-[#6b6b7a] text-xs">Ask in your own words</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="text-lg">⚡</div>
                      <div>
                        <p className="text-white text-sm font-semibold">Auto Checkout</p>
                        <p className="text-[#6b6b7a] text-xs">Handles everything for you</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-4 space-y-2">
                    <button className="w-full py-3 bg-linear-to-r from-[#00d9ff] to-[#b537f2] text-white rounded-xl font-semibold text-sm hover:scale-105 transition-transform">
                      Ask AI Stylist
                    </button>
                    <button className="w-full py-3 glass-light text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
                      View AI Picks
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ai-off"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <p className="text-[#b4b4c8] text-sm mb-6">
                    Enable AI Mode to get personalized recommendations, natural language search, and autonomous shopping assistance.
                  </p>

                  {/* Benefits Preview */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00d9ff] rounded-full" />
                      <p className="text-[#6b6b7a] text-xs">3x faster product discovery</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#ff2d95] rounded-full" />
                      <p className="text-[#6b6b7a] text-xs">Personalized to your style</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#b537f2] rounded-full" />
                      <p className="text-[#6b6b7a] text-xs">Smart price comparisons</p>
                    </div>
                  </div>

                  <button 
                    onClick={toggleAiMode}
                    className="w-full py-3 glass-light text-white rounded-xl font-semibold text-sm hover:bg-linear-to-r hover:from-[#00d9ff] hover:to-[#b537f2] transition-all"
                  >
                    Activate AI Mode →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Powered By Badge */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#6b6b7a] text-xs">Powered by</span>
              <span className="text-xs font-bold bg-linear-to-r from-[#00d9ff] to-[#b537f2] bg-clip-text text-transparent">
                Agentic AI
              </span>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        {isAiMode && (
          <div className="absolute inset-0 pointer-events-none">
            {[
              { x: [-100, 50], y: [-50, 100], duration: 3 },
              { x: [80, -120], y: [100, -80], duration: 3.5 },
              { x: [-50, 120], y: [-100, 50], duration: 2.8 },
              { x: [100, -80], y: [80, -100], duration: 3.2 },
              { x: [-120, 60], y: [50, -120], duration: 2.5 },
              { x: [60, -100], y: [-80, 120], duration: 3.8 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#b537f2] rounded-full"
                initial={{ 
                  x: particle.x[0], 
                  y: particle.y[0],
                  opacity: 0 
                }}
                animate={{ 
                  x: particle.x, 
                  y: particle.y,
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: particle.duration, 
                  repeat: Infinity,
                  delay: i * 0.3 
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AiModeCard;
