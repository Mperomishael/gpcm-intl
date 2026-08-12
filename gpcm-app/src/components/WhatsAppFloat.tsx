import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/2348069390490"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 bg-green-500 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="sm:w-8 sm:h-8" fill="white" />
    </a>
  );
}