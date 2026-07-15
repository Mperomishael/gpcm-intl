import { useState, useEffect } from 'react';
import { Mail, Plus } from 'lucide-react';

interface NavbarProps {
  onWatchLive: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Ministries', href: '#ministries' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onWatchLive }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('#home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-amber-500 rounded-xl flex items-center justify-center overflow-hidden">
              <span className="font-serif text-white font-bold text-lg">G</span>
            </div>
            <div>
              <div className="font-serif text-xl font-bold tracking-tight text-white">GPCM INT'L</div>
              <div className="text-[10px] text-white/60 -mt-1">Glowing Palace of Christian Ministry</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative text-white/80 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={onWatchLive}
              className="px-5 py-2 text-sm font-semibold border border-white/20 hover:border-white/40 rounded-full text-white transition-all"
            >
              Watch Live
            </button>
            <button 
              onClick={() => scrollToSection('#give-section')}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-2"
            >
              Give
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white z-50 relative"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                  isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`} 
              />
              <span 
                className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                  isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-4 mt-8 w-64">
            <button 
              onClick={() => { onWatchLive(); setIsOpen(false); }}
              className="w-full py-4 border border-white/20 rounded-2xl font-semibold text-white"
            >
              Watch Live
            </button>
            <button 
              onClick={() => scrollToSection('#give-section')}
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
