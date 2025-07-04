import Image from "next/image";
import ClientScripts from "./components/ClientScripts";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <ClientScripts />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {/* Hero Image */}
        <section id="home" className="mb-16">
          <div className="w-full h-[60vh] rounded-xl overflow-hidden">
            <Image
              src="/image/header.jpg"
              alt="Pemandangan utama Joglo Breeze"
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-64 rounded-xl overflow-hidden">
              <Image
                src="/image/home-2.jpg"
                alt="Interior kamar"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <Image
                src="/image/home-3.jpg"
                alt="Tempat tidur nyaman"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <Image
                src="/image/bath-1.jpg"
                alt="Pemandangan alam"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">About</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nestled in the heart of Bali, our guesthouse offers an authentic experience in a traditional joglo. 
            Each joglo is meticulously crafted with intricate carvings and natural materials, providing a serene 
            and tranquil escape. Immerse yourself in the rich culture and beauty of Bali, surrounded by lush 
            gardens and the soothing sounds of nature.
          </p>
        </section>

        {/* Rooms Section */}
        <section id="rooms" className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="h-72 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/image/room-1.jpg"
                  alt="Deluxe Joglo"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Joglo Breeze Room 1</h3>
              <p className="text-gray-600 leading-relaxed">Experience luxury in our premier suite featuring a private terrace with stunning sunrise views, elegant traditional décor, and modern amenities for the ultimate romantic getaway.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="h-72 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/image/room-2.jpg"
                  alt="Garden View Joglo"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Joglo Breeze Room 2</h3>
              <p className="text-gray-600 leading-relaxed">Immerse yourself in nature with our garden-facing room surrounded by lush tropical plants, featuring a private outdoor shower and peaceful ambiance perfect for relaxation and meditation.</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="h-72 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/image/room-3.jpg"
                  alt="Family Joglo"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Joglo Breeze Room 3</h3>
              <p className="text-gray-600 leading-relaxed">Spacious and comfortable accommodation designed for families and groups, with interconnected living areas, kitchenette facilities, and a shared gazebo for memorable gatherings under the stars.</p>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section id="amenities" className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a7.5 7.5 0 0110.606 0M1.465 8.465a9.5 9.5 0 0113.434 0"></path>
              </svg>
              <span className="text-sm font-medium text-center">Free Wi-Fi</span>
            </div>
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span className="text-sm font-medium text-center">Free Parking</span>
            </div>
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0a2 2 0 002-2h6l2 2h6a2 2 0 012 2v1M3 7l18 0"></path>
              </svg>
              <span className="text-sm font-medium text-center">Kitchenette</span>
            </div>
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="text-sm font-medium text-center">Air Conditioning</span>
            </div>
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span className="text-sm font-medium text-center">Tropical Garden</span>
            </div>
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path>
              </svg>
              <span className="text-sm font-medium text-center">Traditional Gazebo</span>
            </div>
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span className="text-sm font-medium text-center">Outdoor Shower</span>
            </div>
            <div className="border border-gray-200 bg-white hover:bg-amber-50 hover:border-amber-200 flex flex-col items-center justify-center space-y-2 py-6 px-4 rounded-lg transition-all duration-300">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm font-medium text-center">24/7 Support</span>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Location</h2>
          <div className="w-full h-[50vh] rounded-xl overflow-hidden border border-gray-200">
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
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Reviews</h2>
          <div className="space-y-8">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <Image
                  src="/api/placeholder/48/48"
                  alt="Sophia Carter"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">Sophia Carter</h4>
                  <p className="text-sm text-gray-500">June 2023</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Absolutely stunning! The joglo was beautifully decorated and the staff were incredibly welcoming. A truly unforgettable experience."
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <button className="flex items-center mr-4 hover:text-gray-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.734V6a2 2 0 012-2h4a2 2 0 012 2v4z"></path>
                  </svg>
                  12
                </button>
                <button className="flex items-center hover:text-gray-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 5.266V15a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                  3
                </button>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <Image
                  src="/api/placeholder/48/48"
                  alt="Ethan Bennett"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">Ethan Bennett</h4>
                  <p className="text-sm text-gray-500">June 2023</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                "The garden view joglo was charming and peaceful. The perfect place to relax and unwind. The only downside was the construction noise from next door."
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <button className="flex items-center mr-4 hover:text-gray-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.734V6a2 2 0 012-2h4a2 2 0 012 2v4z"></path>
                  </svg>
                  8
                </button>
                <button className="flex items-center hover:text-gray-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 5.266V15a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                  1
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm order-first sm:order-none">&copy; 2024 Joglo Breeze. All rights reserved.</p>
            <div className="space-x-6 text-sm">
              <a href="/#" className="hover:text-gray-800">Terms of Service</a>
              <a href="/#" className="hover:text-gray-800">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
