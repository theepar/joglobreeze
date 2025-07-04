'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from "../components/Navbar";

export default function Contact() {
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
    
    if (name === 'email' && value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    if (name === 'phone' && value !== '' && !/^[0-9+\-\s()]+$/.test(value)) {
      return 'Phone number can only contain numbers, +, -, spaces, and parentheses';
    }
    if (name === 'checkIn' && value !== '' && value < today) {
      return 'Check-in date cannot be in the past';
    }
    if (name === 'checkOut' && value !== '' && formData.checkIn !== '' && value <= formData.checkIn) {
      return 'Check-out date must be after check-in date';
    }
    if (name === 'guests' && value !== '' && (parseInt(value) <= 0 || isNaN(parseInt(value)))) {
      return 'Number of guests must be a positive number';
    }
    return '';
  };

  const getValidationErrors = () => {
    const today = new Date().toISOString().split('T')[0];
    const errors = [];
    
    if (formData.name.trim() === '') errors.push('• Name is required');
    if (formData.email.trim() === '') errors.push('• Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('• Email must be valid');
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

📝 *Booking Details:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Room Type: ${formData.roomType}
• Check-in Date: ${formData.checkIn}
• Check-out Date: ${formData.checkOut}
• Number of Guests: ${formData.guests}
• Special Requests: ${formData.requests}

Thank you for your time and I look forward to hearing from you! 🙏`);
    
    return `https://wa.me/6281936311058?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {/* Contact & Booking Section */}
        <section id="contact-booking">
          <div className="max-w-xl mx-auto">
            <div className="text-left mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact & Booking</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                For inquiries or to book your stay, please fill out the form below or contact us directly.
              </p>
            </div>

            {/* Booking Form */}
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none focus:border-amber-600 transition-colors" 
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-100 focus:border-amber-600'}`}
                  placeholder="e.g., yourname@email.com"
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-600' : 'border-gray-100 focus:border-amber-600'}`}
                  placeholder="e.g., +6281234567890 or 081234567890"
                  pattern="[0-9+\-\s()]+"
                  required
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="room-type" className="block mb-2 font-medium text-gray-700">Room Type</label>
                <select 
                  id="room-type" 
                  name="roomType" 
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none focus:border-amber-600 transition-colors"
                >
                  <option value="Shared House">Shared House</option>
                  <option value="Full House">Full House</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="check-in" className="block mb-2 font-medium text-gray-700">Check-in Date <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    id="check-in" 
                    name="checkIn" 
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none transition-colors ${errors.checkIn ? 'border-red-500 focus:border-red-600' : 'border-gray-100 focus:border-amber-600'}`}
                    required
                  />
                  {errors.checkIn && <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>}
                </div>
                <div>
                  <label htmlFor="check-out" className="block mb-2 font-medium text-gray-700">Check-out Date <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    id="check-out" 
                    name="checkOut" 
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none transition-colors ${errors.checkOut ? 'border-red-500 focus:border-red-600' : 'border-gray-100 focus:border-amber-600'}`}
                    required
                  />
                  {errors.checkOut && <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="guests" className="block mb-2 font-medium text-gray-700">Number of Guests <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  id="guests" 
                  name="guests" 
                  value={formData.guests}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none transition-colors ${errors.guests ? 'border-red-500 focus:border-red-600' : 'border-gray-100 focus:border-amber-600'}`}
                  placeholder="Enter number of guests" 
                  min="1"
                  required
                />
                {errors.guests && <p className="mt-1 text-sm text-red-500">{errors.guests}</p>}
              </div>
              <div>
                <label htmlFor="requests" className="block mb-2 font-medium text-gray-700">Special Requests</label>
                <textarea 
                  id="requests" 
                  name="requests" 
                  value={formData.requests}
                  onChange={handleInputChange}
                  rows={4} 
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none focus:border-amber-600 transition-colors" 
                  placeholder="Any special requests or requirements..."
                ></textarea>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button 
                  type="button"
                  onClick={() => handleSendClick('whatsapp')}
                  className={`${isFormValid() 
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
                    : 'bg-gray-400 cursor-not-allowed'
                  } text-white font-medium py-3 px-8 rounded-lg transition-colors text-center flex items-center justify-center space-x-2`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Send via WhatsApp</span>
                </button>
                <button 
                  type="button"
                  onClick={() => handleSendClick('email')}
                  className={`${isFormValid() 
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                    : 'bg-gray-400 cursor-not-allowed'
                  } text-white font-medium py-3 px-8 rounded-lg transition-colors text-center flex items-center justify-center space-x-2`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Send via Email</span>
                </button>
              </div>
            </form>

            {/* Contact Information */}
            <div className="mt-20 pt-10 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gray-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href="https://wa.me/6281936311058" className="text-gray-600 hover:text-amber-600 transition-colors">+62 819-3631-1058</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gray-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:joglobreeze@gmail.com?subject=Inquiry%20about%20Joglo%20Breeze" className="text-gray-600 hover:text-amber-600 transition-colors">joglobreeze@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gray-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <a href="https://www.google.com/maps/search/Joglo+Breeze/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600 transition-colors">View on Map</a>
                  </div>
                </div>
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
              <Link href="/" className="hover:text-gray-800">Terms of Service</Link>
              <Link href="/" className="hover:text-gray-800">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
