import { Church, Users, BookOpen } from 'lucide-react';

const ministries = [
  {
    icon: Church,
    title: "Worship",
    description: "Honoring God with joy and reverence in all that we do.",
    image: "https://i.ibb.co/8nk0rjz1/20251006-065800.png",
    verse: "Serve the Lord with gladness...",
    ref: "Psalm 100:2"
  },
  {
    icon: Users,
    title: "Growth",
    description: "Pursuing holistic development in spirit, mind, and body.",
    image: "https://i.ibb.co/1tyF9xV6/20251006-065939.jpg"
  },
  {
    icon: BookOpen,
    title: "Discipleship",
    description: "Equipping believers to serve in God's Kingdom.",
    image: "https://i.ibb.co/sJvHDNwM/IMG-20250918-111813.jpg"
  }
];

export default function MinistriesSection() {
  return (
    <section id="ministries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Church size={16} />
            OUR MINISTRIES
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900">
            A Place of Worship,<br/>Transformation & Impact
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <div 
              key={index} 
              className="group bg-white border border-zinc-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div 
                className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${ministry.image}')` }}
              />
              <div className="p-8">
                <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-4">
                  <ministry.icon size={24} />
                </div>
                <h3 className="font-serif text-3xl font-semibold mb-3 text-zinc-900">{ministry.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{ministry.description}</p>
                {ministry.verse && (
                  <div className="mt-8 pt-6 border-t border-zinc-100">
                    <div className="text-xs italic text-zinc-500">"{ministry.verse}"</div>
                    <div className="text-[10px] text-zinc-400 mt-1">{ministry.ref}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
