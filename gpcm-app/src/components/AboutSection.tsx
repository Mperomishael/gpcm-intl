import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#F6E4CF] rounded-t-[25px] relative z-10 mt-[-25px] px-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-6 py-2 rounded-full text-sm font-medium mb-4">
            <i className="fa-solid fa-church"></i>
            ABOUT GPCM INT'L
          </div>
          <h2 className="font-serif text-6xl font-bold tracking-tighter text-[#321C04]">
            A Place of Worship,<br />Transformation &amp; Impact
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Worship Card */}
          <div className="card-hover bg-[#FFF9F2] border border-[#D9C4AA] rounded-3xl overflow-hidden group">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/8nk0rjz1/20251006-065800.png')" }}></div>
            <div className="p-8">
              <h3 className="font-serif text-3xl font-semibold mb-3 text-[#321C04]">Worship</h3>
              <p className="text-[#321C04]/80">Honoring God with joy and reverence in all that we do.</p>
              <div className="mt-8 pt-6 border-t border-[#D9C4AA] text-xs italic text-[#321C04]/60">"Serve the Lord with gladness..."</div>
              <div className="text-[10px] text-[#321C04]/40 mt-1">Psalm 100:2</div>
            </div>
          </div>
          
          {/* Growth Card */}
          <div className="card-hover bg-[#FFF9F2] border border-[#D9C4AA] rounded-3xl overflow-hidden group">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/1tyF9xV6/20251006-065939.jpg')" }}></div>
            <div className="p-8">
              <h3 className="font-serif text-3xl font-semibold mb-3 text-[#321C04]">Growth</h3>
              <p className="text-[#321C04]/80">Pursuing holistic development in spirit, mind, and body.</p>
            </div>
          </div>
          
          {/* Discipleship Card */}
          <div className="card-hover bg-[#FFF9F2] border border-[#D9C4AA] rounded-3xl overflow-hidden group">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/sJvHDNwM/IMG-20250918-111813.jpg')" }}></div>
            <div className="p-8">
              <h3 className="font-serif text-3xl font-semibold mb-3 text-[#321C04]">Discipleship</h3>
              <p className="text-[#321C04]/80">Equipping believers to serve in God's Kingdom.</p>
            </div>
          </div>
        </div>
        
        {/* Decorative Divider block based on Drift design patterns */}
        <div className="my-20 flex items-center gap-1 w-full">
          <div className="w-2 h-2 rounded-full bg-[#D9C4AA]" />
          <div className="flex-1 h-[2px] bg-[#D9C4AA]" />
          <div className="w-2 h-2 rounded-full bg-[#D9C4AA]" />
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#FFF9F2] to-[#FFF9F2]/70 border border-[#D9C4AA] p-10 rounded-3xl shadow-sm">
            <h3 className="font-serif text-4xl mb-6 text-[#321C04]">Our Vision</h3>
            <p className="text-lg leading-relaxed text-[#321C04]/90">
              To see souls saved, lives transformed, and communities impacted through the love of Jesus Christ.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#FFF9F2] to-[#FFF9F2]/70 border border-[#D9C4AA] p-10 rounded-3xl shadow-sm">
            <h3 className="font-serif text-4xl mb-6 text-[#321C04]">Our Mission</h3>
            <p className="text-lg leading-relaxed text-[#321C04]/90">
              To worship joyfully, equip the saints, proclaim the Gospel, and demonstrate Christ's love.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
