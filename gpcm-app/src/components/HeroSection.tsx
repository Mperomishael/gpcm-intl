import React, { useState, useRef, useEffect } from 'react';

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
      // small delay so the fade feels smooth
      setTimeout(() => setShowLoader(false), 400);
    };

    // if already buffered (e.g. cached)
    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay);
    }

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14"
    >
      {/* ===== LOADER ===== */}
      {showLoader && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-950">
          <div className="relative">
            {/* outer ring */}
            <div className="w-16 h-16 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
            {/* inner glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-amber-400 opacity-80 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-white/70 text-sm tracking-widest uppercase font-medium">
            Loading…
          </p>
        </div>
      )}

      {/* ===== VIDEO ===== */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700
          ${videoReady ? 'opacity-100' : 'opacity-0'}
          hero-video`}
      >
        {/* put your file in public/hero.mp4 */}
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* subtle dark gradient so text stays readable, but keeps video vibrant */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/60 z-10" />

      {/* ===== CONTENT ===== */}
      <div
        className={`relative z-20 max-w-5xl mx-auto px-6 text-center text-white transition-all duration-700
          ${videoReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="space-y-5">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tighter drop-shadow-lg">
            Welcome to GPCM INT'L
          </h1>
          <p className="max-w-xl mx-auto text-xl sm:text-2xl text-white/95 drop-shadow-md">
            A place where lives are transformed
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-white text-violet-700 hover:bg-white/90 px-9 py-3.5 rounded-3xl font-semibold text-base sm:text-lg inline-flex items-center justify-center gap-3 transition-all shadow-lg"
          >
            <i className="fa-solid fa-play text-sm" />
            Join Live Service
          </button>
          <button
            onClick={() =>
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="border-2 border-white/80 hover:bg-white/10 px-9 py-3.5 rounded-3xl font-semibold text-base sm:text-lg transition-all"
          >
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
}
