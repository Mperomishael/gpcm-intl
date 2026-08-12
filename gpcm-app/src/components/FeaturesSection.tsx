import React from 'react';

export default function FeaturesSection() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-zinc-900 text-white relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

          <div className="md:col-span-5">
            <img
              src="/images/worship.webp"
              alt="Apostle Bishop Dr. Ilaya O. Clement"
              className="rounded-2xl sm:rounded-3xl shadow-2xl w-full object-cover border border-zinc-800 aspect-[4/5] sm:aspect-auto max-h-[420px] md:max-h-none mx-auto"
            />
          </div>

          <div className="md:col-span-7 text-center md:text-left">
            <div className="uppercase tracking-[2px] sm:tracking-[3px] text-amber-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
              Spiritual Leadership
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 sm:mb-6 text-white">
              Apostle Bishop Dr. Ilaya O. Clement
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-amber-300 mb-4 sm:mb-8 font-serif italic">
              President &amp; Founder
            </p>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">
              A visionary leader, entrepreneur, and dedicated servant of God. Bishop Clement has a heart
              for the lost and a passion for community transformation. He leads GPCM INT&apos;L with a focus
              on the holistic development of believers—spirit, mind, and body.
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="tel:+2348069390490"
                className="flex-1 sm:flex-none min-w-[160px] bg-white text-zinc-900 py-3.5 sm:py-5 md:py-6 px-6 rounded-2xl sm:rounded-3xl flex items-center justify-center gap-2.5 sm:gap-3 font-semibold text-sm sm:text-base md:text-lg hover:bg-amber-300 active:scale-[0.98] transition-all"
              >
                <i className="fa-solid fa-phone" />
                Call Bishop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}