import { useRef, useEffect, useState } from 'react';

/**
 * Full-viewport video that stays pinned while you scroll;
 * the sections below slide over and cover it (parallax "overlap" band).
 * Uses the same hero webm for continuity.
 */
export default function StickyVideoBand() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setReady(true);
    if (v.readyState >= 3) onReady();
    else v.addEventListener('canplay', onReady);
    return () => v.removeEventListener('canplay', onReady);
  }, []);

  return (
    <section
      id="vision"
      aria-label="Ministry vision video"
      className="relative h-[140vh] sm:h-[160vh] md:h-[170vh] bg-zinc-900"
    >
      {/* Sticky stage: video does not scroll away until the band is fully passed */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/lv_0_20260809121737.webm" type="video/webm" />
        </video>

        {/* Soft gradient so text stays readable without hiding the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 text-white">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-amber-300/90 mb-3 font-medium">
            Glowing Palace
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight drop-shadow-lg">
            A place of worship, transformation &amp; impact
          </h2>
          <p className="mt-4 max-w-md text-sm sm:text-base text-white/85 drop-shadow-md">
            Keep scrolling — moments of fellowship await below.
          </p>
          <div className="mt-8 flex flex-col items-center gap-1 text-white/60 animate-bounce">
            <span className="text-[10px] uppercase tracking-wider">Scroll</span>
            <i className="fa-solid fa-chevron-down text-xs" />
          </div>
        </div>
      </div>
    </section>
  );
}
