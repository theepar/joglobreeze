import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joglo Breeze - Penginapan Tradisional Joglo Bali | Hotel Guesthouse Terbaik",
  description: "Joglo Breeze menawarkan pengalaman menginap autentik di guesthouse tradisional joglo Bali. Nikmati suasana tenang, fasilitas lengkap, dan pelayanan terbaik untuk liburan sempurna Anda di Bali.",
  keywords: [
    "joglo breeze",
    "penginapan bali",
    "hotel bali",
    "guesthouse bali",
    "joglo tradisional",
    "penginapan joglo",
    "hotel joglo bali",
    "villa bali",
    "homestay bali",
    "akomodasi bali",
    "penginapan murah bali",
    "hotel tradisional bali",
    "booking hotel bali",
    "liburan bali",
    "wisata bali",
    "penginapan nyaman bali",
    "hotel dekat pantai bali",
    "villa tradisional bali"
  ],
  authors: [{ name: "Joglo Breeze" }],
  creator: "Joglo Breeze",
  publisher: "Joglo Breeze",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://joglobreeze.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Joglo Breeze - Penginapan Tradisional Joglo Bali | Hotel Guesthouse Terbaik",
    description: "Joglo Breeze menawarkan pengalaman menginap autentik di guesthouse tradisional joglo Bali. Nikmati suasana tenang, fasilitas lengkap, dan pelayanan terbaik untuk liburan sempurna Anda di Bali.",
    url: "https://joglobreeze.vercel.app/",
    siteName: "Joglo Breeze",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Joglo Breeze - Penginapan Tradisional Joglo Bali",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joglo Breeze - Penginapan Tradisional Joglo Bali",
    description: "Joglo Breeze menawarkan pengalaman menginap autentik di guesthouse tradisional joglo Bali. Nikmati suasana tenang, fasilitas lengkap, dan pelayanan terbaik.",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Joglo Breeze",
    "description": "Joglo Breeze menawarkan pengalaman menginap autentik di guesthouse tradisional joglo Bali. Nikmati suasana tenang, fasilitas lengkap, dan pelayanan terbaik untuk liburan sempurna Anda di Bali.",
    "url": "https://joglobreeze.vercel.app/",
    "telephone": "+62-123-456-7890",
    "email": "info@joglobreeze.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Joglo No. 123",
      "addressLocality": "Ubud",
      "addressRegion": "Bali",
      "postalCode": "80571",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-8.5069",
      "longitude": "115.2625"
    },
    "image": [
      "https://joglobreeze.vercel.app/images/hero-bg.jpg",
      "https://joglobreeze.vercel.app/images/room1.jpg",
      "https://joglobreeze.vercel.app/images/room2.jpg"
    ],
    "priceRange": "$$",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air Conditioning",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Swimming Pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Restaurant",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Garden",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Spa",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Water Heater",
        "value": true
      }
    ],
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "checkinTime": "14:00",
    "checkoutTime": "12:00",
    "numberOfRooms": "12",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": ["IDR", "USD"],
    "smokingAllowed": false,
    "petsAllowed": false,
    "sameAs": [
      "https://www.booking.com/hotel/id/joglo-breeze.html",
      "https://www.airbnb.com/rooms/joglo-breeze",
      "https://www.facebook.com/joglobreeze",
      "https://www.instagram.com/joglobreeze"
    ]
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
