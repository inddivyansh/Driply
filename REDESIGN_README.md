# Driply — AI Fashion E-Commerce Platform

## 🎨 Design Overview

Driply has been completely redesigned from scratch with a modern, dark-themed aesthetic featuring:

- **Dark Base Theme**: Deep blacks (#0a0a0f) with subtle gradients
- **Neon Accents**: Electric Blue (#00d9ff), Hot Pink (#ff2d95), Purple Glow (#b537f2)
- **Typography**: Inter & Poppins fonts (matching lovi.care)
- **Layout**: Centered, fluid design with glass morphism effects

## ✨ Key Features

### 1. Hero Section
- Bold headline: "Meet Driply — Your AI Fashion Co-Pilot"
- Dual CTAs: "Explore Store" and "Try AI Mode"
- Floating stats cards with animations
- Ambient gradient orbs for depth

### 2. Core USPs Section
Showcases three main value propositions:
1. **Agentic Automation** — Your AI Sales Team
2. **Omnichannel Personalization** — One Experience, Everywhere  
3. **Smart, Human-Like Recommendations**

### 3. Product Store (Myntra-style)
- Grid-based product display (2/3/4 columns)
- Category filtering (Streetwear, Casual, Ethnic, Formal, Basics)
- Hover effects with glow animations
- Quick view overlay on product cards
- Product ratings and discount badges

### 4. AI Mode Toggle Card
- Fixed right-side card (desktop only)
- Toggle between regular and AI-powered mode
- Shows AI features when active
- Animated floating particles effect

### 5. Updated Components
- **Header**: Navigation with gradient logo, no app store button
- **Footer**: Multi-column layout with social links
- **Testimonials**: Horizontal scroll with glass cards
- **FAQ**: Accordion-style with smooth animations

## 🎯 Design Principles

1. **Playful & Confident**: Trendy tone with emoji accents
2. **Smooth Animations**: Fade-ins, parallax, hover glows
3. **Centered Layout**: Maximum 1400px container with proper spacing
4. **Glass Morphism**: Translucent cards with backdrop blur
5. **Gradient Accents**: Electric blues, hot pinks, purple glows

## 🚀 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: Framer Motion
- **Fonts**: Inter (primary), Poppins (headings)
- **Images**: Next.js Image optimization

## 📁 File Structure

```
app/
├── layout.js                    # Root layout with theme
├── page.js                      # Main homepage
├── (landing-sections)/
│   ├── HeroSection.jsx         # Hero with CTAs
│   ├── CoreUsps.jsx            # 3 USPs section
│   ├── ProductStore.jsx        # Myntra-style grid
│   ├── Testimonials.jsx        # Customer reviews
│   └── Faq.jsx                 # FAQ accordion
├── components/
│   ├── Header.jsx              # Navigation
│   ├── Footer.jsx              # Footer
│   ├── AiModeCard.jsx          # AI Mode toggle
│   └── Card.jsx                # Reusable card components
└── styles/
    └── globals.css             # Global styles & animations
```

## 🎨 Color Palette

```css
--background: #0a0a0f
--background-secondary: #131318
--foreground: #ffffff
--text-secondary: #b4b4c8
--text-muted: #6b6b7a

--neon-blue: #00d9ff
--neon-pink: #ff006e
--neon-purple: #b537f2
--electric-blue: #0066ff
--hot-pink: #ff2d95
```

## 🌟 Custom Animations

- **fadeInUp**: Fade in with upward motion
- **glow**: Pulsing neon glow effect
- **float**: Gentle floating animation
- **shimmer**: Shimmer effect for loading states
- **pulse-glow**: Pulsing gradient orbs

## 📱 Responsive Design

- **Mobile**: Single column, touch-friendly
- **Tablet**: 2-3 column grid
- **Desktop**: Full 4-column grid with AI card
- **Large Desktop**: Centered 1400px container

## 🔧 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Brand Voice

- **Playful**: Emojis, casual language
- **Confident**: Bold headlines, strong CTAs
- **Trendy**: Modern design, on-trend aesthetics
- **Smart**: AI-powered features highlighted

---

Built with ❤️ and AI by Driply Team
