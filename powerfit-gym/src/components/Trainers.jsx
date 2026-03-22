import { GYM_DATA } from '../data/gymData';

const avatarColors = [
  'from-green-500 to-emerald-700',
  'from-purple-500 to-violet-700',
  'from-blue-500 to-cyan-700',
  'from-orange-500 to-amber-700',
];

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('');

export default function Trainers() {
  return (
    <section id="trainers" className="py-20 bg-[#0B0F19]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#22C55E] font-semibold text-sm uppercase tracking-widest mb-2">
            Our Team
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Expert Trainers
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Certified professionals committed to your goals. Real expertise, real results.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GYM_DATA.trainers.map((trainer, i) => (
            <div
              key={trainer.id}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-[#22C55E]/30 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                >
                  {initials(trainer.name)}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-white font-bold text-lg mb-1">{trainer.name}</h3>

              {/* Speciality badge */}
              <span className="inline-block bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {trainer.speciality}
              </span>

              {/* Bio */}
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{trainer.bio}</p>

              {/* Meta row */}
              <div className="flex justify-center gap-4 text-xs text-[#9CA3AF] border-t border-[#1F2937] pt-4">
                <div>
                  <span className="block text-white font-semibold">{trainer.experience}</span>
                  Experience
                </div>
                <div className="w-px bg-[#1F2937]" />
                <div>
                  <span className="block text-white font-semibold">{trainer.cert}</span>
                  Certified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
