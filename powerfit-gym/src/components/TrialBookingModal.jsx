import { useState } from 'react';
import { X } from 'lucide-react';

export default function TrialBookingModal({ batchTime, batchType, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState('Monday');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please fill in your name and WhatsApp number.');
      return;
    }
    setError('');

    const msg = `Hi PowerFit! I want to book a FREE TRIAL.\nName: ${name}\nPhone: ${phone}\nBatch: ${batchTime} - ${batchType}\nDay: ${day}`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    setSuccess(true);
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 w-full max-w-md mx-4 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h3 className="text-white font-bold text-xl mb-1">Book Your Free Trial Session</h3>
        <p className="text-[#9CA3AF] text-sm mb-6">First session is completely free. No commitment.</p>

        {success ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-[#22C55E]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-white font-semibold">Opening WhatsApp to confirm your booking!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Pre-filled batch info */}
            <div>
              <label className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Selected Batch
              </label>
              <div className="w-full bg-[#0B0F19]/80 border border-[#1F2937] rounded-lg px-4 py-3 text-[#9CA3AF] text-sm">
                {batchTime} — {batchType}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:border-[#22C55E] focus:outline-none transition-colors placeholder-[#6B7280]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98765 43210"
                className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:border-[#22C55E] focus:outline-none transition-colors placeholder-[#6B7280]"
              />
            </div>

            {/* Day */}
            <div>
              <label className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Preferred Day
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:border-[#22C55E] focus:outline-none transition-colors"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold py-3 rounded-xl transition-all duration-300 mt-1"
            >
              Confirm Free Trial
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
