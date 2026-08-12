import { Church, Users, BookOpen } from 'lucide-react';

const ministries = [
  {
    icon: Church,
    title: "Worship",
    description: "Honoring God with joy and reverence in all that we do.",
    image: "/Honoring-God.webp",
    verse: "Serve the Lord with gladness...",
    ref: "Psalm 100:2"
  },
  {
    icon: Users,
    title: "Growth",
    description: "Pursuing holistic development in spirit, mind, and body.",
    image: "/images/growth.webp"
  },
  {
    icon: BookOpen,
    title: "Discipleship",
    description: "Equipping believers to serve in God's Kingdom.",
    image: "/images/discipleship.webp"
  }
];

export default function MinistriesSection() {
  return (
    <section id="ministries" className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Church size={16} />
            OUR MINISTRIES
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-zinc-900 leading-tight">
            A Place of Worship,<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Transformation &amp; Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {ministries.map((ministry, index) => (
            <div
              key={index}
              className="group bg-white border border-zinc-100 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              <div
                className="h-48 sm:h-56 md:h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${ministry.image}')` }}
              />
              <div className="p-5 sm:p-6 md:p-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-100 text-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <ministry.icon size={22} />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 text-zinc-900">
                  {ministry.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">{ministry.description}</p>
                {ministry.verse && (
                  <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-100">
                    <div className="text-xs italic text-zinc-500">&quot;{ministry.verse}&quot;</div>
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