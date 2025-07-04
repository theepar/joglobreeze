"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Joglo Breeze
          </Link>
          <div className="hidden md:flex space-x-8 text-gray-600">
            <Link
              href="/"
              className={`transition-colors font-medium ${
                isActive("/")
                  ? "text-amber-600 hover:text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className={`transition-colors font-medium ${
                isActive("/rooms")
                  ? "text-amber-600 hover:text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Rooms
            </Link>
            <Link
              href="/about"
              className={`transition-colors font-medium ${
                isActive("/about")
                  ? "text-amber-600 hover:text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-colors font-medium ${
                isActive("/contact")
                  ? "text-amber-600 hover:text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-5 rounded-lg transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
