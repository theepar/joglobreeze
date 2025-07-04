"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 transition-all duration-300 ${
      isScrolled ? 'shadow-lg py-2' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-800 hover:text-amber-600 transition-all duration-300 transform hover:scale-105"
          >
            Joglo Breeze
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-gray-600">
            <Link
              href="/"
              className={`transition-all duration-300 font-medium hover:scale-105 transform ${
                isActive("/")
                  ? "text-amber-600 hover:text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className={`transition-all duration-300 font-medium hover:scale-105 transform ${
                isActive("/rooms")
                  ? "text-amber-600 hover:text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Rooms
            </Link>
            <Link
              href="/about"
              className={`transition-all duration-300 font-medium hover:scale-105 transform ${
                isActive("/about")
                  ? "text-amber-600 hover:text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-all duration-300 font-medium hover:scale-105 transform ${
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
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-3 sm:px-5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
            >
              Book Now
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden ml-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen 
            ? 'max-h-64 opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-2'
        }`}>
          <div className="border-t border-gray-200">
            <div className="flex flex-col space-y-1 pt-4 pb-2">
              <Link
                href="/"
                onClick={closeMenu}
                className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 ${
                  isActive("/")
                    ? "bg-amber-100 text-amber-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>
              <Link
                href="/rooms"
                onClick={closeMenu}
                className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 ${
                  isActive("/rooms")
                    ? "bg-amber-100 text-amber-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Rooms
              </Link>
              <Link
                href="/about"
                onClick={closeMenu}
                className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 ${
                  isActive("/about")
                    ? "bg-amber-100 text-amber-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 ${
                  isActive("/contact")
                    ? "bg-amber-100 text-amber-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
