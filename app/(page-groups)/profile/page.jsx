'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
    console.log('Saved:', profileData);
  };

  return (
    <div className="min-h-screen px-4 py-32">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="gradient-orb orb-blue w-[500px] h-[500px] absolute top-[-250px] left-[-100px]" />
        <div className="gradient-orb orb-purple w-[600px] h-[600px] absolute top-[30%] right-[-200px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#292824]">
              My Profile
            </h1>
            <p className="text-[#5a5a5f] text-lg">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="glass-card rounded-3xl p-8 mb-6">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-[#606DFF]/10">
              <div className="w-24 h-24 rounded-full bg-linear-to-r from-[#606DFF] to-[#5570FF] flex items-center justify-center text-white text-3xl font-bold">
                {profileData.name.charAt(0)}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#292824] mb-1">
                  {profileData.name}
                </h2>
                <p className="text-[#5a5a5f]">{profileData.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 rounded-xl border border-[#606DFF] text-[#606DFF] hover:bg-[#606DFF] hover:text-white transition-all font-semibold"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-[#292824] font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isEditing
                      ? 'border-[#606DFF]/20 focus:border-[#606DFF] focus:ring-2 focus:ring-[#606DFF]/20'
                      : 'border-[#606DFF]/10 bg-[#f6f6fa]'
                  } transition-all`}
                />
              </div>

              <div>
                <label className="block text-[#292824] font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isEditing
                      ? 'border-[#606DFF]/20 focus:border-[#606DFF] focus:ring-2 focus:ring-[#606DFF]/20'
                      : 'border-[#606DFF]/10 bg-[#f6f6fa]'
                  } transition-all`}
                />
              </div>

              <div>
                <label className="block text-[#292824] font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isEditing
                      ? 'border-[#606DFF]/20 focus:border-[#606DFF] focus:ring-2 focus:ring-[#606DFF]/20'
                      : 'border-[#606DFF]/10 bg-[#f6f6fa]'
                  } transition-all`}
                />
              </div>

              <div>
                <label className="block text-[#292824] font-semibold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isEditing
                      ? 'border-[#606DFF]/20 focus:border-[#606DFF] focus:ring-2 focus:ring-[#606DFF]/20'
                      : 'border-[#606DFF]/10 bg-[#f6f6fa]'
                  } transition-all`}
                />
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="liquid-glass-button w-full py-3 rounded-xl font-semibold text-lg"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Additional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orders */}
            <Link href="/orders" className="glass-card rounded-3xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#606DFF]/10 flex items-center justify-center group-hover:bg-[#606DFF] transition-all">
                  <svg className="w-6 h-6 text-[#606DFF] group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#292824]">My Orders</h3>
                  <p className="text-[#5a5a5f] text-sm">View order history</p>
                </div>
              </div>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="glass-card rounded-3xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#606DFF]/10 flex items-center justify-center group-hover:bg-[#606DFF] transition-all">
                  <svg className="w-6 h-6 text-[#606DFF] group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#292824]">Wishlist</h3>
                  <p className="text-[#5a5a5f] text-sm">Saved items</p>
                </div>
              </div>
            </Link>

            {/* Settings */}
            <Link href="/settings" className="glass-card rounded-3xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#606DFF]/10 flex items-center justify-center group-hover:bg-[#606DFF] transition-all">
                  <svg className="w-6 h-6 text-[#606DFF] group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#292824]">Settings</h3>
                  <p className="text-[#5a5a5f] text-sm">Account settings</p>
                </div>
              </div>
            </Link>

            {/* Logout */}
            <button className="glass-card rounded-3xl p-6 hover:shadow-lg transition-all group text-left">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-500 transition-all">
                  <svg className="w-6 h-6 text-red-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#292824]">Logout</h3>
                  <p className="text-[#5a5a5f] text-sm">Sign out of account</p>
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
