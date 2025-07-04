'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Rooms() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const addVisibleSection = (id: string) => {
      setVisibleSections(prev => [...prev, id]);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addVisibleSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const rooms = [
    {
      id: 1,
      name: "Shared House",
      image: "/image/room-2.jpg",
      description: "Experience luxury in our premier suite featuring a private terrace with stunning sunrise views, elegant traditional décor, and modern amenities for the ultimate romantic getaway.",
      details: "Perfect for couples | Private space | Shared common areas",
      type: "Double"
    },
    {
      id: 2,
      name: "Full House",
      image: "/image/room-3.jpg",
      description: "Rent the entire Joglo Breeze property for your exclusive use. Enjoy complete privacy with all three rooms, common areas, garden, and traditional gazebo for memorable gatherings.",
      details: "Entire property | Up to 6 guests | Complete privacy | All amenities",
      type: "full"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-20">
        {/* Hero Section */}
        <section id="hero" className="mb-16 sm:mb-20 text-center" data-animate="true">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.includes('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h1 className={`text-4xl sm:text-5xl font-bold text-gray-800 mb-6 sm:mb-8 transition-all duration-1200 ${
              visibleSections.includes('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>Our Rooms</h1>
            <p className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-1200 ${
              visibleSections.includes('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              Choose your perfect stay at Joglo Breeze - rent a single room for intimate getaways or book the entire property for exclusive gatherings.
            </p>
          </div>
        </section>

        {/* Room Cards */}
        <section id="rooms" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 transition-all duration-1000 ease-out ${
            visibleSections.includes('rooms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {rooms.map((room, index) => (
              <div 
                key={room.id} 
                className={`bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 hover:scale-105 transition-all duration-500 group ${
                  visibleSections.includes('rooms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden mb-6 group-hover:shadow-lg transition-shadow duration-500">
                  <div className="relative h-full overflow-hidden">
                    <Image
                      src={room.image}
                      alt={`${room.name} at Joglo Breeze`}
                      width={600}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-lg font-bold mb-1">{room.name}</h3>
                      <p className="text-sm opacity-90">{room.type === 'full' ? 'Entire Property' : 'Shared Experience'}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">{room.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {room.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {room.details}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a 
                      href={`https://wa.me/6281936311058?text=Hello! I'm interested in booking the *${room.name}* at Joglo Breeze. Could you please provide the pricing and availability details?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                    >
                      <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span>Ask Price via WhatsApp</span>
                    </a>
                    <Link 
                      href="/contact" 
                      className="bg-amber-600 hover:bg-amber-700 hover:scale-105 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
