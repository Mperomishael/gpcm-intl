import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';

export default function LivePage() {
  return (
    <div className="tail-container bg-zinc-50 text-zinc-900 min-h-screen relative overflow-x-clip">
      <Navbar onOpenLiveModal={() => {}} />
      <main className="pt-20">
        <section className="py-12 sm:py-16 md:py-20 bg-[#F6E4CF] relative z-10 min-h-[70vh] flex items-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-5 w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-medium mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE STREAM
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#321C04] leading-snug">
                Join Us Live
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#321C04]/80">
                Sunday Service · Every Sunday at 9:00 AM WAT
              </p>
            </div>

            <div
              className="relative overflow-hidden rounded-3xl border border-white/25 shadow-2xl backdrop-blur-2xl p-7 sm:p-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
                boxShadow:
                  '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-red-500/25 border border-red-400/30 text-red-600 flex items-center justify-center text-2xl mb-5 backdrop-blur-sm mx-auto">
                <i className="fa-solid fa-tower-broadcast" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#321C04] text-center mb-2">
                Sunday Service Live
              </h2>
              <p className="text-[#321C04]/75 text-sm sm:text-base mb-7 leading-relaxed text-center">
                Join our global family online every Sunday. Choose your preferred platform below.
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/people/Glowing-Palace/61581418854698"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/25 text-[#1877F2] font-semibold text-sm hover:bg-[#1877F2]/20 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <i className="fa-brands fa-facebook text-lg" />
                    Watch on Facebook
                  </span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-70" />
                </a>

                <a
                  href="https://youtube.com/@palaceofworshippers"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-600 font-semibold text-sm hover:bg-red-500/20 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <i className="fa-brands fa-youtube text-lg" />
                    Watch on YouTube
                  </span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-70" />
                </a>

                <a
                  href="https://www.instagram.com/glowing.palace"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/25 text-purple-700 font-semibold text-sm hover:from-purple-500/20 hover:to-pink-500/20 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <i className="fa-brands fa-instagram text-lg" />
                    Follow on Instagram
                  </span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-70" />
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D9C4AA]/50 text-center">
                <p className="text-xs text-[#321C04]/60 mb-4">
                  Can&apos;t join live? Catch the replay on any of the platforms above.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-800"
                >
                  <i className="fa-solid fa-arrow-left text-xs" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
