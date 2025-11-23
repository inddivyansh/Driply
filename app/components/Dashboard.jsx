'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8001/user/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Loyalty Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl border border-white/50 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#ffd700]/20 to-transparent rounded-bl-full"></div>
        <h3 className="text-[#151581] font-bold text-lg mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-[#ffd700]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Loyalty Status
        </h3>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold text-[#6c47ff]">{user.LoyaltyPoints || 0}</span>
          <span className="text-[#5a5a8f] font-medium mb-1">points</span>
        </div>
        <div className="inline-block px-3 py-1 bg-[#ffd700]/20 text-[#b8860b] rounded-full text-xs font-bold uppercase tracking-wide">
          {user.Tier || 'Bronze'} Member
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2 glass p-6 rounded-2xl border border-white/50 shadow-lg"
      >
        <h3 className="text-[#151581] font-bold text-lg mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-[#6c47ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Recent Orders
        </h3>
        
        {loading ? (
          <div className="text-[#5a5a8f] text-sm">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-[#5a5a8f] text-sm">No recent orders found.</div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 2).map((order, idx) => (
              <div key={`order-${order.OrderId || idx}`} className="flex items-center justify-between p-3 glass-light rounded-xl border border-white/50">
                <div>
                  <p className="text-[#151581] font-bold text-sm">Order #{order.OrderId}</p>
                  <p className="text-[#5a5a8f] text-xs">{new Date(order.OrderDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#6c47ff] font-bold text-sm">₹{order.Total}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    order.Status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.Status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length > 2 && (
               <button className="text-[#6c47ff] text-xs font-bold hover:underline w-full text-center mt-2">
                 View All Orders
               </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
