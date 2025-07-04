'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import ClientScripts from "./components/ClientScripts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  const galleryImages = [
    { id: 1, src: "/image/home-2.jpg", alt: "Interior kamar" },
    { id: 2, src: "/image/home-3.jpg", alt: "Tempat tidur nyaman" },
    { id: 3, src: "/image/bath-1.jpg", alt: "Kamar mandi outdoor" },
    { id: 4, src: "/image/garden.jpg", alt: "Ruang tamu tradisional" },
    { id: 5, src: "/image/front-house.jpg", alt: "Pemandangan taman" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <ClientScripts />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
        {/* Hero Image */}
        <section id="home" className="mb-12 sm:mb-16" data-animate="true">
          <div className={`w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-xl overflow-hidden transition-all duration-1000 ease-out ${
            visibleSections.includes('home') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
          }`}>
            <div className="relative w-full h-full group">
              <Image
                src="/image/header.jpg"
                alt="Pemandangan utama Joglo Breeze"
                width={1200}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Center Welcome Icon and Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  {/* Joglo Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.87 2-2.02 2.71-3.33.4-.8.64-1.67.81-2.58.14-.82.23-1.65.23-2.52V7l-10-5z"/>
                      <path d="M12 2v20c5.16-1 9-5.45 9-11V7l-10-5z" opacity="0.7"/>
                    </svg>
                  </div>
                  
                  {/* Welcome Text */}
                  <div className="text-white">
                    <h2 className="text-xl sm:text-2xl font-bold mb-1">Welcome</h2>
                    <p className="text-sm sm:text-base opacity-90">to Joglo Breeze</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom text overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-3">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">Experience Authentic Balinese Hospitality</h3>
                  <p className="text-sm sm:text-base opacity-90">Traditional Joglo architecture meets modern comfort</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`transition-all duration-700 ${
            visibleSections.includes('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Gallery</h2>
            <div className="relative max-w-4xl mx-auto">
              {/* Main Image */}
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-gray-100">
                <div className="relative w-full h-full">
                  {galleryImages.map((image, index) => {
                    let slideClass = 'opacity-0 translate-x-full';
                    if (index === currentSlide) {
                      slideClass = 'opacity-100 translate-x-0';
                    } else if (index < currentSlide) {
                      slideClass = 'opacity-0 -translate-x-full';
                    }
                    
                    return (
                      <div
                        key={image.id}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${slideClass}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-4 space-x-1 md:space-x-2 px-4">
                {galleryImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(galleryImages.indexOf(image))}
                    disabled={isTransitioning}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      galleryImages.indexOf(image) === currentSlide 
                        ? 'border-amber-500 opacity-100' 
                        : 'border-gray-300 opacity-60 hover:opacity-80'
                    } disabled:opacity-50`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Slide Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {galleryImages.map((image) => (
                  <button
                    key={`dot-${image.id}`}
                    onClick={() => goToSlide(galleryImages.indexOf(image))}
                    disabled={isTransitioning}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                      galleryImages.indexOf(image) === currentSlide ? 'bg-amber-500' : 'bg-gray-300 hover:bg-gray-400'
                    } disabled:opacity-50`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16 sm:mb-20 text-center max-w-4xl mx-auto px-4" data-animate="true">
          <div className={`transition-all duration-1000 ease-out ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className={`text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 transition-all duration-1200 ${
              visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>About</h2>
            <p className={`text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-1200 ${
              visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              Nestled in the heart of Bali, our guesthouse offers an authentic experience in a traditional joglo. 
              Each joglo is meticulously crafted with intricate carvings and natural materials, providing a serene 
              and tranquil escape. Immerse yourself in the rich culture and beauty of Bali, surrounded by lush 
              gardens and the soothing sounds of nature.
            </p>
          </div>
        </section>

        {/* Rooms Section */}
        <section id="rooms" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`transition-all duration-1000 ease-out ${
            visibleSections.includes('rooms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className={`text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12 transition-all duration-1200 ${
              visibleSections.includes('rooms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>Our Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className={`text-center bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-500 group ${
                visibleSections.includes('rooms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: '400ms' }}>
                <div className="h-64 sm:h-72 rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/image/room-1.jpg"
                    alt="Deluxe Joglo"
                    width={600}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-amber-600 transition-colors duration-300">Joglo Breeze Room 1</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Experience luxury in our premier suite featuring a private terrace with stunning sunrise views, elegant traditional décor, and modern amenities for the ultimate romantic getaway.</p>
              </div>
              <div className={`text-center bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-500 group ${
                visibleSections.includes('rooms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: '600ms' }}>
                <div className="h-64 sm:h-72 rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/image/room-2.jpg"
                    alt="Garden View Joglo"
                    width={600}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-amber-600 transition-colors duration-300">Joglo Breeze Room 2</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Immerse yourself in nature with our garden-facing room surrounded by lush tropical plants, featuring a private outdoor shower and peaceful ambiance perfect for relaxation and meditation.</p>
              </div>
              <div className={`text-center bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-500 group ${
                visibleSections.includes('rooms') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: '800ms' }}>
                <div className="h-64 sm:h-72 rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/image/room-3.jpg"
                    alt="Family Joglo"
                    width={600}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-amber-600 transition-colors duration-300">Joglo Breeze Room 3</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Spacious and comfortable accommodation designed for families and groups, with interconnected living areas, kitchenette facilities, and a shared gazebo for memorable gatherings under the stars.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section id="amenities" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`transition-all duration-1000 ease-out ${
            visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className={`text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12 transition-all duration-1200 ${
              visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '400ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a7.5 7.5 0 0110.606 0M1.465 8.465a9.5 9.5 0 0113.434 0"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Free Wi-Fi</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '500ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Free Parking</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '600ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0a2 2 0 002-2h6l2 2h6a2 2 0 012 2v1M3 7l18 0"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Kitchenette</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '700ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Air Conditioning</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '800ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Tropical Garden</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '900ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Traditional Gazebo</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '1000ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Outdoor Shower</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '1100ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`transition-all duration-700 ${
            visibleSections.includes('location') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Location</h2>
            <div className="w-full h-[40vh] sm:h-[50vh] rounded-xl overflow-hidden border border-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.35068221925417!2d115.12610956728763!3d-8.573320699067674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23b0006580ae9%3A0xc92c6fcf21bed626!2sJoglo%20Breeze!5e0!3m2!1sid!2sid!4v1751616779135!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Joglo Breeze di Bali"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
