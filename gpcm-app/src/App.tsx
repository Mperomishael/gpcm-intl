import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import MinistriesSection from './components/MinistriesSection';
import GallerySection from './components/GallerySection';
import GiveSection from './components/GiveSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LiveModal from './components/LiveModal';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  useEffect(() => {
    // Keyboard ESC key handler for closing open modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const liveModal = document.getElementById('live-modal');
        if (liveModal && !liveModal.classList.contains('hidden')) {
          liveModal.classList.add('hidden');
          liveModal.classList.remove('flex');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="tail-container bg-zinc-50 text-zinc-900 min-h-screen relative overflow-x-clip">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* SECTION 1: HERO */}
        <HeroSection />

        {/* SECTION 2: ABOUT */}
        <AboutSection />

        {/* GENERAL OVERSEER SECTION */}
        <FeaturesSection />

        {/* MINISTRIES SECTION with Drift Sticky Scroll + Preload tabs */}
        <MinistriesSection />

        {/* GALLERY */}
        <GallerySection />

        {/* GIVE */}
        <GiveSection />

        {/* CONTACT */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* WHATSAPP FLOAT */}
      <WhatsAppFloat />

      {/* MODALS */}
      <LiveModal />
    </div>
  );
}

export default App;
