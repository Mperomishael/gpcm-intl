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
    <section id="give-section" className="py-24 bg-gradient-to-br from-violet-950 to-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-serif text-5xl md:text-6xl mb-6">Partner With Us</h2>
        <p className="text-xl text-violet-200 mb-12">
          Your generosity fuels the Gospel and transforms lives
        </p>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12">
          <div className="text-sm uppercase tracking-widest mb-2 text-amber-300">Sterling Bank</div>
          <div 
            onClick={copyAccount} 
            className="cursor-pointer group mb-2"
          >
            <div className="text-4xl md:text-5xl font-mono font-bold tracking-widest group-active:scale-95 transition-transform">
              8817008125
            </div>
            <div className="text-zinc-400 mt-2">GPCM INT'L</div>
          </div>

          <button 
            onClick={copyAccount}
            className="mt-8 w-full py-4 md:py-6 bg-white text-violet-950 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-amber-300 transition-all"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'COPIED!' : 'COPY ACCOUNT NUMBER'}
          </button>
        </div>
      </div>
    </section>
  );
}
