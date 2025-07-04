"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getNavLinkClass = (path: string) => {
    const baseClass = "transition-all duration-300 font-medium relative px-3 py-2 rounded-lg";
    
    if (isActive(path)) {
      return `${baseClass} text-white hover:text-white font-semibold bg-amber-500`;
    } else {
      return `${baseClass} text-dark hover:text-amber-400`;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-white/20 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold text-dark hover:text-amber-400 transition-colors duration-300"
          >
            <Image
              src="/favicon.ico"
              alt="Joglo Breeze Icon"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span>Joglo Breeze</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={getNavLinkClass("/")}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className={getNavLinkClass("/rooms")}
            >
              Rooms
            </Link>
            <Link
              href="/about"
              className={getNavLinkClass("/about")}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={getNavLinkClass("/contact")}
            >
              Contact
            </Link>
          </div>
          
          <div className="flex items-center">
            <Link
              href="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Book Now
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden ml-3 p-2 rounded-lg text-dark hover:text-amber-400 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isOpen 
            ? 'max-h-64 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-dark hover:text-amber-400 transition-colors duration-200 ${
                  isActive("/") ? "bg-amber-500 text-white font-semibold" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className={`px-3 py-2 rounded-lg text-dark hover:text-amber-400 transition-colors duration-200 ${
                  isActive("/rooms") ? "bg-amber-500 text-white font-semibold" : ""
                }`}
              >
                Rooms
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg text-dark hover:text-amber-400 transition-colors duration-200 ${
                  isActive("/about") ? "bg-amber-500 text-white font-semibold" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-lg text-dark hover:text-amber-400 transition-colors duration-200 ${
                  isActive("/contact") ? "bg-amber-500 text-white font-semibold" : ""
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
