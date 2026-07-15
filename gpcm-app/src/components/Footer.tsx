import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 text-white mb-6">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-amber-500 rounded-xl flex items-center justify-center">
                <span className="font-serif text-white font-bold">G</span>
              </div>
              <div className="font-serif text-2xl font-bold text-white">GPCM INT'L</div>
            </div>
            <p className="text-sm leading-relaxed">
              A vibrant Spirit-filled community dedicated to worship, discipleship, and community transformation.
            </p>
          </div>

          <div>
            <div className="uppercase text-xs tracking-widest mb-6 text-white">Quick Links</div>
            <div className="space-y-3 text-sm">
              <div><a href="#about" className="hover:text-white transition-colors">About Us</a></div>
              <div><a href="#ministries" className="hover:text-white transition-colors">Ministries</a></div>
              <div><a href="#gallery" className="hover:text-white transition-colors">Events</a></div>
              <div><a href="#contact" className="hover:text-white transition-colors">Contact</a></div>
            </div>
          </div>

          <div>
            <div className="uppercase text-xs tracking-widest mb-6 text-white">Bank Details</div>
            <div className="text-sm bg-white/5 p-6 rounded-3xl">
              <div><span className="text-amber-300">Acct:</span> 8817008125</div>
              <div className="mt-1"><span className="text-amber-300">Name:</span> GPCM INT'L</div>
              <div className="mt-4 text-xs text-zinc-500">Sterling Bank</div>
            </div>
          </div>

          <div>
            <div className="uppercase text-xs tracking-widest mb-6 text-white">Connect</div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Youtube size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs mt-20 pt-8 border-t border-white/10">
          © 2026 Glowing Palace of Christian Ministry International. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
