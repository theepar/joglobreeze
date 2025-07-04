'use client';
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import ClientScripts from "./components/ClientScripts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);

  const galleryImages = useMemo(() => [
    { id: 1, src: "/image/home-2.jpg", alt: "Interior kamar" },
    { id: 2, src: "/image/home-3.jpg", alt: "Tempat tidur nyaman" },
    { id: 3, src: "/image/bath-1.jpg", alt: "Kamar mandi outdoor" },
    { id: 4, src: "/image/garden.jpg", alt: "Ruang tamu tradisional" },
    { id: 5, src: "/image/front-house.jpg", alt: "Pemandangan taman" }
  ], []);

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

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft': {
          e.preventDefault();
          const prevIndex = (currentModalIndex - 1 + galleryImages.length) % galleryImages.length;
          setCurrentModalIndex(prevIndex);
          setModalImage(galleryImages[prevIndex]);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          const nextIndex = (currentModalIndex + 1) % galleryImages.length;
          setCurrentModalIndex(nextIndex);
          setModalImage(galleryImages[nextIndex]);
          break;
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, currentModalIndex, galleryImages]);

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

  const openModal = (src: string, alt: string) => {
    if (!src || !alt) return;
    const index = galleryImages.findIndex(img => img.src === src);
    setCurrentModalIndex(index !== -1 ? index : 0);
    setModalImage({ src, alt });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Add modal-active class to prevent gallery hover zoom
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
      galleryContainer.classList.add('modal-active');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    document.body.style.overflow = 'auto';
    
    // Remove modal-active class to re-enable gallery hover zoom
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
      galleryContainer.classList.remove('modal-active');
    }
  };

  // Modal navigation functions
  const nextModalImage = () => {
    const nextIndex = (currentModalIndex + 1) % galleryImages.length;
    setCurrentModalIndex(nextIndex);
    setModalImage(galleryImages[nextIndex]);
  };

  const prevModalImage = () => {
    const prevIndex = (currentModalIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentModalIndex(prevIndex);
    setModalImage(galleryImages[prevIndex]);
  };

  const goToModalImage = (index: number) => {
    setCurrentModalIndex(index);
    setModalImage(galleryImages[index]);
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <ClientScripts />
      <Navbar />

      {/* Hero Section - Full Screen */}
      <section id="home" className="header-zoom-container relative w-full h-screen flex items-center justify-center overflow-hidden" data-animate="true">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/header.jpg"
            alt="Pemandangan utama Joglo Breeze"
            width={1920}
            height={1080}
            className="header-zoom-image w-full h-full object-cover hero-bg-animate"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className={`relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          visibleSections.includes('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Ketenangan Tropis
            <br />
            <span className="text-amber-400">di Jantung Bali</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Temukan pengalaman otentik dalam balutan kemewahan alam di Joglo Breeze
          </p>
          <button 
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => {
              const roomsSection = document.getElementById('rooms');
              if (roomsSection) {
                roomsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Lihat Pilihan Kamar
          </button>
        </div>

        {/* Animated Arrow Down */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-arrow-bounce">
            <button 
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 hover:scale-110"
              onClick={() => {
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Scroll to gallery section"
            >
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">

        {/* Gallery Section */}
        <section id="gallery" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`transition-all duration-700 ${
            visibleSections.includes('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Gallery</h2>
            <div className="relative max-w-6xl mx-auto">
              {/* Main Image */}
              <div className={`gallery-container relative h-80 sm:h-96 md:h-[32rem] lg:h-[36rem] rounded-xl bg-gray-100 cursor-pointer group ${isModalOpen ? 'modal-active' : ''}`}>
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  {galleryImages.map((image, index) => {
                    let slideClass = 'opacity-0 translate-x-full';
                    if (index === currentSlide) {
                      slideClass = 'opacity-100 translate-x-0';
                    } else if (index < currentSlide) {
                      slideClass = 'opacity-0 -translate-x-full';
                    }
                    
                    return (
                      <button
                        key={image.id}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${slideClass} border-0 bg-transparent p-0 cursor-pointer`}
                        onClick={() => openModal(image.src, image.alt)}
                        aria-label={`View ${image.alt} in full size`}
                        title="Klik untuk memperbesar"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={800}
                          className="gallery-image w-full h-full object-cover"
                        />
                        {/* Overlay to indicate clickable */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-gray-800 font-medium">Klik untuk memperbesar</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-900/90 text-white p-3 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 hover:scale-110 border border-gray-700/50"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-900/90 text-white p-3 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 hover:scale-110 border border-gray-700/50"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-4 space-x-1 md:space-x-2 px-4">
                {galleryImages.map((image, imgIndex) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(imgIndex)}
                    onDoubleClick={() => openModal(image.src, image.alt)}
                    disabled={isTransitioning}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg ${
                      imgIndex === currentSlide 
                        ? 'border-amber-500 ring-2 ring-amber-200 opacity-100' 
                        : 'border-gray-400 hover:border-gray-600 opacity-70 hover:opacity-90'
                    } disabled:opacity-50`}
                    title="Klik untuk navigasi, double klik untuk memperbesar"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21l4-4h8l-4 4H8zM8 17l4-4V9a4 4 0 118 0v4l4 4H8z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v6m0 0a4 4 0 014 4v4m-4-8a4 4 0 00-4 4v4"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Traditional Gazebo</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '1000ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01M12 4a1 1 0 00-1 1v2a1 1 0 102 0V5a1 1 0 00-1-1z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2z"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Outdoor Shower</span>
              </div>
              <div className={`border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 hover:shadow-lg hover:scale-110 flex flex-col items-center justify-center space-y-2 py-4 sm:py-6 px-2 sm:px-4 rounded-lg transition-all duration-500 group ${
                visibleSections.includes('amenities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '1100ms' }}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 2a1 1 0 000 2h6a1 1 0 100-2H9zM9 5a2 2 0 00-2 2v6.5a.5.5 0 01-.5.5h-1a.5.5 0 00-.5.5v.5a2.5 2.5 0 005 0v-.5a.5.5 0 01-.5-.5h-1a.5.5 0 01-.5-.5V7a2 2 0 00-2-2zm6 0a2 2 0 012 2v6.5a.5.5 0 00.5.5h1a.5.5 0 01.5.5v.5a2.5 2.5 0 01-5 0v-.5a.5.5 0 01.5-.5h1a.5.5 0 00.5-.5V7a2 2 0 012-2z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20M4 12h16"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-center group-hover:text-amber-800 transition-colors duration-300">Water Heater</span>
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

      {/* Image Modal */}
      {isModalOpen && modalImage && (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
          <button 
            className="absolute inset-0 bg-transparent border-0 cursor-pointer"
            onClick={handleModalClick}
            aria-label="Close modal by clicking background"
          />
          <div className="modal-content">
            <button 
              className="modal-close bg-gray-800/80 hover:bg-gray-900/90 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border border-gray-700/50"
              onClick={closeModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  closeModal();
                }
              }}
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Navigation Arrows */}
            <button 
              className="modal-arrow modal-arrow-left bg-gray-800/80 hover:bg-gray-900/90 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border border-gray-700/50"
              onClick={prevModalImage}
              aria-label="Previous image"
              title="Previous (←)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="modal-arrow modal-arrow-right bg-gray-800/80 hover:bg-gray-900/90 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border border-gray-700/50"
              onClick={nextModalImage}
              aria-label="Next image"
              title="Next (→)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Main Image */}
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              width={1200}
              height={800}
              className="modal-image"
            />
            
            {/* Image Caption and Counter */}
            <div className="modal-caption bg-gray-900/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
              <p className="text-white text-lg font-medium mb-2">
                {modalImage.alt}
              </p>
              <p className="text-white/70 text-sm">
                {currentModalIndex + 1} / {galleryImages.length}
              </p>
            </div>
            
            {/* Thumbnails */}
            <div className="modal-thumbnails">
              {galleryImages.map((img, index) => (
                <button
                  key={img.id}
                  className={`modal-thumbnail transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg ${
                    index === currentModalIndex 
                      ? 'active ring-2 ring-amber-400 border-amber-400' 
                      : 'border-gray-400 hover:border-gray-600 opacity-70 hover:opacity-90'
                  }`}
                  onClick={() => goToModalImage(index)}
                  aria-label={`View ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={80}
                    height={60}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
