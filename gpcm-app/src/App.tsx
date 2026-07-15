import { useEffect, useState } from 'react';
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
  const [showLiveModal, setShowLiveModal] = useState(false);

  useEffect(() => {
    // Smooth scroll polyfill or initialization if needed
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-clip">
      <Navbar onWatchLive={() => setShowLiveModal(true)} />

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

      {showLiveModal && <LiveModal onClose={() => setShowLiveModal(false)} />}
    </div>
  );
}

export default App;
