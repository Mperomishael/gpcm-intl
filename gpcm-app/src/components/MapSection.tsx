import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MAP_EMBED =
  'https://www.google.com/maps?q=Oharisi+Street,+Ughelli,+Delta+State,+Nigeria&output=embed';
const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Oharisi+Street+Ughelli+Delta+State+Nigeria';

export default function MapSection() {
  return (
    <section id="location" className="py-10 sm:py-12 md:py-16 bg-zinc-50 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-medium mb-2 sm:mb-3">
            <MapPin size={12} />
            FIND US
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-snug">
            Visit Our Campus
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 max-w-md mx-auto px-2">
            #3 Oharisi Street, Opposite Central Garage, Ughelli, Delta State
          </p>
        </div>
        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 shadow-md bg-white">
          <div className="relative w-full aspect-[16/11] sm:aspect-[21/9] min-h-[180px] max-h-[280px] sm:max-h-[360px]">
            <iframe
              title="GPCM INT'L location map"
              src={MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 bg-white">
            <p className="text-xs sm:text-sm text-zinc-600">
              We&apos;d love to host you this Sunday — come as you are.
            </p>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0"
            >
              <Navigation size={14} />
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
