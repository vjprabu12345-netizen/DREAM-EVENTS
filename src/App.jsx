import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import ServiceModal from './components/ServiceModal';
import CostEstimator from './components/CostEstimator';
import BookingForm from './components/BookingForm';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  // Modal state for View Details
  const [activeModalService, setActiveModalService] = useState(null);

  // Pre-selected service state for Booking Form
  const [preSelectedService, setPreSelectedService] = useState(null);

  // Smooth scroll helper
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle Book Service Click (From Card or Modal)
  const handleBookService = (service) => {
    setPreSelectedService(service);
    scrollToSection('booking');
  };

  // Handle Custom Package Blueprint Click (From Estimator)
  const handleBookCustomPackage = ({ guests, services }) => {
    // Scroll to booking and prefill customized package details
    setPreSelectedService({ 
      name: services[0] || 'Chocolate Fountain',
      allServices: services,
      guests: guests
    });
    scrollToSection('booking');
  };

  return (
    <div className="app-layout">
      {/* Sticky Header Navigation */}
      <Navbar onBookNowClick={() => scrollToSection('booking')} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          onBookEventClick={() => scrollToSection('booking')}
          onExploreServicesClick={() => scrollToSection('services')}
        />

        {/* 2. Services Grid (7 individual cards rendered via .map()) */}
        <ServiceGrid 
          onViewDetails={(service) => setActiveModalService(service)}
          onBookService={handleBookService}
        />

        {/* 3. Interactive Celebration Package Builder */}
        <CostEstimator 
          onBookCustomPackage={handleBookCustomPackage}
        />

        {/* 4. Booking System with Instant WhatsApp Preparation */}
        <BookingForm 
          preSelectedService={preSelectedService}
          onClearPreSelected={() => setPreSelectedService(null)}
        />

        {/* 5. Authentic About Us Section */}
        <AboutUs 
          onPlanCelebrationClick={() => scrollToSection('booking')}
        />

        {/* 6. Contact Section with 3 Phones, Address & Map */}
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer 
        onNavClick={(e, targetId) => {
          e.preventDefault();
          scrollToSection(targetId);
        }}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Keyboard-accessible Service Details Modal */}
      {activeModalService && (
        <ServiceModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          onBookService={handleBookService}
        />
      )}
    </div>
  );
}
