import React, { useState, useRef, useEffect } from 'react';

const MESSAGES = [
  {
    title: "Welcome to GPCM INT'L",
    subtitle: 'A place where lives are transformed',
  },
  {
    title: 'We Matter in God’s Sight',
    subtitle: 'Loved • Valued • Called for a purpose',
  },
];

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // animation state
  const [msgIndex, setMsgIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [phase, setPhase] = useState<'typing' | 'holding' | 'exiting'>('typing');

  // ---------- video ready ----------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
      setTimeout(() => setShowLoader(false), 400);
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay);
    }
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  // ---------- typewriter + cycle ----------
  useEffect(() => {
    if (!videoReady) return;

    const current = MESSAGES[msgIndex];
    let charIndex = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    let holdTimer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;

    setTypedText('');
    setShowSubtitle(false);
    setPhase('typing');

    const typeNext = () => {
      if (charIndex <= current.title.length) {
        setTypedText(current.title.slice(0, charIndex));
        charIndex += 1;

        // slight pause after spaces and punctuation for a natural feel
        const lastChar = current.title[charIndex - 2];
        const delay =
          lastChar === ' ' ? 120 :
          lastChar === "'" || lastChar === '’' ? 180 :
          55 + Math.random() * 35;

        typingTimer = setTimeout(typeNext, delay);
      } else {
        // finished typing → show subtitle
        setShowSubtitle(true);
        setPhase('holding');

        // hold the full message, then exit
        holdTimer = setTimeout(() => {
          setPhase('exiting');
          setShowSubtitle(false);

          // after exit animation, move to next message
          exitTimer = setTimeout(() => {
            setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
          }, 700);
        }, 4200);
      }
    };

    // small delay before starting to type
    typingTimer = setTimeout(typeNext, 500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [msgIndex, videoReady]);

  const isExiting = phase === 'exiting';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14"
    >
      {/* ===== LOADER ===== */}
      {showLoader && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-950">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
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
        {/* your actual file */}
        <source src="/lv_0_20260809121737.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/60 z-10" />

      {/* ===== CONTENT ===== */}
      <div
        className={`relative z-20 max-w-5xl mx-auto px-6 text-center text-white transition-all duration-700
          ${videoReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div
          className={`space-y-5 transition-all duration-700 ease-out
            ${isExiting ? 'opacity-0 -translate-y-6 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}`}
        >
          {/* Typewriter title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tighter drop-shadow-lg min-h-[1.15em]">
            {typedText}
            {/* blinking cursor while typing */}
            {phase === 'typing' && (
              <span className="inline-block w-[3px] h-[0.85em] ml-1 bg-amber-300 align-middle animate-pulse" />
            )}
          </h1>

          {/* Subtitle – fades in after typing finishes */}
          <p
            className={`max-w-xl mx-auto text-xl sm:text-2xl text-white/95 drop-shadow-md transition-all duration-700
              ${showSubtitle && !isExiting
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'}`}
          >
            {MESSAGES[msgIndex].subtitle}
          </p>
        </div>

        {/* Buttons – always visible once video is ready */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-opacity duration-700
            ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        >
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
