import { Metadata } from 'next';
import RoomsClient from './RoomsClient';

export const metadata: Metadata = {
  title: "Kamar & Tarif - Joglo Breeze | Booking Hotel & Penginapan Joglo Bali",
  description: "Lihat pilihan kamar di Joglo Breeze dengan fasilitas lengkap, harga terjangkau, dan pemandangan menawan. Reservasi sekarang untuk pengalaman menginap tak terlupakan di guesthouse tradisional joglo Bali.",
  keywords: [
    "kamar joglo breeze",
    "tarif hotel bali",
    "booking joglo breeze",
    "harga penginapan bali",
    "reservasi hotel joglo",
    "kamar guesthouse bali",
    "booking hotel bali",
    "penginapan murah bali",
    "villa joglo bali",
    "homestay tradisional bali",
    "kamar dengan fasilitas lengkap",
    "hotel dekat pantai bali",
    "akomodasi nyaman bali"
  ],
  openGraph: {
    title: "Kamar & Tarif - Joglo Breeze | Booking Hotel & Penginapan Joglo Bali",
    description: "Lihat pilihan kamar di Joglo Breeze dengan fasilitas lengkap, harga terjangkau, dan pemandangan menawan. Reservasi sekarang untuk pengalaman menginap tak terlupakan.",
    url: "https://joglobreeze.vercel.app/rooms",
    images: [
      {
        url: "/images/room1.jpg",
        width: 1200,
        height: 630,
        alt: "Kamar Joglo Breeze - Penginapan Tradisional Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamar & Tarif - Joglo Breeze | Booking Hotel & Penginapan Joglo Bali",
    description: "Lihat pilihan kamar di Joglo Breeze dengan fasilitas lengkap, harga terjangkau, dan pemandangan menawan. Reservasi sekarang!",
    images: ["/images/room1.jpg"],
  },
  alternates: {
    canonical: "/rooms",
  },
};

export default function Rooms() {
  return <RoomsClient />;
}
