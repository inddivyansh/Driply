import React from 'react';
import '../styles/globals.css';

// Import the components
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Driply — Your AI Fashion Co-Pilot',
  description: 'Agentic AI fashion platform powered by autonomous agents. Personalized shopping, omnichannel experience, and smart recommendations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body 
        className="bg-white text-[#151581] antialiased" 
        style={{ 
          fontFamily: 'var(--font-rebond)',
          overflowX: 'hidden',
          background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 19%, #f6f6fa 21%)'
        }}
      >
        {/* Subtle gradient orbs for premium ambiance */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="gradient-orb orb-blue w-[500px] h-[500px] absolute top-[-250px] left-[-100px]" />
          <div className="gradient-orb orb-purple w-[600px] h-[600px] absolute top-[30%] right-[-200px]" style={{ animationDelay: '2s' }} />
          <div className="gradient-orb orb-pink w-[400px] h-[400px] absolute bottom-[10%] left-[20%]" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Header will be fixed at the top */}
        <Header />
        
        {/* Page content will go here */}
        <main className="relative z-10">
          {children}
        </main>
        
        {/* Footer will be at the bottom */}
        <Footer />
      </body>
    </html>
  );
}