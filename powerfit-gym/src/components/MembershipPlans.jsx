import { Check, Star, MessageCircle } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';

const plans = [
  {
    key: 'monthly',
    label: 'Monthly',
    data: GYM_DATA.membership.monthly,
  },
  {
    key: 'quarterly',
    label: 'Quarterly',
    data: GYM_DATA.membership.quarterly,
  },
  {
    key: 'annual',
    label: 'Annual',
    data: GYM_DATA.membership.annual,
  },
];

export default function MembershipPlans() {
  const whatsappBase = `https://wa.me/${GYM_DATA.contact.whatsapp}?text=`;

  return (
    <section id="membership" className="py-20 bg-[#111827]/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#22C55E] font-semibold text-sm uppercase tracking-widest mb-2">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Membership Plans
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Transparent pricing, no hidden fees. All plans include locker access and a free trial session.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map(({ key, label, data }) => {
            const isPopular = data.popular;
            const msg = `Hi, I want to join PowerFit Gym on the ${label} plan (₹${data.price})`;
            return (
              <div
                key={key}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#111827] border-[#22C55E] scale-105 shadow-xl shadow-green-900/20'
                    : 'bg-[#111827] border-[#1F2937] hover:border-[#22C55E]/40 hover:-translate-y-1'
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1.5 bg-[#FBBF24] text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      <Star size={11} fill="currentColor" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <p className="text-[#9CA3AF] text-sm font-semibold uppercase tracking-widest mb-3">
                  {label}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-[#9CA3AF] text-lg align-top">₹</span>
                  <span className={`text-5xl font-extrabold ${isPopular ? 'text-[#22C55E]' : 'text-white'}`}>
                    {data.price.toLocaleString()}
                  </span>
                  <span className="text-[#9CA3AF] text-sm ml-1">/ {data.period}</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {data.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-[#F9FAFB]">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${isPopular ? 'text-[#22C55E]' : 'text-[#22C55E]'}`}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`${whatsappBase}${encodeURIComponent(msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center font-semibold py-3 rounded-full transition-all duration-300 text-sm flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-lg shadow-green-900/30 hover:scale-105'
                      : 'border-2 border-[#1F2937] hover:border-[#22C55E] text-white hover:text-[#22C55E]'
                  }`}
                >
                  <MessageCircle size={15} />
                  Get Started
                </a>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="text-center text-[#9CA3AF] text-sm mt-8">
          All plans include locker access + free trial session. No joining fee. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
