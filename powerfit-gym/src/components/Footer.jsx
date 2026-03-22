import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Classes', href: '#classes' },
  { label: 'Membership', href: '#membership' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Location', href: '#location' },
];

export default function Footer() {
  const { name, tagline, contact, location } = GYM_DATA;

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0F19] border-t border-[#1F2937] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-3">
              <span className="text-[#22C55E]">PowerFit</span>
              <span className="text-white"> GYM</span>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5 max-w-xs">
              {tagline} Chinchwad's premier fitness centre — real results, real coaches.
            </p>
            <div className="flex gap-3">
              <a
                href={contact.instagram}
                className="w-9 h-9 bg-[#111827] border border-[#1F2937] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={contact.youtube}
                className="w-9 h-9 bg-[#111827] border border-[#1F2937] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a
                href={contact.facebook}
                className="w-9 h-9 bg-[#111827] border border-[#1F2937] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold mb-4">Quick Links</p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-[#9CA3AF] hover:text-[#22C55E] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-4">Contact</p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-[#9CA3AF] text-sm">
                <MapPin size={14} className="text-[#22C55E] mt-0.5 shrink-0" />
                {location.address}
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone size={14} className="text-[#22C55E] shrink-0" />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="text-[#9CA3AF] hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail size={14} className="text-[#22C55E] shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[#9CA3AF] hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1F2937] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#9CA3AF] text-sm">
            © 2025 PowerFit Gym, Chinchwad. All rights reserved.
          </p>
          <p className="text-[#9CA3AF] text-xs">
            Built with ❤️ in Pune
          </p>
        </div>
      </div>
    </footer>
  );
}
