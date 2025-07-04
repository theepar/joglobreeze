import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "Tentang Joglo Breeze - Penginapan Tradisional Joglo Bali | Sejarah & Filosofi",
  description: "Temukan kisah di balik Joglo Breeze, guesthouse tradisional joglo Bali yang menggabungkan arsitektur klasik dengan kenyamanan modern. Pelajari filosofi dan komitmen kami dalam memberikan pengalaman menginap autentik.",
  keywords: [
    "tentang joglo breeze",
    "sejarah joglo breeze",
    "filosofi joglo bali",
    "arsitektur joglo tradisional",
    "guesthouse bali",
    "penginapan tradisional bali",
    "hotel joglo bali",
    "budaya bali",
    "wisata budaya bali",
    "pengalaman autentik bali"
  ],
  openGraph: {
    title: "Tentang Joglo Breeze - Penginapan Tradisional Joglo Bali",
    description: "Temukan kisah di balik Joglo Breeze, guesthouse tradisional joglo Bali yang menggabungkan arsitektur klasik dengan kenyamanan modern.",
    url: "https://joglobreeze.vercel.app/about",
    images: [
      {
        url: "/images/about-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Tentang Joglo Breeze - Arsitektur Tradisional Joglo Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Joglo Breeze - Penginapan Tradisional Joglo Bali",
    description: "Temukan kisah di balik Joglo Breeze, guesthouse tradisional joglo Bali yang menggabungkan arsitektur klasik dengan kenyamanan modern.",
    images: ["/images/about-hero.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
