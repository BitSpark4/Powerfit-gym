import { ChevronDown, Dumbbell, Zap, Heart, Music, Flame } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';

const classIcons = [
  { label: 'Strength', icon: Dumbbell },
  { label: 'CrossFit', icon: Zap },
  { label: 'Yoga', icon: Heart },
  { label: 'Zumba', icon: Music },
  { label: 'HIIT', icon: Flame },
];

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />
      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-[#22C55E]/5" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[#22C55E] text-sm font-medium">
            Chinchwad's Premier Fitness Centre
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Transform Your Body.
          <br />
          <span className="text-[#22C55E]">Elevate Your Life.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[#9CA3AF] text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Results Guaranteed — Join thousands of members who made the change.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button
            onClick={() => handleScroll('#membership')}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 text-base shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:scale-105"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => handleScroll('#membership')}
            className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-base hover:bg-white/10"
          >
            View Membership Plans
          </button>
        </div>

        {/* Class pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {classIcons.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium"
            >
              <Icon size={14} className="text-[#22C55E]" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('#classes')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
