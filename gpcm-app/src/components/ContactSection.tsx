import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = () => {
    alert("✅ Thank you! Your message has been received. We will get back to you shortly.");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-10 text-zinc-900">
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-zinc-100 border-0 focus:ring-2 focus:ring-violet-400 rounded-2xl px-7 py-5 outline-none w-full"
                />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-zinc-100 border-0 focus:ring-2 focus:ring-violet-400 rounded-2xl px-7 py-5 outline-none w-full"
                />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-zinc-100 border-0 focus:ring-2 focus:ring-violet-400 rounded-2xl px-7 py-5 outline-none"
              />
              <textarea 
                placeholder="Your Message or Prayer Request..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-zinc-100 border-0 focus:ring-2 focus:ring-violet-400 rounded-3xl px-7 py-5 outline-none resize-none"
              />
              <button 
                onClick={handleSubmit}
                className="w-full bg-violet-600 hover:bg-violet-700 transition-colors text-white py-5 md:py-7 text-lg font-semibold rounded-3xl flex items-center justify-center gap-3"
              >
                <Send size={20} />
                SEND MESSAGE
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-10 pt-8">
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <div className="font-semibold text-lg text-zinc-900">
                  #3 Oharisi Street, Opposite Central Garage, Ughelli, Delta State
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone size={28} />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-lg text-zinc-900">+234 815 601 3387</div>
                <div className="font-semibold text-lg text-zinc-900">+234 806 939 0490</div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail size={28} />
              </div>
              <div className="font-semibold text-lg text-zinc-900">support@glowingpalaceministry.org</div>
            </div>

            {/* Bishop Card */}
            <div className="mt-12 bg-zinc-900 rounded-3xl p-8 text-white">
              <div className="uppercase tracking-[3px] text-amber-400 text-sm font-medium mb-3">
                Spiritual Leadership
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-2">
                Apostle Bishop Dr. Ilaya O. Clement
              </h3>
              <p className="text-xl text-amber-300 mb-6">President & Founder</p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                A visionary leader, entrepreneur, and dedicated servant of God. Bishop Clement has a heart for the lost and a passion for community transformation.
              </p>
              <a 
                href="tel:+2348069390490"
                className="inline-flex items-center gap-3 bg-white text-zinc-900 px-6 py-4 rounded-2xl font-semibold hover:bg-amber-300 transition-colors"
              >
                <Phone size={20} />
                Call Bishop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
