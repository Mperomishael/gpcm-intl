import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
  };

  const smoothScrollTo = (sectionId: string) => {
    setIsOpen(false);
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.add('hidden');
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const showLiveModal = () => {
    const modal = document.getElementById('live-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  return (
    <nav id="nav" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-amber-500 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="https://i.ibb.co/images/design-mode/Whats-App-Image-2025-10-06-at-7-00-18-AM-removebg-preview.png"
                alt="GPCM Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold tracking-tight">GPCM INT'L</div>
              <div className="text-xs text-zinc-500 -mt-1">Glowing Palace of Christian Ministry</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
            {['home','about','ministries','services','gallery','contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(id); }}
                className="nav-link text-zinc-700 hover:text-violet-600 transition-colors capitalize"
              >
                {id === 'home' ? 'Home'
                  : id === 'about' ? 'About'
                  : id === 'ministries' ? 'Ministries'
                  : id === 'services' ? 'Services'
                  : id === 'gallery' ? 'Gallery'
                  : 'Contact'}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={showLiveModal}
              className="px-6 py-2.5 text-sm font-semibold border border-violet-200 hover:border-violet-300 rounded-full transition-all"
            >
              Watch Live
            </button>
            <button
              onClick={() => document.getElementById('give-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2.5 text-sm font-semibold rounded-full transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-heart"></i>
              Give
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={toggleMobileMenu}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-2xl text-zinc-800"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden lg:hidden bg-white border-t py-6 px-6">
        <div className="flex flex-col gap-6 text-lg">
          <a href="#home"       onClick={(e) => { e.preventDefault(); smoothScrollTo('home'); }}       className="font-medium">Home</a>
          <a href="#about"      onClick={(e) => { e.preventDefault(); smoothScrollTo('about'); }}      className="font-medium">About Us</a>
          <a href="#ministries" onClick={(e) => { e.preventDefault(); smoothScrollTo('ministries'); }} className="font-medium">Ministries</a>
          <a href="#services"   onClick={(e) => { e.preventDefault(); smoothScrollTo('services'); }}   className="font-medium">Services</a>
          <a href="#gallery"    onClick={(e) => { e.preventDefault(); smoothScrollTo('gallery'); }}    className="font-medium">Gallery</a>
          <a href="#contact"    onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); }}    className="font-medium">Contact</a>

          <div className="pt-6 border-t flex flex-col gap-3">
            <button
              onClick={() => { showLiveModal(); toggleMobileMenu(); }}
              className="w-full py-4 border border-violet-200 rounded-2xl font-semibold"
            >
              Watch Live
            </button>
            <button
              onClick={() => {
                document.getElementById('give-section')?.scrollIntoView({ behavior: 'smooth' });
                toggleMobileMenu();
              }}
              className="w-full py-4 bg-violet-600 text-white rounded-2xl font-semibold"
            >
              Support Ministry
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
