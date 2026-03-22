import { useState } from 'react';
import { Clock, User, MessageCircle } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';

const tabs = ['Weekdays', 'Saturday', 'Sunday'];

const sundayBatches = [
  { id: 7, time: '7:00 AM – 9:00 AM', type: 'Open Gym', trainer: 'All Trainers', slots: 20, booked: 8, days: 'Sunday' },
  { id: 8, time: '9:00 AM – 10:30 AM', type: 'Yoga & Meditation', trainer: 'Sneha More', slots: 12, booked: 5, days: 'Sunday' },
];

const saturdayBatches = GYM_DATA.batches.filter((b) => b.days.includes('Sat'));

function SlotPill({ available, slots, booked }) {
  const pct = (booked / slots) * 100;

  let pillClass, label;
  if (available === 0) {
    pillClass = 'bg-red-900/30 text-red-400 border border-red-800/50';
    label = 'Full — Waitlist';
  } else if (available <= 3) {
    pillClass = 'bg-orange-900/30 text-orange-400 border border-orange-800/50';
    label = `Only ${available} slots left!`;
  } else {
    pillClass = 'bg-green-900/30 text-[#22C55E] border border-green-800/50';
    label = `${available} slots available`;
  }

  const barColor = pct > 90 ? 'bg-red-500' : pct >= 70 ? 'bg-orange-400' : 'bg-[#22C55E]';

  return (
    <div className="flex flex-col gap-1.5 min-w-[130px]">
      <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full w-fit ${pillClass}`}>
        {label}
      </span>
      <div className="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function ClassSchedule({ openTrialForm }) {
  const [activeTab, setActiveTab] = useState('Weekdays');

  const getBatches = () => {
    if (activeTab === 'Weekdays') return GYM_DATA.batches;
    if (activeTab === 'Saturday') return saturdayBatches;
    return sundayBatches;
  };

  const whatsappLink = `https://wa.me/${GYM_DATA.contact.whatsapp}?text=${encodeURIComponent(
    'Hi, I want to book a trial class at PowerFit Gym'
  )}`;

  return (
    <section id="classes" className="py-20 bg-[#0B0F19]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#22C55E] font-semibold text-sm uppercase tracking-widest mb-2">
            Schedule
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Class Timetable
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Find a batch that fits your schedule. Early morning to late night — we're here for you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#111827] border border-[#1F2937] rounded-full p-1 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab ? 'bg-[#22C55E] text-white shadow' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block rounded-2xl border border-[#1F2937] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#111827] border-b border-[#1F2937]">
                <th className="text-left text-[#9CA3AF] text-sm font-semibold px-6 py-3">Time</th>
                <th className="text-left text-[#9CA3AF] text-sm font-semibold px-6 py-3">Class</th>
                <th className="text-left text-[#9CA3AF] text-sm font-semibold px-6 py-3">Trainer</th>
                <th className="text-left text-[#9CA3AF] text-sm font-semibold px-6 py-3">Availability</th>
                <th className="text-left text-[#9CA3AF] text-sm font-semibold px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {getBatches().map((batch, i) => {
                const available = batch.slots - batch.booked;
                return (
                  <tr
                    key={batch.id}
                    className={`border-b border-[#1F2937] transition-colors ${
                      i % 2 === 0 ? 'bg-[#0B0F19]' : 'bg-[#111827]/50'
                    } hover:bg-[#111827]`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white font-medium text-sm">
                        <Clock size={14} className="text-[#22C55E]" />
                        {batch.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white text-sm">{batch.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                        <User size={14} />
                        {batch.trainer}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <SlotPill available={available} slots={batch.slots} booked={batch.booked} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openTrialForm(batch.time, batch.type)}
                        className="text-xs text-[#22C55E] underline underline-offset-2 hover:text-[#16A34A] transition-colors whitespace-nowrap"
                      >
                        Book Free Trial
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden flex flex-col gap-3">
          {getBatches().map((batch) => {
            const available = batch.slots - batch.booked;
            return (
              <div key={batch.id} className="bg-[#111827] border border-[#1F2937] rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-semibold text-sm">{batch.type}</span>
                </div>
                <p className="text-[#22C55E] text-sm font-medium mb-1">{batch.time}</p>
                <p className="text-[#9CA3AF] text-xs mb-3">{batch.trainer}</p>
                <SlotPill available={available} slots={batch.slots} booked={batch.booked} />
                <button
                  onClick={() => openTrialForm(batch.time, batch.type)}
                  className="mt-3 text-xs text-[#22C55E] underline underline-offset-2 hover:text-[#16A34A] transition-colors"
                >
                  Book Free Trial
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-green-900/20"
          >
            <MessageCircle size={18} />
            Book a Trial Class
          </a>
        </div>
      </div>
    </section>
  );
}
