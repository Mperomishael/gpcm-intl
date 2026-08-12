// src/components/GallerySection.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { useMedia } from '../hooks/useMedia';

export default function GallerySection() {
  const { media, loading } = useMedia('gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
            Moments in God&apos;s Presence
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl sm:rounded-3xl skeleton-preload" />
            ))}
          </div>
        ) : media.length === 0 ? (
          <p className="text-center text-zinc-500 text-sm sm:text-base">No gallery images yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.url)}
                className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.url}
                  alt={item.originalName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-zinc-300 transition-colors p-2"
              aria-label="Close"
            >
              <X size={28} className="sm:w-8 sm:h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full rounded-2xl sm:rounded-3xl shadow-2xl max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
