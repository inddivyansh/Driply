'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import PaymentModal from '../../../components/PaymentModal';
import AddressModal from '../../../components/AddressModal';
import OrderConfirmation from '../../../components/OrderConfirmation';

const ProductDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  // State
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Purchase Flow State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Fetch Product Details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch product from API (you may need to adjust this endpoint)
        const res = await fetch(`http://localhost:8001/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          // Set default size if available
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

  // Mock product data structure for demonstration
  // In production, this should come from the API
  const mockProduct = {
    id: productId,
    title: "Floral Embroidered V-Neck Mirror Work Straight Kurta With Palazzos & Dupatta",
    brand: "Anouk",
    price: 2499,
    mrp: 9999,
    discount: 75,
    rating: 3.9,
    totalRatings: 1300,
    images: [
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800"
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: "Floral embroidered V-neck mirror work straight kurta with palazzos and dupatta. Beautiful traditional ethnic wear perfect for festive occasions.",
    features: [
      "100% Original Products",
      "Pay on delivery might be available",
      "Easy 7 days returns and exchanges"
    ],
    offers: [
      {
        title: "Best Price",
        value: "Rs. 2199",
        condition: "Applicable on: Orders above Rs. 349 (only on first purchase)"
      },
      {
        title: "Coupon code",
        value: "MYNTRAEXCLUSIVE",
        condition: "30% off (Your total savings: Rs. 7800)"
      },
      {
        title: "Bank Offer",
        value: "10% Instant Discount on Canara Bank Credit Card",
        condition: "Min Spend ₹3,000, Max Discount ₹1,000"
      }
    ]
  };

  // Use mock data if API data not available
  const displayProduct = product || mockProduct;

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setDeliveryInfo({
        available: true,
        deliveryDate: "Expected delivery by 28 Nov 2025",
        cod: true
      });
    }
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // TODO: Call wishlist API
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
      
      const res = await fetch('http://localhost:8001/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: displayProduct.id || displayProduct.product_id,
          product_name: displayProduct.title,
          product_title: displayProduct.title,
          quantity: quantity,
          price: displayProduct.price,
          size: selectedSize,
          payment_method: selectedPaymentMethod,
          delivery_address: address,
          delivery_method: deliveryMethod || 'Delivery',
          source: displayProduct.source || 'westside',
          image_url: displayProduct.image_url || displayProduct.images?.[0]
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
    setSelectedPaymentMethod(null);
    setOrderData(null);
    router.push('/orders');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6fa] flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[#6c47ff] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#6c47ff] rounded-full animate-bounce delay-75"></div>
          <div className="w-3 h-3 bg-[#6c47ff] rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6fa] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-[#5a5a8f] hover:text-[#6c47ff] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl overflow-hidden border border-white/50 aspect-[3/4] relative"
            >
              <img 
                src={displayProduct.images?.[selectedImage] || displayProduct.image_url || "/api/placeholder/600/800"} 
                alt={displayProduct.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {(displayProduct.images || [displayProduct.image_url]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`glass rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    selectedImage === idx ? 'border-[#6c47ff]' : 'border-white/50 hover:border-[#6c47ff]/50'
                  }`}
                >
                  <img src={img || "/api/placeholder/150/150"} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <h2 className="text-[#6c47ff] font-bold text-lg mb-2">{displayProduct.brand || "Anouk"}</h2>
              <h1 className="text-[#151581] font-bold text-2xl md:text-3xl leading-snug">
                {displayProduct.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 glass-light w-fit px-4 py-2 rounded-lg border border-white/50">
              <div className="flex items-center gap-1">
                <span className="text-[#151581] font-bold">{displayProduct.rating || "3.9"}</span>
                <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              </div>
              <span className="text-[#5a5a8f] text-sm">
                {displayProduct.totalRatings || "1.3k"} Ratings
              </span>
            </div>

            {/* Price */}
            <div className="glass rounded-2xl p-5 border border-white/50">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[#151581] font-bold text-3xl">₹{displayProduct.price}</span>
                <span className="text-[#5a5a8f] line-through text-lg">MRP ₹{displayProduct.mrp || displayProduct.price * 4}</span>
                <span className="text-green-600 font-bold text-lg">
                  ({displayProduct.discount || "75"}% OFF)
                </span>
              </div>
              <p className="text-[#5a5a8f] text-sm">inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#151581] font-bold">SELECT SIZE</h3>
                <button className="text-[#6c47ff] text-sm font-semibold hover:underline">
                  SIZE CHART →
                </button>
              </div>
              <div className="flex gap-3">
                {(displayProduct.sizes || ['M', 'L', 'XL', 'XXL']).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 rounded-full font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white scale-110 shadow-lg'
                        : 'glass border border-white/50 text-[#151581] hover:border-[#6c47ff]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToBag}
                disabled={!selectedSize}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#ff4d6d] to-[#ff758c] text-white rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                ADD TO BAG
              </button>
              <button
                onClick={handleWishlist}
                className={`px-6 py-4 rounded-xl border-2 font-bold text-lg hover:scale-105 active:scale-95 transition-all ${
                  isInWishlist 
                    ? 'border-[#ff4d6d] text-[#ff4d6d] bg-[#ff4d6d]/10' 
                    : 'glass border-white/50 text-[#151581]'
                }`}
              >
                <svg className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Delivery Options */}
            <div className="glass rounded-2xl p-5 border border-white/50">
              <h3 className="text-[#151581] font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                DELIVERY OPTIONS
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter pincode"
                  className="flex-1 px-4 py-3 glass-light border border-white/50 rounded-xl text-[#151581] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30"
                />
                <button
                  onClick={handleCheckPincode}
                  className="px-6 py-3 bg-gradient-to-r from-[#6c47ff] to-[#4169e1] text-white rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all"
                >
                  Check
                </button>
              </div>
              <p className="text-[#5a5a8f] text-sm">
                Please enter PIN code to check delivery time & Pay on Delivery Availability
              </p>

              {deliveryInfo && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-start gap-2 text-green-600">
                    <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{deliveryInfo.deliveryDate}</span>
                  </div>
                  {deliveryInfo.cod && (
                    <div className="flex items-start gap-2 text-[#5a5a8f]">
                      <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Pay on delivery might be available</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Features */}
              <div className="mt-4 pt-4 border-t border-white/50 space-y-2">
                {(displayProduct.features || mockProduct.features).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#5a5a8f]">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Offers */}
            <div className="glass rounded-2xl p-5 border border-white/50">
              <h3 className="text-[#151581] font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                BEST OFFERS
              </h3>
              <div className="space-y-3">
                {(displayProduct.offers || mockProduct.offers).map((offer, idx) => (
                  <div key={idx} className="glass-light rounded-xl p-4 border border-white/50">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-[#151581] font-bold">{offer.title}:</span>
                      <span className="text-[#ff4d6d] font-bold">{offer.value}</span>
                    </div>
                    <p className="text-[#5a5a8f] text-sm">{offer.condition}</p>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-[#6c47ff] text-sm font-semibold hover:underline">
                View Eligible Products
              </button>
            </div>

            {/* Product Description */}
            {displayProduct.description && (
              <div className="glass rounded-2xl p-5 border border-white/50">
                <h3 className="text-[#151581] font-bold mb-3">Product Details</h3>
                <p className="text-[#5a5a8f] leading-relaxed">{displayProduct.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Flow Modals */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        product={displayProduct}
        onSelectPayment={handlePaymentSelect}
      />

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        product={displayProduct}
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

export default ProductDetailPage;
