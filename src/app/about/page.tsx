import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 mt-12 md:mt-20">
        {/* About Section */}
        <section id="about" className="mb-20">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our Joglo</h1>
            <p className="text-gray-600 leading-relaxed">
              Nestled in the heart of Bali, our guesthouse offers an authentic experience in a traditional Balinese joglo. 
              This architecture, carved with its rich history and intricate design, provides a unique and tranquil retreat for our guests.
            </p>
          </div>
        </section>

        {/* History and Architecture Section */}
        <section id="history" className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:pr-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">History and Architecture</h2>
              <p className="text-gray-600 leading-relaxed">
                The joglo, a traditional Javanese house, is characterized by its distinctive pyramidal roof and open-air design. 
                Our joglo has been meticulously crafted to preserve its cultural heritage while incorporating modern comforts. 
                The structure features hand-carved teak wood, symbolizing strength and elegance, and is adorned with traditional Balinese motifs.
              </p>
            </div>
            <div className="md:overflow-hidden h-72">
              <Image
                src="/image/outdoor-1.jpg"
                alt="Tampak depan arsitektur Joglo"
                width={600}
                height={500}
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="mt-3">
                <h3 className="font-bold text-lg">Exterior View</h3>
                <p className="text-gray-500">A traditional Balinese joglo house showcasing its unique architecture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 md:pl-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Facilities</h2>
              <p className="text-gray-600 leading-relaxed">
                Our guesthouse features three beautifully appointed rooms, each designed to offer a serene and comfortable stay. 
                The rooms are equipped with modern amenities to ensure a pleasant and relaxing experience. 
                Guests can also enjoy our spacious garden, a perfect place to relax and immerse themselves in the natural beauty of Bali.
              </p>
            </div>
            <div className="md:order-1 overflow-hidden h-72">
              <Image
                src="/image/outdoor-2.jpg"
                alt="Interior kamar tidur di dalam Joglo"
                width={600}
                height={500}
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="mt-3">
                <h3 className="font-bold text-lg">Interior View</h3>
                <p className="text-gray-500">A room in our balinese joglo guesthouse, designed for comfort and tranquility.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="mb-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Location</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Located in a peaceful area of Bali, our guesthouse provides a tranquil escape while still being conveniently close to local attractions. 
              We are surrounded by lush greenery and offer easy access to nearby cultural sites, beaches, and dining options.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto h-[50vh] rounded-xl overflow-hidden border border-gray-200">
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
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-200 mt-20">
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
