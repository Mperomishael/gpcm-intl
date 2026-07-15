import { useEffect, useRef, useState } from 'react';

const GpcmLogo = ({ className = "w-10 h-10", fill = "rgba(255,255,255,0.8)" }: { className?: string, fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" className={className}>
    <path 
      d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z" 
      fill={fill} 
    />
  </svg>
);

const features = [
  {
    title: "Built for ease, not urgency",
    description: "Drift strips away the noise that makes organizing feel draining. Every surface is made to be soft, quiet, and intuitive so you can move forward, not get stuck decoding.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4"
  },
  {
    title: "The gentlest way to start",
    description: "Beginning your day should feel natural, not daunting. Drift eases you into motion with subtle cues and a quiet view of what deserves your energy right now.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4"
  },
  {
    title: "Deep, undivided focus",
    description: "No interruptions, no clutter. Drift holds you in the present task with a stripped-back layout that softens all else until you are truly ready to shift.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4"
  }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Active detection observer
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveFeature(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Reveal animation observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setRevealedCards((prev) => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        activeObserver.observe(card);
        revealObserver.observe(card);
      }
    });

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const scrollToCard = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="services" className="relative min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85')` 
        }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="px-5 md:px-10 lg:px-16 py-20 md:py-40 lg:py-48">
        <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[460px_1fr] gap-12 xl:gap-24">

          {/* Left Column - Sticky */}
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-32">
            <div>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-[46px] leading-[1.2] font-normal mb-12">
                Software that flows with your mind, not over it
              </h2>

              {/* Feature Nav Buttons */}
              <div className="hidden lg:flex flex-col gap-3">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    className={`text-left px-6 py-4 rounded-2xl transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-black/20 text-white' 
                        : 'bg-black/20 text-white/40 hover:text-white/60'
                    }`}
                  >
                    <span className="font-medium">{feature.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block mt-12">
              <p className="text-white/60 text-sm mb-6 max-w-sm">
                No noise. No complicated systems. Just your day, gently sorted.
              </p>
              <button className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
                Start for free
              </button>
            </div>
          </div>

          {/* Right Column - Scrolling Cards */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`bg-black/20 backdrop-blur-sm rounded-3xl p-6 md:p-10 transition-all duration-700 ease-out ${
                  revealedCards.has(index) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-16'
                }`}
              >
                <GpcmLogo className="w-10 h-10 mb-6" />
                <h3 className="text-white text-xl md:text-2xl font-medium mb-6">
                  {feature.title}
                </h3>

                <div className="aspect-video rounded-2xl overflow-hidden bg-black/30 mb-6">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    src={feature.video}
                  />
                </div>

                <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
