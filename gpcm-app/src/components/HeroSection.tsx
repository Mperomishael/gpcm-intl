import React from 'react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Local video from public folder */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-10" />

      {/* Hero content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
        <div className="space-y-6 animate-fade-in-down">
          <h1 className="font-serif text-6xl md:text-7xl font-bold leading-none tracking-tighter">
            Welcome to GPCM INT'L
          </h1>
          <p className="max-w-xl mx-auto text-2xl text-white/90">
            A place where lives are transformed
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
    </section>
  );
}
