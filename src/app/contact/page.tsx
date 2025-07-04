import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Kontak & Reservasi - Joglo Breeze | Booking Hotel Joglo Bali",
  description: "Hubungi Joglo Breeze untuk reservasi dan informasi lebih lanjut. Dapatkan penawaran terbaik untuk penginapan tradisional joglo di Bali. WhatsApp, email, dan lokasi lengkap tersedia.",
  keywords: [
    "kontak joglo breeze",
    "reservasi hotel bali",
    "booking joglo breeze",
    "whatsapp hotel bali",
    "email penginapan bali",
    "alamat joglo breeze",
    "lokasi hotel joglo bali",
    "hubungi guesthouse bali",
    "reservasi penginapan tradisional",
    "contact hotel bali",
    "booking online bali",
    "informasi hotel joglo"
  ],
  openGraph: {
    title: "Kontak & Reservasi - Joglo Breeze | Booking Hotel Joglo Bali",
    description: "Hubungi Joglo Breeze untuk reservasi dan informasi lebih lanjut. Dapatkan penawaran terbaik untuk penginapan tradisional joglo di Bali.",
    url: "https://joglobreeze.vercel.app/contact",
    images: [
      {
        url: "/images/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Kontak Joglo Breeze - Reservasi Hotel Joglo Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak & Reservasi - Joglo Breeze | Booking Hotel Joglo Bali",
    description: "Hubungi Joglo Breeze untuk reservasi dan informasi lebih lanjut. Dapatkan penawaran terbaik untuk penginapan tradisional joglo di Bali.",
    images: ["/images/contact-hero.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return <ContactClient />;
}
