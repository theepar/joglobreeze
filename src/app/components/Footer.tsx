"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [socialHovered, setSocialHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.getElementById('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="footer"
      className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          
          {/* Brand section */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Joglo Breeze</h3>
            <p className="text-stone-300 mb-4 leading-relaxed">
              Experience the perfect blend of traditional Javanese architecture and modern comfort. 
              Our guesthouse offers a peaceful retreat in the heart of Bali&apos;s cultural paradise.
            </p>
            <div className="flex space-x-4">
              {/* Booking platforms */}
              {/* Booking.com */}
              <a
                href="https://www.booking.com/Share-xO0rjf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setSocialHovered('Booking.com')}
                onMouseLeave={() => setSocialHovered(null)}
                className={`w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-blue-600 ${
                  socialHovered === 'Booking.com' ? 'shadow-lg shadow-blue-600/50' : 'hover:shadow-md'
                }`}
                title="Book on Booking.com"
              >
                <div className="text-white font-bold text-sm">B</div>
              </a>

              {/* Airbnb */}
              <a
                href="https://www.airbnb.com/rooms/1226334843946053787?check_in=2025-07-04&check_out=2025-07-09&guests=1&adults=1&s=67&unique_share_id=068ea8f2-9b81-44ac-a9ec-656a0cdd8349"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setSocialHovered('Airbnb')}
                onMouseLeave={() => setSocialHovered(null)}
                className={`w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-red-500 ${
                  socialHovered === 'Airbnb' ? 'shadow-lg shadow-red-500/50' : 'hover:shadow-md'
                }`}
                title="Book on Airbnb"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0.6c-0.9 0-1.7 0.4-2.2 1.1C8.4 3.5 7.6 5.4 7.6 7.2c0 2.8 1.9 5.1 4.4 5.1s4.4-2.3 4.4-5.1c0-1.8-0.8-3.7-2.2-5.5C13.7 1 12.9 0.6 12 0.6z"/>
                  <path d="M12 14.4c-4.8 0-8.7 3.9-8.7 8.7 0 0.5 0.4 0.9 0.9 0.9h15.6c0.5 0 0.9-0.4 0.9-0.9C20.7 18.3 16.8 14.4 12 14.4z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6281936311058"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setSocialHovered('WhatsApp')}
                onMouseLeave={() => setSocialHovered(null)}
                className={`w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-green-500 ${
                  socialHovered === 'WhatsApp' ? 'shadow-lg shadow-green-500/50' : 'hover:shadow-md'
                }`}
                title="Contact via WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/rooms', label: 'Rooms' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <div className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <a 
                  href="https://maps.google.com/?q=Joglo+Breeze,+Bali,+Indonesia&ll=-8.5733569,115.1261332&z=15" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-amber-400 transition-colors duration-300"
                >
                  Joglo Breeze, Bali, Indonesia
                </a>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a 
                  href="mailto:joglobreeze@gmail.com"
                  className="text-stone-300 hover:text-amber-400 transition-colors duration-300"
                >
                  joglobreeze@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <a 
                  href="https://wa.me/6281936311058"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-amber-400 transition-colors duration-300"
                >
                  +62 819 3631 1058
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={`mt-8 pt-8 border-t border-stone-700 text-center transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <p className="text-stone-400 text-sm">
            &copy; {currentYear} Joglo Breeze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
