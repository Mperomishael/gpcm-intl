import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenLiveModal: () => void;
}

export default function Navbar({ onOpenLiveModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => setIsOpen((prev) => !prev);

  const smoothScrollTo = (sectionId: string) => {
    setIsOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/55 backdrop-blur-xl border-b border-white/25 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
          : 'bg-white/25 backdrop-blur-lg border-b border-white/15'
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* thinner bar */}
        <div className="flex items-center justify-between h-14">

          {/* Logo – from /public */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-violet-600/80 to-amber-500/80 shadow-sm">
              <img
                src="/logo.png"
                alt="GPCM Logo"
                className="w-9 h-9 object-contain"
                onError={(e) => {
                  // fallback if logo not yet added
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg font-bold tracking-tight text-zinc-900">
                GPCM INT'L
              </div>
              <div className="text-[10px] text-zinc-600 -mt-0.5 hidden sm:block">
                Glowing Palace of Christian Ministry
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
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
                className="nav-link text-zinc-800 hover:text-violet-600 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenLiveModal}
              className="px-5 py-1.5 text-sm font-semibold
                         bg-white/35 backdrop-blur-md border border-white/40
                         hover:bg-white/55 rounded-full transition-all text-zinc-800"
            >
              Watch Live
            </button>
            <button
              onClick={() =>
                document.getElementById('give-section')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-1.5 text-sm font-semibold rounded-full transition-all flex items-center gap-2 shadow-md"
            >
              <i className="fa-solid fa-heart text-xs" />
              Give
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-xl text-zinc-800"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/50 backdrop-blur-xl border-t border-white/25 py-5 px-5">
          <div className="flex flex-col gap-5 text-base">
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

            <div className="pt-4 border-t border-zinc-200/50 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenLiveModal();
                  setIsOpen(false);
                }}
                className="w-full py-3 bg-white/50 border border-white/50 rounded-2xl font-semibold text-zinc-800 text-sm"
              >
                Watch Live
              </button>
              <button
                onClick={() => {
                  document.getElementById('give-section')?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
                className="w-full py-3 bg-violet-600 text-white rounded-2xl font-semibold text-sm"
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
