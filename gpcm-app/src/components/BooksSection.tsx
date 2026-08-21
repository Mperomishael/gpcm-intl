import { Link } from 'react-router-dom';
import { BookOpen, Download, ArrowRight } from 'lucide-react';
import { useMedia } from '../hooks/useMedia';

export default function BooksSection() {
  const { media: books, loading } = useMedia('book', 6);

  return (
    <section id="books" className="py-10 sm:py-14 md:py-16 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-medium mb-2">
              <BookOpen size={12} />
              BOOKS &amp; TRACTS
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 leading-snug">
              Liberty Library
            </h2>
            <p className="mt-2 text-sm text-zinc-500 max-w-lg">
              Read ministry books and tracts online, or download the PDF to study offline.
            </p>
          </div>
          <Link
            to="/books"
            className="text-sm text-violet-700 hover:text-violet-900 font-medium inline-flex items-center gap-1"
          >
            See all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl skeleton-preload" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <p className="text-zinc-500 text-sm">Books and tracts will appear here once published from Admin.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 flex flex-col gap-3 hover:border-violet-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-zinc-900 truncate">{item.title || item.originalName}</h3>
                    {item.description && (
                      <p className="text-xs text-zinc-500 line-clamp-2 mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-auto pt-2">
                  <Link
                    to={`/books/${item.id}`}
                    className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                  >
                    Read
                  </Link>
                  {item.downloadable !== false && (
                    <a
                      href={item.url}
                      download={item.originalName || 'book.pdf'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 transition-colors"
                      title="Download PDF"
                    >
                      <Download size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
