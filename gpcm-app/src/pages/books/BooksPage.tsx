import { Link } from 'react-router-dom';
import { BookOpen, Download, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import { useMedia } from '../../hooks/useMedia';

export default function BooksPage() {
  const { media: books, loading } = useMedia('book');

  return (
    <div className="tail-container bg-zinc-50 text-zinc-900 min-h-screen">
      <Navbar onOpenLiveModal={() => (window.location.href = '/live')} />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-5">
          <Link to="/#books" className="inline-flex items-center gap-1 text-sm text-violet-700 mb-6 hover:underline">
            <ArrowLeft size={14} /> Home
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">Books &amp; Tracts</h1>
          <p className="text-zinc-500 text-sm mb-8">Read online or download PDFs from the Liberty Library.</p>

          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-36 rounded-2xl skeleton-preload" />
              ))}
            </div>
          ) : books.length === 0 ? (
            <p className="text-zinc-500">No published books yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {books.map((item) => (
                <div key={item.id} className="rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                      <BookOpen size={20} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-medium text-zinc-900">{item.title || item.originalName}</h2>
                      {item.description && (
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-3">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      to={`/books/${item.id}`}
                      className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700"
                    >
                      Read
                    </Link>
                    {item.downloadable !== false && (
                      <a
                        href={item.url}
                        download={item.originalName || 'book.pdf'}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
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
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
