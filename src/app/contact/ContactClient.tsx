'use client';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactClient() {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: 'Shared House',
    checkIn: '',
    checkOut: '',
    guests: '',
    requests: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update errors in real-time
    setErrors(prev => ({
      ...prev,
      [name]: getFieldError(name, value)
    }));
  };

  const isFormValid = () => {
    const today = new Date().toISOString().split('T')[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]+$/;
    
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           emailRegex.test(formData.email) &&
           formData.phone.trim() !== '' && 
           phoneRegex.test(formData.phone) &&
           formData.checkIn !== '' && 
           formData.checkIn >= today &&
           formData.checkOut !== '' && 
           formData.checkOut > formData.checkIn &&
           formData.guests.trim() !== '' &&
           parseInt(formData.guests) > 0;
  };

  const getFieldError = (name: string, value: string) => {
    const today = new Date().toISOString().split('T')[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]+$/;

    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'email':
        if (value.trim() === '') return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'phone':
        if (value.trim() === '') return 'Phone is required';
        if (!phoneRegex.test(value)) return 'Phone number can only contain numbers, spaces, and +()-';
        return '';
      case 'checkIn':
        if (value === '') return 'Check-in date is required';
        if (value < today) return 'Check-in date cannot be in the past';
        return '';
      case 'checkOut':
        if (value === '') return 'Check-out date is required';
        if (value <= formData.checkIn) return 'Check-out date must be after check-in date';
        return '';
      case 'guests':
        if (value.trim() === '') return 'Number of guests is required';
        if (parseInt(value) <= 0) return 'Number of guests must be positive';
        return '';
      default:
        return '';
    }
  };

  const getValidationErrors = () => {
    const errors = [];
    const today = new Date().toISOString().split('T')[0];
    
    if (formData.name.trim() === '') errors.push('• Name is required');
    if (formData.email.trim() === '') errors.push('• Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('• Please enter a valid email');
    if (formData.phone.trim() === '') errors.push('• Phone is required');
    else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) errors.push('• Phone number can only contain numbers');
    if (formData.checkIn === '') errors.push('• Check-in date is required');
    else if (formData.checkIn < today) errors.push('• Check-in date cannot be in the past');
    if (formData.checkOut === '') errors.push('• Check-out date is required');
    else if (formData.checkOut <= formData.checkIn) errors.push('• Check-out date must be after check-in date');
    if (formData.guests.trim() === '') errors.push('• Number of guests is required');
    else if (parseInt(formData.guests) <= 0) errors.push('• Number of guests must be positive');
    
    return errors;
  };

  const handleSendClick = (type: 'whatsapp' | 'email') => {
    if (!isFormValid()) {
      const errors = getValidationErrors();
      alert('Please fix the following issues:\n\n' + errors.join('\n'));
      return;
    }
    
    if (type === 'whatsapp') {
      window.open(generateWhatsAppLink(), '_blank');
    } else {
      window.location.href = generateEmailLink();
    }
  };

  const generateEmailLink = () => {
    const subject = encodeURIComponent('Booking Inquiry - Joglo Breeze');
    const body = encodeURIComponent(`Dear Joglo Breeze Team,

I would like to make a booking inquiry with the following details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Room Type: ${formData.roomType}
Check-in Date: ${formData.checkIn}
Check-out Date: ${formData.checkOut}
Number of Guests: ${formData.guests}
Special Requests: ${formData.requests}

Thank you for your time and I look forward to hearing from you.

Best regards`);
    
    return `mailto:joglobreeze@gmail.com?subject=${subject}&body=${body}`;
  };

  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(`Hello! I would like to make a booking inquiry for Joglo Breeze with the following details:

*Booking Details:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Room Type: ${formData.roomType}
• Check-in Date: ${formData.checkIn}
• Check-out Date: ${formData.checkOut}
• Number of Guests: ${formData.guests}
• Special Requests: ${formData.requests}

Thank you for your time and I look forward to hearing from you!`);
    
    return `https://wa.me/6281936311058?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
        {/* Header Section */}
        <section id="contact-header" className="mb-8 sm:mb-12" data-animate="true">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ease-out ${
            visibleSections.includes('contact-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-1200 ${
              visibleSections.includes('contact-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>Contact & Booking</h1>
            <p className={`text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-1200 ${
              visibleSections.includes('contact-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              For inquiries or to book your stay, please fill out the form below or contact us directly.
            </p>
          </div>
        </section>

        {/* Contact & Booking Section */}
        <section id="contact-booking" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`max-w-2xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.includes('contact-booking') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}>
            <form className="space-y-4 sm:space-y-6 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-500 group"
                  style={{ transitionDelay: '600ms' }}>
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                />
                {errors.name && <p className="mt-1 text-red-500 text-xs sm:text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                />
                {errors.email && <p className="mt-1 text-red-500 text-xs sm:text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Phone <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                />
                {errors.phone && <p className="mt-1 text-red-500 text-xs sm:text-sm">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="roomType" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Room Type</label>
                <select 
                  id="roomType" 
                  name="roomType" 
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="Shared House">Shared House</option>
                  <option value="Full House">Full House</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkIn" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Check-in Date <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    id="checkIn" 
                    name="checkIn" 
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                  />
                  {errors.checkIn && <p className="mt-1 text-red-500 text-xs sm:text-sm">{errors.checkIn}</p>}
                </div>

                <div>
                  <label htmlFor="checkOut" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Check-out Date <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    id="checkOut" 
                    name="checkOut" 
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                  />
                  {errors.checkOut && <p className="mt-1 text-red-500 text-xs sm:text-sm">{errors.checkOut}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Number of Guests <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  id="guests" 
                  name="guests" 
                  value={formData.guests}
                  onChange={handleInputChange}
                  placeholder="Enter number of guests"
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                />
                {errors.guests && <p className="mt-1 text-red-500 text-xs sm:text-sm">{errors.guests}</p>}
              </div>

              <div>
                <label htmlFor="requests" className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">Special Requests</label>
                <textarea 
                  id="requests" 
                  name="requests" 
                  value={formData.requests}
                  onChange={handleInputChange}
                  placeholder="Any special requests or additional information"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => handleSendClick('whatsapp')}
                  disabled={!isFormValid()}
                  className="flex-1 bg-green-600 hover:bg-green-700 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                  <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSendClick('email')}
                  disabled={!isFormValid()}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                  <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>Send via Email</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Contact Information Section */}
        <section id="contact-info" className="mb-16 sm:mb-20" data-animate="true">
          <div className={`max-w-2xl mx-auto transition-all duration-1000 ease-out ${
            visibleSections.includes('contact-info') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-500 group">
              <h2 className={`text-xl sm:text-2xl font-bold text-gray-800 mb-4 transition-all duration-1200 group-hover:text-amber-600 ${
                visibleSections.includes('contact-info') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '200ms' }}>Contact Information</h2>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/6281936311058"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 hover:bg-green-50 p-2 rounded-lg transition-all duration-300 group/item cursor-pointer ${
                    visibleSections.includes('contact-info') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`} 
                  style={{ transitionDelay: '400ms' }}
                >
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="text-sm sm:text-base text-gray-600 group-hover/item:text-green-700 transition-colors duration-300">WhatsApp: +62 819 3631 1058</span>
                </a>
                <a 
                  href="mailto:joglobreeze@gmail.com"
                  className={`flex items-center space-x-3 hover:bg-amber-50 p-2 rounded-lg transition-all duration-300 group/item cursor-pointer ${
                    visibleSections.includes('contact-info') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`} 
                  style={{ transitionDelay: '500ms' }}
                >
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-sm sm:text-base text-gray-600 group-hover/item:text-amber-700 transition-colors duration-300">Email: joglobreeze@gmail.com</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=Joglo+Breeze,+Bali,+Indonesia&ll=-8.5733569,115.1261332&z=15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 hover:bg-red-50 p-2 rounded-lg transition-all duration-300 group/item cursor-pointer ${
                    visibleSections.includes('contact-info') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`} 
                  style={{ transitionDelay: '600ms' }}
                >
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-sm sm:text-base text-gray-600 group-hover/item:text-red-700 transition-colors duration-300">Location: Joglo Breeze, Bali, Indonesia</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
