import { Mail, Plus } from 'lucide-react';

const GpcmLogo = ({ className = "w-10 h-10", fill = "#321C04" }: { className?: string, fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" className={className}>
    <path 
      d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z" 
      fill={fill} 
    />
  </svg>
);

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 bg-[#F6E4CF] rounded-t-[25px] py-20 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-6 py-2 rounded-full text-sm font-medium mb-6">
          <span>✝</span>
          ABOUT GPCM INT'L
        </div>

        <p className="text-[#321C04] text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
          We craft tools that move with your rhythm, not over it. Designed for ease, presence, and flow. 
          A vibrant Spirit-filled community dedicated to worship, discipleship, and community transformation.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#321C04] text-[#FFF9F2] rounded-full px-6 py-3 flex items-center gap-3 uppercase tracking-wide font-medium text-sm hover:bg-[#1F1003] transition-colors">
            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Mail size={16} className="text-[#321C04]" />
            </span>
            Say hello
          </button>
          <button className="bg-[#D9C4AA] text-[#321C04] rounded-full px-6 py-3 flex items-center gap-3 uppercase tracking-wide font-medium text-sm hover:bg-[#CEBA9E] transition-colors">
            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Plus size={16} className="text-[#321C04]" />
            </span>
            Stay informed
          </button>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="max-w-6xl mx-auto flex items-center gap-2 mb-16 px-6">
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA]" />
        <div className="flex-1 h-[2px] bg-[#D9C4AA]" />
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA]" />
      </div>

      {/* Bottom Area */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="flex items-center gap-4 md:w-1/3">
          <GpcmLogo className="w-12 h-12" fill="#321C04" />
          <div className="text-xs uppercase tracking-widest font-semibold text-[#321C04] leading-tight">
            Calm /<br/>Amplified
          </div>
        </div>

        <div className="md:w-2/3">
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] font-normal text-[#321C04]">
            A Place of Worship, Transformation & Impact. We make AI tools and assistants. But, most importantly, we help you remember what gentle productivity looks like when software moves with you, not over you.
          </h3>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-violet-50 to-amber-50 border border-violet-100 p-10 rounded-3xl">
          <h3 className="font-serif text-4xl mb-6 text-[#321C04]">Our Vision</h3>
          <p className="text-lg leading-relaxed text-[#321C04]/80">
            To see souls saved, lives transformed, and communities impacted through the love of Jesus Christ.
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-violet-50 border border-amber-100 p-10 rounded-3xl">
          <h3 className="font-serif text-4xl mb-6 text-[#321C04]">Our Mission</h3>
          <p className="text-lg leading-relaxed text-[#321C04]/80">
            To worship joyfully, equip the saints, proclaim the Gospel, and demonstrate Christ's love.
          </p>
        </div>
      </div>
    </section>
  );
}
