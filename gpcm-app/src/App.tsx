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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <MinistriesSection />
        <GallerySection />
        <GiveSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <LiveModal />
    </div>
  );
}

export default App;
