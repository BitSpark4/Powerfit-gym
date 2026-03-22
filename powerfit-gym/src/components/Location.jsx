import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';

export default function Location() {
  const { location, contact, timings } = GYM_DATA;

  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hi, I want to know about membership at PowerFit Gym'
  )}`;

  return (
    <section id="location" className="py-20 bg-[#111827]/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#22C55E] font-semibold text-sm uppercase tracking-widest mb-2">
            Find Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Location & Contact
          </h2>
          <p className="text-[#9CA3AF]">
            Conveniently located in the heart of Chinchwad, Pune.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-[#1F2937] h-80 lg:h-auto min-h-[320px]">
            <iframe
              src={location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PowerFit Gym Location"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            {/* Address */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Address</p>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{location.address}</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Phone</p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="text-[#22C55E] text-sm hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-[#22C55E]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold mb-3">Timings</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Mon – Fri</span>
                      <span className="text-white font-medium">
                        {timings.weekdays.open} – {timings.weekdays.close}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Saturday</span>
                      <span className="text-white font-medium">
                        {timings.saturday.open} – {timings.saturday.close}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Sunday</span>
                      <span className="text-white font-medium">
                        {timings.sunday.open} – {timings.sunday.close}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#1F2937] hover:border-[#22C55E] text-white hover:text-[#22C55E] font-semibold py-3 rounded-full transition-all duration-300 text-sm"
              >
                <Navigation size={16} />
                Get Directions
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold py-3 rounded-full transition-all duration-300 text-sm hover:scale-105"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
