'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
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

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-20">
        {/* About Section */}
        <section id="about" className="mb-16 sm:mb-20" data-animate>
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h1 className={`text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 transition-all duration-1200 ${
              visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>About Our Joglo</h1>
            <p className={`text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-1200 ${
              visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              Nestled in the heart of Bali, our guesthouse offers an authentic experience in a traditional Balinese joglo. 
              This architecture, carved with its rich history and intricate design, provides a unique and tranquil retreat for our guests.
            </p>
          </div>
        </section>

        {/* History and Architecture Section */}
        <section id="history" className="mb-16 sm:mb-20" data-animate>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 ease-out ${
            visibleSections.includes('history') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className={`lg:pr-8 transition-all duration-1200 ${
              visibleSections.includes('history') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">History and Architecture</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                The joglo, a traditional Javanese house, is characterized by its distinctive pyramidal roof and open-air design. 
                Our joglo has been meticulously crafted to preserve its cultural heritage while incorporating modern comforts. 
                The structure features hand-carved teak wood, symbolizing strength and elegance, and is adorned with traditional Balinese motifs.
              </p>
            </div>
            <div className={`overflow-hidden h-64 sm:h-72 lg:h-80 transition-all duration-1200 group ${
              visibleSections.includes('history') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="relative h-full overflow-hidden rounded-lg">
                <Image
                  src="/image/outdoor-1.jpg"
                  alt="Tampak depan arsitektur Joglo"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-base sm:text-lg group-hover:text-amber-600 transition-colors duration-300">Exterior View</h3>
                <p className="text-sm sm:text-base text-gray-500">A traditional Balinese joglo house showcasing its unique architecture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="mb-16 sm:mb-20" data-animate>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 ease-out ${
            visibleSections.includes('facilities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className={`lg:order-2 lg:pl-8 transition-all duration-1200 ${
              visibleSections.includes('facilities') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Facilities</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our guesthouse features three beautifully appointed rooms, each designed to offer a serene and comfortable stay. 
                The rooms are equipped with modern amenities to ensure a pleasant and relaxing experience. 
                Guests can also enjoy our spacious garden, a perfect place to relax and immerse themselves in the natural beauty of Bali.
              </p>
            </div>
            <div className={`lg:order-1 overflow-hidden h-64 sm:h-72 lg:h-80 transition-all duration-1200 group ${
              visibleSections.includes('facilities') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="relative h-full overflow-hidden rounded-lg">
                <Image
                  src="/image/outdoor-2.jpg"
                  alt="Interior kamar tidur di dalam Joglo"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-base sm:text-lg group-hover:text-amber-600 transition-colors duration-300">Interior View</h3>
                <p className="text-sm sm:text-base text-gray-500">A room in our balinese joglo guesthouse, designed for comfort and tranquility.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="mb-16 sm:mb-20 text-center" data-animate>
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.includes('location') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className={`text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 transition-all duration-1200 ${
              visibleSections.includes('location') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>Location</h2>
            <p className={`text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8 transition-all duration-1200 ${
              visibleSections.includes('location') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              Located in a peaceful area of Bali, our guesthouse provides a tranquil escape while still being conveniently close to local attractions. 
              We are surrounded by lush greenery and offer easy access to nearby cultural sites, beaches, and dining options.
            </p>
          </div>
          <div className={`w-full max-w-6xl mx-auto h-[40vh] sm:h-[50vh] rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-700 group ${
            visibleSections.includes('location') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`} style={{ transitionDelay: '600ms' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.35068221925417!2d115.12610956728763!3d-8.573320699067674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23b0006580ae9%3A0xc92c6fcf21bed626!2sJoglo%20Breeze!5e0!3m2!1sid!2sid!4v1751616779135!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Joglo Breeze di Bali"
              className="group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
