import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

// Ughelli, Delta State – #3 Oharisi Street, Opposite Central Garage
const MAP_EMBED =
  'https://www.google.com/maps?q=Oharisi+Street,+Ughelli,+Delta+State,+Nigeria&output=embed';
const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Oharisi+Street+Ughelli+Delta+State+Nigeria';

export default function MapSection() {
  return (
    <section id="location" className="py-14 sm:py-16 md:py-20 bg-zinc-50 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <MapPin size={14} />
            FIND US
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 leading-tight">
            Visit Our Campus
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            #3 Oharisi Street, Opposite Central Garage, Ughelli, Delta State
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 shadow-lg bg-white">
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[220px]">
            <iframe
              title="GPCM INT'L location map"
              src={MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white">
            <p className="text-sm text-zinc-600">
              We&apos;d love to host you this Sunday — come as you are.
            </p>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0"
            >
              <Navigation size={16} />
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
