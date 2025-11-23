'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const OrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
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

    // Fetch orders
    fetch('http://localhost:8001/user/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.orders) {
        setOrders(data.orders);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch orders:', err);
      setLoading(false);
    });
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f6f6fa] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#151581]">My Orders</h1>
            <p className="text-[#5a5a8f]">View your order history and track deliveries</p>
          </div>
          <button
            onClick={() => router.push('/store')}
            className="px-4 py-2 glass-light text-[#6c47ff] font-bold rounded-xl hover:bg-white/80 transition-all"
          >
            ← Back to Store
          </button>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#6c47ff]/30 border-t-[#6c47ff] rounded-full animate-spin"></div>
            <p className="text-[#5a5a8f] mt-4">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl">
            <svg className="w-24 h-24 mx-auto text-[#5a5a8f]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-xl font-bold text-[#151581] mb-2">No orders yet</h3>
            <p className="text-[#5a5a8f] mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => router.push('/store')}
              className="px-6 py-3 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-bold hover:scale-105 transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <motion.div
                key={`order-${order.OrderId || idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-white/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#151581]">Order #{order.OrderId}</h3>
                    <p className="text-sm text-[#5a5a8f]">{new Date(order.OrderDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.Status === 'Paid' || order.Status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : order.Status.includes('Pending')
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.Status}
                  </span>
                </div>

                <div className="border-t border-white/50 pt-4">
                  <p className="text-sm text-[#5a5a8f] mb-2">Items:</p>
                  <p className="text-[#151581] font-medium">{order.Items}</p>
                  
                  {order.DeliveryAddress && (
                    <div className="mt-3">
                      <p className="text-sm text-[#5a5a8f] mb-1">Delivery Address:</p>
                      <p className="text-[#151581] text-sm">{order.DeliveryAddress}</p>
                    </div>
                  )}

                  {order.PaymentMethod && (
                    <div className="mt-2">
                      <p className="text-sm text-[#5a5a8f] mb-1">Payment Method:</p>
                      <p className="text-[#151581] text-sm font-medium">{order.PaymentMethod.toUpperCase()}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/50">
                    <p className="text-2xl font-bold text-[#6c47ff]">₹{order.Total}</p>
                    {order.Images && order.Images.length > 0 && order.Images[0] && (
                      <div className="flex gap-2">
                        {order.Images.slice(0, 3).map((img, i) => (
                          img && (
                            <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-white/50">
                              <img src={img} alt="Product" className="w-full h-full object-cover" />
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
