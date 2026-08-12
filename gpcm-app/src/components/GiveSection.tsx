import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function GiveSection() {
  const [copied, setCopied] = useState(false);

  const copyAccount = () => {
    navigator.clipboard.writeText("8817008125");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="give-section" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-violet-950 to-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
          Partner With Us
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-violet-200 mb-8 sm:mb-12">
          Your generosity fuels the Gospel and transforms lives
        </p>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="text-xs sm:text-sm uppercase tracking-widest mb-2 text-amber-300">Sterling Bank</div>
          <div
            onClick={copyAccount}
            className="cursor-pointer group mb-2"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold tracking-wider sm:tracking-widest group-active:scale-95 transition-transform break-all">
              8817008125
            </div>
            <div className="text-zinc-400 mt-2 text-sm sm:text-base">GPCM INT&apos;L</div>
          </div>

          <button
            onClick={copyAccount}
            className="mt-6 sm:mt-8 w-full py-3.5 sm:py-4 md:py-6 bg-white text-violet-950 rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-2.5 sm:gap-3 hover:bg-amber-300 active:scale-[0.98] transition-all text-sm sm:text-base"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'COPIED!' : 'COPY ACCOUNT NUMBER'}
          </button>
        </div>
      </div>
    </section>
  );
}
