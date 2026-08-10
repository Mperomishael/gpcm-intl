// src/components/Navbar.tsx
import React, { useState } from 'react';

interface NavbarProps {
  onOpenLiveModal: () => void;
}

export default function Navbar({ onOpenLiveModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const smoothScrollTo = (sectionId: string) => {
    setIsOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 right-0 z-50 
                 bg-white/60 backdrop-blur-xl 
                 border-b border-white/30 
                 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-amber-500 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src="https://i.ibb.co/images/design-mode/Whats-App-Image-2025-10-06-at-7-00-18-AM-removebg-preview.png"
                alt="GPCM Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
                GPCM INT'L
              </div>
              <div className="text-xs text-zinc-500 -mt-1">
                Glowing Palace of Christian Ministry
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'ministries', label: 'Ministries' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'contact', label: 'Contact' },
            ].map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(id);
                }}
                className="nav-link text-zinc-700 hover:text-violet-600 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenLiveModal}
              className="px-6 py-2.5 text-sm font-semibold 
                         bg-white/40 backdrop-blur-md border border-white/50 
                         hover:bg-white/60 rounded-full transition-all text-zinc-800"
            >
              Watch Live
            </button>
            <button
              onClick={() =>
                document.getElementById('give-section')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2.5 text-sm font-semibold rounded-full transition-all flex items-center gap-2 shadow-lg"
            >
              <i className="fa-solid fa-heart" />
              Give
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-2xl text-zinc-800"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu – also glass */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/70 backdrop-blur-xl border-t border-white/30 py-6 px-6">
          <div className="flex flex-col gap-6 text-lg">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'ministries', label: 'Ministries' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'contact', label: 'Contact' },
            ].map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(id);
                }}
                className="font-medium text-zinc-900"
              >
                {label}
              </a>
            ))}

            <div className="pt-6 border-t border-zinc-200/60 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenLiveModal();
                  setIsOpen(false);
                }}
                className="w-full py-4 bg-white/50 border border-white/60 rounded-2xl font-semibold text-zinc-800"
              >
                Watch Live
              </button>
              <button
                onClick={() => {
                  document.getElementById('give-section')?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
                className="w-full py-4 bg-violet-600 text-white rounded-2xl font-semibold"
              >
                Support Ministry
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
