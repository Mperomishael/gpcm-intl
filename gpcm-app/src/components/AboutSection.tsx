import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-[#F6E4CF] rounded-t-[20px] sm:rounded-t-[25px] relative z-10 mt-[-20px] sm:mt-[-25px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <i className="fa-solid fa-church" />
            ABOUT GPCM INT'L
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#321C04] leading-tight">
            A Place of Worship,<br className="hidden xs:block" />
            <span className="xs:hidden"> </span>Transformation &amp; Impact
          </h2>
        </div>

        {/* Value Cards – single column on phones, 2/3 on larger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          <div className="card-hover bg-[#FFF9F2] border border-[#D9C4AA] rounded-2xl sm:rounded-3xl overflow-hidden group">
            <div
              className="h-48 sm:h-56 md:h-64 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/worship.webp')" }}
            />
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 text-[#321C04]">Worship</h3>
              <p className="text-sm sm:text-base text-[#321C04]/80">Honoring God with joy and reverence in all that we do.</p>
              <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-[#D9C4AA] text-xs italic text-[#321C04]/60">
                &quot;Serve the Lord with gladness...&quot;
              </div>
              <div className="text-[10px] text-[#321C04]/40 mt-1">Psalm 100:2</div>
            </div>
          </div>

          <div className="card-hover bg-[#FFF9F2] border border-[#D9C4AA] rounded-2xl sm:rounded-3xl overflow-hidden group">
            <div
              className="h-48 sm:h-56 md:h-64 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/growth.webp')" }}
            />
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 text-[#321C04]">Growth</h3>
              <p className="text-sm sm:text-base text-[#321C04]/80">Pursuing holistic development in spirit, mind, and body.</p>
            </div>
          </div>

          <div className="card-hover bg-[#FFF9F2] border border-[#D9C4AA] rounded-2xl sm:rounded-3xl overflow-hidden group sm:col-span-2 lg:col-span-1">
            <div
              className="h-48 sm:h-56 md:h-64 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/discipleship.webp')" }}
            />
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 text-[#321C04]">Discipleship</h3>
              <p className="text-sm sm:text-base text-[#321C04]/80">Equipping believers to serve in God&apos;s Kingdom.</p>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="my-12 sm:my-16 md:my-20 flex items-center gap-1 w-full">
          <div className="w-2 h-2 rounded-full bg-[#D9C4AA]" />
          <div className="flex-1 h-[2px] bg-[#D9C4AA]" />
          <div className="w-2 h-2 rounded-full bg-[#D9C4AA]" />
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          <div className="bg-[#FFF9F2] border border-[#D9C4AA] p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-[#321C04]">Our Vision</h3>
            <p className="text-base sm:text-lg leading-relaxed text-[#321C04]/90">
              To see souls saved, lives transformed, and communities impacted through the love of Jesus Christ.
            </p>
          </div>
          <div className="bg-[#FFF9F2] border border-[#D9C4AA] p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-[#321C04]">Our Mission</h3>
            <p className="text-base sm:text-lg leading-relaxed text-[#321C04]/90">
              To worship joyfully, equip the saints, proclaim the Gospel, and demonstrate Christ&apos;s love.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}