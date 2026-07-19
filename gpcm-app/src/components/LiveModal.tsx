import React from 'react';

interface LiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveModal({ isOpen, onClose }: LiveModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        {/* Close button — fully wired to onClose prop */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 text-3xl font-bold leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="p-10">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
            <i className="fa-solid fa-tower-broadcast" />
          </div>
          <h3 className="text-3xl font-serif text-zinc-900 mb-2">Sunday Service Live</h3>
          <p className="text-zinc-500 mb-8">
            Join our global family online every Sunday at 10:00 AM WAT.
          </p>

          <div className="space-y-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-5 bg-[#1877F2] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all"
            >
              <i className="fa-brands fa-facebook" />
              Watch on Facebook
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-5 bg-[#FF0000] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all"
            >
              <i className="fa-brands fa-youtube" />
              Watch on YouTube
            </a>
          </div>
        </div>

        {/* Bottom close strip */}
        <div className="border-t">
          <button
            onClick={onClose}
            className="w-full py-5 text-zinc-500 font-medium hover:bg-zinc-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
