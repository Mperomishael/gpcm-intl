import React, { useState, useEffect } from 'react';
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
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLiveModalOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="tail-container bg-zinc-50 text-zinc-900 min-h-screen relative overflow-x-clip">
      <Navbar onOpenLiveModal={() => setIsLiveModalOpen(true)} />
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
      <LiveModal isOpen={isLiveModalOpen} onClose={() => setIsLiveModalOpen(false)} />
    </div>
  );
}

export default App;
