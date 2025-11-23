'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dashboard from '../components/Dashboard';
import PaymentModal from '../components/PaymentModal';
import AddressModal from '../components/AddressModal';
import OrderConfirmation from '../components/OrderConfirmation';

const StorePage = () => {
  const router = useRouter();
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: false });
  
  // State
  const [user, setUser] = useState(null);
  const [isAiMode, setIsAiMode] = useState(false);
  const [showAiPopup, setShowAiPopup] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ category: 'All', price_max: 10000 });
  const [initialProducts, setInitialProducts] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState({ men: [], women: [], kids: [] });
  
  // Purchase Flow State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Auth Check & User Fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Generate random thread ID for this session
    setThreadId(Math.random().toString(36).substring(7));

    // Fetch User Profile
    fetch('http://localhost:8001/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    })
    .then(data => setUser(data))
    .catch(() => {
      localStorage.removeItem('token');
      router.push('/login');
    });
  }, [router]);

  // Fetch Initial Trending Products
  useEffect(() => {
    fetch('http://localhost:8001/products/trending')
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setInitialProducts(data.products);
        }
      })
      .catch(err => console.error("Failed to load trending products", err));
  }, []);

  // Fetch Categorized Products
  useEffect(() => {
    fetch('http://localhost:8001/products/categorized')
      .then(res => res.json())
      .then(data => {
        setCategorizedProducts(data);
      })
      .catch(err => console.error("Failed to load categorized products", err));
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setChatMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8001/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          message: userMsg, 
          thread_id: threadId 
        }),
      });

      const data = await res.json();
      
      if (data.filters) {
        setActiveFilters(prev => ({ ...prev, ...data.filters }));
      }

      setChatMessages(prev => [...prev, { 
        type: 'ai', 
        text: data.response,
        products: data.products 
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { 
        type: 'ai', 
        text: "Sorry, I'm having trouble connecting to the server. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Purchase Flow Handlers
  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setShowPaymentModal(false);
    setShowAddressModal(true);
  };

  const handleAddressSubmit = async (address, deliveryMethod) => {
    setIsCreatingOrder(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Parse price - handle both string and number
      let productPrice = selectedProduct.price;
      if (typeof productPrice === 'string') {
        productPrice = productPrice.replace('₹', '').replace(',', '').trim();
      }
      
      const res = await fetch('http://localhost:8001/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: selectedProduct.id || selectedProduct.product_id,
          product_name: selectedProduct.name || selectedProduct.title,
          product_title: selectedProduct.title || selectedProduct.name,
          quantity: 1,
          price: productPrice,
          payment_method: selectedPaymentMethod,
          delivery_address: address,
          delivery_method: deliveryMethod || 'Delivery',
          source: selectedProduct.source || 'westside',
          image_url: selectedProduct.image_url
        })
      });

      const data = await res.json();
      
      if (res.ok && data.status === 'success') {
        setOrderData(data);
        setShowAddressModal(false);
        setShowOrderConfirmation(true);
      } else {
        alert(`Order failed: ${data.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleCloseOrderConfirmation = () => {
    setShowOrderConfirmation(false);
    setSelectedProduct(null);
    setSelectedPaymentMethod(null);
    setOrderData(null);
  };


  if (!user) return null; // or loading spinner

  return (
    <div className="relative min-h-screen bg-[#f6f6fa]">
      {/* Full-Screen AI Mode Popup */}
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
                Get personalized recommendations based on your history and preferences.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAiPopup(false)} className="flex-1 px-5 py-3 glass-light text-[#5a5a8f] rounded-xl font-semibold hover:bg-white/80 transition-all">
                Maybe Later
              </button>
              <button onClick={() => { setIsAiMode(true); setShowAiPopup(false); }} className="liquid-glass-button flex-1 px-5 py-3 bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold">
                Activate AI Mode
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating AI Button */}
      {!isAiMode && !showAiPopup && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsAiMode(true)}
          className="liquid-glass-button fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center bg-linear-to-r from-[#6c47ff] to-[#4169e1]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!isAiMode ? (
          /* Dashboard & Store View */
          <motion.div
            key="store"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen pt-24 pb-16"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              {/* Header with User Info */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#151581]">Hello, {user.Name}</h1>
                  <p className="text-[#5a5a8f]">Welcome back to your personalized store.</p>
                </div>
                <button 
                  onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}
                  className="px-4 py-2 glass-light text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all"
                >
                  Sign Out
                </button>
              </div>

              {/* Dashboard Component */}
              <Dashboard user={user} />

              {/* Categorized Products */}
              {['men', 'women', 'kids'].map((category) => (
                <section key={category} className="pb-16">
                  <h2 className="text-2xl font-bold text-[#151581] mb-6 capitalize">{category}'s Collection</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categorizedProducts[category]?.length > 0 ? (
                      categorizedProducts[category].map((prod, i) => (
                        <div key={i} className="glass rounded-2xl overflow-hidden border border-white/50 p-4 hover:shadow-lg transition-all group">
                          {prod.image_url ? (
                            <div className="aspect-square relative mb-4 rounded-xl overflow-hidden">
                               <img src={prod.image_url} alt={prod.title} className="object-cover w-full h-full" />
                            </div>
                          ) : (
                            <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">No Image</div>
                          )}
                          <h3 className="font-bold text-[#151581] line-clamp-2 mb-2 text-sm">{prod.title}</h3>
                          <p className="text-[#6c47ff] font-bold mb-3">₹{prod.price}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleBuyNow(prod); }}
                            className="w-full px-4 py-2 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
                          >
                            Buy Now
                          </button>
                        </div>
                      ))
                    ) : (
                      /* Loading Placeholders */
                      [1, 2, 3, 4].map((i) => (
                        <div key={i} className="glass rounded-2xl overflow-hidden border border-white/50 p-4 animate-pulse">
                          <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              ))}
            </div>
          </motion.div>
        ) : (
          /* AI Chat Interface */
          <motion.div
            key="ai-mode"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-[#f6f6fa] z-40 pt-24 flex flex-col"
          >
            <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col w-full">
              {/* Chat Header */}
              <div className="glass rounded-2xl p-4 mb-6 shadow-lg border border-white/50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#6c47ff] to-[#4169e1] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-[#151581] font-bold text-xl">AI Shopping Assistant</h2>
                    <p className="text-[#5a5a8f] text-sm font-medium">Connected to Inventory & Westside</p>
                  </div>
                </div>
                
                {/* Active Filters Display */}
                <div className="hidden md:flex items-center gap-3 px-4 py-2 glass-light rounded-xl border border-white/50">
                  <span className="text-xs font-bold text-[#5a5a8f] uppercase tracking-wide">Active Filters:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#6c47ff]/10 text-[#6c47ff] text-xs font-bold rounded-lg">
                      {activeFilters.category}
                    </span>
                    <span className="px-2 py-1 bg-[#6c47ff]/10 text-[#6c47ff] text-xs font-bold rounded-lg">
                      Max: ₹{activeFilters.price_max}
                    </span>
                  </div>
                </div>

                <button onClick={() => setIsAiMode(false)} className="px-5 py-2.5 glass-light border border-white/50 rounded-xl text-[#151581] font-semibold hover:bg-white/80">
                  Exit AI Mode
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto py-6 space-y-6 custom-scrollbar px-2">
                {chatMessages.length === 0 && (
                  <div className="text-center text-[#5a5a8f] mt-4">
                    <p className="text-lg font-medium mb-6">Ask me anything! Or check out these trending items:</p>
                    
                    {/* Initial Trending Products Grid */}
                    {initialProducts.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
                        {initialProducts.map((prod, pIdx) => (
                          <div key={pIdx} className="bg-white/80 p-3 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                               onClick={() => setInputMessage(`Tell me more about ${prod.title}`)}>
                            {prod.image_url && (
                              <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
                                <img src={prod.image_url} alt={prod.title} className="object-cover w-full h-full" />
                              </div>
                            )}
                            <h4 className="font-bold text-sm line-clamp-1 text-[#151581]">{prod.title}</h4>
                            <p className="text-[#6c47ff] font-bold text-sm">{prod.price}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 justify-center mt-4">
                      <button onClick={() => setInputMessage("Show me gaming laptops")} className="px-4 py-2 glass rounded-xl hover:bg-white">Show me gaming laptops</button>
                      <button onClick={() => setInputMessage("Check my order status")} className="px-4 py-2 glass rounded-xl hover:bg-white">Check my order status</button>
                    </div>
                  </div>
                )}
                
                {chatMessages.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-5 rounded-2xl shadow-lg ${
                      msg.type === 'user' 
                        ? 'bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-tr-sm' 
                        : 'glass border border-white/50 text-[#151581] rounded-tl-sm'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      
                      {/* Product Cards */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {msg.products.map((prod, pIdx) => (
                            <div key={pIdx} className="bg-white/80 p-3 rounded-xl shadow-sm overflow-hidden">
                              {prod.image_url && (
                                <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
                                  <img src={prod.image_url} alt={prod.name || prod.title} className="object-cover w-full h-full" />
                                </div>
                              )}
                              <h4 className="font-bold text-sm line-clamp-1">{prod.name || prod.title}</h4>
                              <p className="text-[#6c47ff] font-bold text-sm mb-2">₹{prod.price}</p>
                              {prod.stock !== undefined && (
                                <p className="text-xs text-gray-500 mb-2">{prod.stock > 0 ? `${prod.stock} in stock` : 'Out of stock'}</p>
                              )}
                              <button
                                onClick={() => prod.product_url ? window.open(prod.product_url, '_blank') : handleBuyNow(prod)}
                                className="w-full px-3 py-2 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-lg font-semibold text-xs hover:scale-105 active:scale-95 transition-all"
                              >
                                {prod.product_url ? 'Buy on Flipkart' : 'Buy Now'}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="glass p-4 rounded-2xl rounded-tl-sm flex gap-2 items-center">
                      <div className="w-2 h-2 bg-[#6c47ff] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#6c47ff] rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-[#6c47ff] rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="py-6">
                <div className="glass rounded-2xl p-4 shadow-lg border border-white/50 flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-6 py-4 glass-light border border-white/50 rounded-xl text-[#151581] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-8 py-4 bg-linear-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Flow Modals */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        product={selectedProduct}
        onSelectPayment={handlePaymentSelect}
      />

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        product={selectedProduct}
        paymentMethod={selectedPaymentMethod}
        onSubmit={handleAddressSubmit}
        isLoading={isCreatingOrder}
      />

      <OrderConfirmation
        isOpen={showOrderConfirmation}
        onClose={handleCloseOrderConfirmation}
        orderData={orderData}
      />
    </div>
  );
};

export default StorePage;
