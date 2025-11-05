'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const ProductStore = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [filter, setFilter] = useState('all');

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Urban Streetwear Hoodie',
      price: '₹2,499',
      originalPrice: '₹3,999',
      discount: '38% OFF',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
      category: 'streetwear',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      price: '₹3,299',
      originalPrice: '₹5,999',
      discount: '45% OFF',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
      category: 'casual',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Festive Kurta Set',
      price: '₹2,899',
      originalPrice: '₹4,999',
      discount: '42% OFF',
      image: 'https://images.unsplash.com/photo-1583391733981-5ef48a287ea8?w=600&h=800&fit=crop',
      category: 'ethnic',
      rating: 4.8,
    },
    {
      id: 4,
      name: 'Minimalist White Tee',
      price: '₹899',
      originalPrice: '₹1,499',
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
      category: 'basics',
      rating: 4.6,
    },
    {
      id: 5,
      name: 'Premium Leather Sneakers',
      price: '₹4,999',
      originalPrice: '₹8,999',
      discount: '44% OFF',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
      category: 'footwear',
      rating: 4.9,
    },
    {
      id: 6,
      name: 'Tailored Black Blazer',
      price: '₹5,499',
      originalPrice: '₹9,999',
      discount: '45% OFF',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
      category: 'formal',
      rating: 4.7,
    },
    {
      id: 7,
      name: 'Cargo Pants - Olive',
      price: '₹1,999',
      originalPrice: '₹3,499',
      discount: '43% OFF',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
      category: 'streetwear',
      rating: 4.4,
    },
    {
      id: 8,
      name: 'Floral Summer Dress',
      price: '₹2,299',
      originalPrice: '₹4,499',
      discount: '49% OFF',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
      category: 'casual',
      rating: 4.8,
    },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'streetwear', label: 'Streetwear' },
    { id: 'casual', label: 'Casual' },
    { id: 'ethnic', label: 'Ethnic' },
    { id: 'formal', label: 'Formal' },
    { id: 'basics', label: 'Basics' },
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section id="store" ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="container-center">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="glass-light rounded-full py-3 px-6 mb-6">
              <p className="font-semibold text-[#ff2d95] text-sm uppercase tracking-wider">Shop Now</p>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Curated Fashion Collection
          </motion.h2>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === cat.id
                    ? 'bg-[#606DFF] text-white shadow-md'
                    : 'bg-white border border-[#f0f0f5] text-[#5a5a5f] hover:border-[#606DFF]/30 hover:text-[#292824]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="product-card group cursor-pointer"
            >
              <div className="glass rounded-3xl overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#131318]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-[#ff2d95] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.discount}
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#00d9ff] hover:text-white transition-all">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-[#b4b4c8] text-sm">{product.rating}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-xl">{product.price}</span>
                    <span className="text-[#6b6b7a] line-through text-sm">{product.originalPrice}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-10 py-5 bg-[#606DFF] text-white rounded-full font-semibold text-lg hover:bg-[#5570FF] transition-all">
            Load More Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductStore;
