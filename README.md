# Joglo Breeze - Balinese Guesthouse Website

A beautiful and responsive website for Joglo Breeze, a traditional Balinese guesthouse offering authentic accommodation experiences.

## Features

### 🎨 Design & UX
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI**: Clean, modern design with traditional Balinese elements
- **Smooth Animations**: Slide-in animations on scroll using IntersectionObserver
- **Interactive Gallery**: Image slider with navigation arrows, thumbnails, and dot indicators

### 📱 Navigation
- **Responsive Navbar**: Adaptive navigation with hamburger menu for mobile
- **Active State Indicators**: Visual feedback for current page
- **Mobile-Friendly**: Collapsible menu for better mobile experience

### 🏠 Pages
- **Home**: Hero section, interactive gallery, about, rooms, amenities, location
- **About**: Detailed information about the joglo architecture and facilities
- **Rooms**: Room showcase with WhatsApp booking integration
- **Contact**: Contact form with validation and booking functionality

### 🛠 Technical Features
- **Next.js 15**: Latest Next.js framework with App Router
- **TypeScript**: Full TypeScript support for type safety
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vercel Analytics**: Built-in analytics tracking
- **Form Validation**: Real-time form validation with error handling
- **SEO Optimized**: Proper meta tags and structured data

### 📱 Integrations
- **WhatsApp Integration**: Direct booking via WhatsApp
- **Google Maps**: Embedded location map
- **Email Support**: Contact form with email functionality

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production
```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ClientScripts.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── rooms/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
└── public/
    └── image/
        ├── header.jpg
        ├── room-1.jpg
        ├── room-2.jpg
        └── ...
```

## Key Features Implementation

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexible grid layouts and spacing

### Animation System
- IntersectionObserver for scroll-triggered animations
- Smooth transitions with Tailwind CSS classes
- Staggered animations for better visual flow

### Gallery Slider
- Custom image slider with navigation
- Thumbnail navigation
- Dot indicators
- Touch/swipe support ready

### Form Validation
- Real-time validation
- Email and phone number validation
- Date validation for booking
- User-friendly error messages

## Technologies Used
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel Analytics** - Analytics tracking
- **React Hooks** - State management

## Contact
For inquiries about Joglo Breeze guesthouse:
- WhatsApp: +62 819 3631 1058
- Location: Bali, Indonesia

---

© 2024 Joglo Breeze. All rights reserved.
