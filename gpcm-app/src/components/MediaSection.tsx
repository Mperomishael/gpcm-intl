import { useState } from 'react';
import { Play, Headphones, Download, X } from 'lucide-react';
import { useMedia } from '../hooks/useMedia';

function youtubeEmbedUrl(youtubeUrl?: string) {
  if (!youtubeUrl) return '';
  const match = youtubeUrl.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  const id = match?.[1];
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : '';
}

export default function MediaSection() {
  const { media: videos, loading: loadingV } = useMedia('sermon_video');
  const { media: audios, loading: loadingA } = useMedia('sermon_audio');
  const loading = loadingV || loadingA;
  const [playing, setPlaying] = useState<{ url: string; isYoutube: boolean } | null>(null);

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
                  {videos.map((item) => {
                    const isYoutube = item.source === 'youtube';
                    const thumb = isYoutube ? item.thumbnailUrl : item.url;
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          setPlaying({ url: isYoutube ? (item.youtubeUrl || item.url) : item.url, isYoutube })
                        }
                        className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-left"
                      >
                        <div className="aspect-video bg-zinc-800 relative">
                          {isYoutube ? (
                            <img src={thumb} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
                          ) : (
                            <video
                              src={item.url}
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                              muted
                              preload="metadata"
                            />
                          )}
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
                      </button>
                    );
                  })}
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
                        {item.downloadable && (
                          <a
                            href={item.url}
                            download={item.originalName}
                            className="shrink-0 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                            title="Download"
                          >
                            <Download size={14} />
                          </a>
                        )}
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

      {/* Video player modal */}
      {playing && (
        <div
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-3"
          onClick={() => setPlaying(null)}
        >
          <div className="relative max-w-4xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPlaying(null)}
              className="absolute -top-9 right-0 text-white p-1.5"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            {playing.isYoutube ? (
              <iframe
                src={youtubeEmbedUrl(playing.url)}
                title="Sermon video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-xl sm:rounded-2xl"
              />
            ) : (
              <video src={playing.url} controls autoPlay className="w-full h-full rounded-xl sm:rounded-2xl" />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
