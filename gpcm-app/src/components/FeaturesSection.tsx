import React from 'react';

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-zinc-900 text-white relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          <div className="md:col-span-5">
            <img
              src="https://i.ibb.co/zhf3LtCg/Whats-App-Image-2026-02-05-at-17-51-46.jpg"
              alt="Apostle Bishop Dr. Ilaya O. Clement"
              className="rounded-3xl shadow-2xl w-full object-cover border border-zinc-800"
            />
          </div>

          <div className="md:col-span-7">
            <div className="uppercase tracking-[3px] text-amber-400 text-sm font-medium mb-3">
              Spiritual Leadership
            </div>
            <h2 className="font-serif text-5xl leading-none mb-6 text-white">
              Apostle Bishop Dr. Ilaya O. Clement
            </h2>
            <p className="text-2xl text-amber-300 mb-8 font-serif italic">President &amp; Founder</p>
            <p className="text-zinc-300 leading-relaxed text-lg mb-8">
              A visionary leader, entrepreneur, and dedicated servant of God. Bishop Clement has a heart
              for the lost and a passion for community transformation. He leads GPCM INT'L with a focus 
              on the holistic development of believers—spirit, mind, and body.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+2348069390490"
                className="flex-1 bg-white text-zinc-900 py-6 rounded-3xl flex items-center justify-center gap-3 font-semibold text-lg hover:bg-amber-300 transition-all"
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
