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

const MIN_LOADER_MS = 4500; // 4–5 seconds professional mask while video loads

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadStartRef = useRef<number>(Date.now());

  const [msgIndex, setMsgIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [phase, setPhase] = useState<'typing' | 'holding' | 'exiting'>('typing');

  // ---------- video ready + minimum loader duration ----------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    loadStartRef.current = Date.now();

    const hideLoader = () => {
      const elapsed = Date.now() - loadStartRef.current;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      setTimeout(() => setShowLoader(false), remaining);
    };

    const handleCanPlay = () => {
      setVideoReady(true);
      hideLoader();
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay);
      const safety = setTimeout(() => {
        setVideoReady(true);
        hideLoader();
      }, 12000);
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        clearTimeout(safety);
      };
    }
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  // ---------- typewriter + cycle ----------
  useEffect(() => {
    if (!videoReady || showLoader) return;

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

        const lastChar = current.title[charIndex - 2];
        const delay =
          lastChar === ' ' ? 120 :
          lastChar === "'" || lastChar === '’' ? 180 :
          55 + Math.random() * 35;

        typingTimer = setTimeout(typeNext, delay);
      } else {
        setShowSubtitle(true);
        setPhase('holding');

        holdTimer = setTimeout(() => {
          setPhase('exiting');
          setShowSubtitle(false);

          exitTimer = setTimeout(() => {
            setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
          }, 700);
        }, 4200);
      }
    };

    typingTimer = setTimeout(typeNext, 500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [msgIndex, videoReady, showLoader]);

  const isExiting = phase === 'exiting';

  return (
    <section
      id="home"
      className="relative min-h-[100svh] min-h-screen flex items-center justify-center overflow-hidden pt-14"
    >
      {/* ===== PURE SKELETAL LOADER – full-bleed shiny blinds (4–5s) ===== */}
      {showLoader && (
        <div
          className="absolute inset-0 z-30 hero-skeleton-blinds"
          aria-hidden="true"
          aria-busy="true"
        />
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
          ${videoReady && !showLoader ? 'opacity-100' : 'opacity-0'}
          hero-video`}
      >
        <source src="/lv_0_20260809121737.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/60 z-10" />

      {/* ===== CONTENT ===== */}
      <div
        className={`relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white transition-all duration-700
          ${videoReady && !showLoader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div
          className={`space-y-4 sm:space-y-5 transition-all duration-700 ease-out
            ${isExiting ? 'opacity-0 -translate-y-6 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}`}
        >
          <h1 className="font-serif text-[1.85rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tighter drop-shadow-lg min-h-[1.2em] px-1">
            {typedText}
            {phase === 'typing' && (
              <span className="inline-block w-[2.5px] sm:w-[3px] h-[0.8em] ml-1 bg-amber-300 align-middle animate-pulse" />
            )}
          </h1>

          <p
            className={`max-w-xl mx-auto text-base sm:text-xl md:text-2xl text-white/95 drop-shadow-md transition-all duration-700 px-2
              ${showSubtitle && !isExiting
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'}`}
          >
            {MESSAGES[msgIndex].subtitle}
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 transition-opacity duration-700 px-2
            ${videoReady && !showLoader ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-white text-violet-700 hover:bg-white/90 active:scale-[0.98] px-6 sm:px-9 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl font-semibold text-sm sm:text-base md:text-lg inline-flex items-center justify-center gap-2.5 sm:gap-3 transition-all shadow-lg w-full sm:w-auto"
          >
            <i className="fa-solid fa-play text-xs sm:text-sm" />
            Join Live Service
          </button>
          <button
            onClick={() =>
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="border-2 border-white/80 hover:bg-white/10 active:scale-[0.98] px-6 sm:px-9 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl font-semibold text-sm sm:text-base md:text-lg transition-all w-full sm:w-auto"
          >
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
}
