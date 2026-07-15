import { useState, useEffect, useCallback } from 'react';
import { Play } from 'lucide-react';

const heroSlides = [
  {
    title: "Welcome to GPCM INT'L",
    subtitle: "A place where lives are transformed",
    image: "https://i.ibb.co/C30xt8n2/IMG-20250925-113020.jpg"
  },
  {
    title: "Experience God's Glory",
    subtitle: "Join us in worship and fellowship",
    image: "https://i.ibb.co/wF3QSv9W/IMG-20251030-111101.jpg"
  },
  {
    title: "Transforming Communities",
    subtitle: "Through the power of the Gospel",
    image: "https://i.ibb.co/JPXkn95/IMG-20251030-114723.jpg"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden mb-[-25px]">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center text-white w-full">
          <div className="space-y-6 mb-12 animate-fade-in-down">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-normal leading-[1.1] tracking-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="max-w-xl mx-auto text-xl md:text-2xl text-white/80 font-medium">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollTo('#contact')}
              className="bg-white text-violet-700 hover:bg-white/90 px-10 py-4 rounded-3xl font-semibold text-lg inline-flex items-center justify-center gap-3 transition-all"
            >
              <Play size={20} fill="currentColor" />
              Join Live Service
            </button>
            <button 
              onClick={() => scrollTo('#about')}
              className="border-2 border-white/80 hover:bg-white/10 px-10 py-4 rounded-3xl font-semibold text-lg transition-all"
            >
              Discover More
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
