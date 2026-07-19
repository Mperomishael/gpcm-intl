import React, { useState, useEffect } from 'react';

const heroSlides = [
  {
    title: "Welcome to GPCM INT'L",
    subtitle: 'A place where lives are transformed',
    image: 'https://i.ibb.co/C30xt8n2/IMG-20250925-113020.jpg',
  },
  {
    title: "Experience God's Glory",
    subtitle: 'Join us in worship and fellowship',
    image: 'https://i.ibb.co/wF3QSv9W/IMG-20251030-111101.jpg',
  },
  {
    title: 'Transforming Communities',
    subtitle: 'Through the power of the Gospel',
    image: 'https://i.ibb.co/JPXkn95/IMG-20251030-114723.jpg',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Fast-loading autoplay loop video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4"
          type="video/mp4"
        />
      </video>

      {/* Original #hero-slides structure preserved */}
      <div id="hero-slides" className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-10" />

      {/* Hero content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
        <div id="hero-content" className="space-y-6 animate-fade-in-down">
          <h1 className="font-serif text-6xl md:text-7xl font-bold leading-none tracking-tighter">
            {heroSlides[current].title}
          </h1>
          <p className="max-w-xl mx-auto text-2xl text-white/90">
            {heroSlides[current].subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-violet-700 hover:bg-white/90 px-10 py-4 rounded-3xl font-semibold text-lg inline-flex items-center justify-center gap-3 transition-all"
          >
            <i className="fa-solid fa-play" />
            Join Live Service
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white/80 hover:bg-white/10 px-10 py-4 rounded-3xl font-semibold text-lg transition-all"
          >
            Discover More
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div id="slide-indicators" className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
