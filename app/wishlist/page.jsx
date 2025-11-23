'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const WishlistPage = () => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch user profile
    fetch('http://localhost:8001/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => {
      localStorage.removeItem('token');
      router.push('/login');
    });

    // Fetch wishlist
    fetchWishlist();
  }, [router]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8001/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.wishlist) {
        setWishlist(data.wishlist);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8001/wishlist/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh wishlist
      fetchWishlist();
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f6f6fa] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#151581]">My Wishlist</h1>
            <p className="text-[#5a5a8f]">Saved items you love</p>
          </div>
          <button
            onClick={() => router.push('/store')}
            className="px-4 py-2 glass-light text-[#6c47ff] font-bold rounded-xl hover:bg-white/80 transition-all"
          >
            ← Back to Store
          </button>
        </div>

        {/* Wishlist Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#6c47ff]/30 border-t-[#6c47ff] rounded-full animate-spin"></div>
            <p className="text-[#5a5a8f] mt-4">Loading wishlist...</p>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl">
            <svg className="w-24 h-24 mx-auto text-[#5a5a8f]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-bold text-[#151581] mb-2">Your wishlist is empty</h3>
            <p className="text-[#5a5a8f] mb-6">Start adding items you love!</p>
            <button
              onClick={() => router.push('/store')}
              className="px-6 py-3 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-bold hover:scale-105 transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item, idx) => (
              <motion.div
                key={item.WishlistId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/50 group"
              >
                {item.ProductImage && (
                  <div className="aspect-square relative overflow-hidden">
                    <img src={item.ProductImage} alt={item.ProductName} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFromWishlist(item.WishlistId)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-[#151581] text-sm line-clamp-2 mb-2">{item.ProductName}</h3>
                  <p className="text-[#6c47ff] font-bold text-lg mb-3">₹{item.ProductPrice}</p>
                  <button
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
