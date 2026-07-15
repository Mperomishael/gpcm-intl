import { useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  "https://i.ibb.co/8nk0rjz1/20251006-065800.png",
  "https://i.ibb.co/1tyF9xV6/20251006-065939.jpg",
  "https://i.ibb.co/sJvHDNwM/IMG-20250918-111813.jpg",
  "https://i.ibb.co/r2Z4dp3Y/IMG-20250918-112026.jpg",
  "https://i.ibb.co/C30xt8n2/IMG-20250925-113020.jpg",
  "https://i.ibb.co/wF3QSv9W/IMG-20251030-111101.jpg"
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-zinc-900">
            Moments in God's Presence
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(src)}
              className="aspect-square rounded-3xl overflow-hidden cursor-pointer group"
            >
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-zinc-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view"
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
