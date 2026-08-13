import { Play, Headphones } from 'lucide-react';
import { useMedia } from '../hooks/useMedia';

export default function MediaSection() {
  const { media: videos, loading: loadingV } = useMedia('sermon_video');
  const { media: audios, loading: loadingA } = useMedia('sermon_audio');
  const loading = loadingV || loadingA;

  return (
    <section id="media" className="py-10 sm:py-14 md:py-16 bg-zinc-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-amber-300 px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-medium mb-2 sm:mb-3">
            <Play size={12} />
            WATCH &amp; LISTEN
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Sunday Videos &amp; Gospel Audio
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
            Messages by Bishop Dr. Ilaya O. Clement — stream or download and be strengthened in the Word.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video rounded-2xl skeleton-preload-dark" />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {/* Videos */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-300 mb-4 uppercase tracking-wide">
                <Play size={16} /> Sunday Videos
              </h3>
              {videos.length === 0 ? (
                <p className="text-zinc-500 text-sm">Videos will appear here once uploaded from Admin.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="aspect-video bg-zinc-800 relative">
                        <video
                          src={item.url}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                          muted
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="w-12 h-12 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center shadow-lg">
                            <Play size={20} fill="currentColor" />
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5">
                        <p className="text-sm font-medium truncate">
                          {item.title || item.originalName}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Audio */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-300 mb-4 uppercase tracking-wide">
                <Headphones size={16} /> Gospel Audio
              </h3>
              {audios.length === 0 ? (
                <p className="text-zinc-500 text-sm">Audio messages will appear here once uploaded from Admin.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {audios.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/30 text-violet-200 flex items-center justify-center shrink-0">
                          <Headphones size={18} />
                        </div>
                        <p className="text-sm font-medium truncate flex-1">
                          {item.title || item.originalName}
                        </p>
                      </div>
                      <audio controls className="w-full h-9" preload="none" src={item.url}>
                        Your browser does not support audio.
                      </audio>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
