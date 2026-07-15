import { Video, X } from 'lucide-react';

interface LiveModalProps {
  onClose: () => void;
}

export default function LiveModal({ onClose }: LiveModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden animate-fade-in-down">
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-3xl font-serif text-zinc-900">Sunday Service Live</h3>
              <p className="text-zinc-500 mt-2">10:00 AM - 12:30 PM WAT</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
            >
              <X size={20} className="text-zinc-600" />
            </button>
          </div>

          <div className="mt-8 bg-zinc-100 h-64 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Video size={64} className="text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-400">Live stream coming soon</p>
            </div>
          </div>
        </div>
        <div className="border-t flex">
          <button 
            onClick={onClose}
            className="flex-1 py-6 text-zinc-500 font-medium hover:bg-zinc-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
