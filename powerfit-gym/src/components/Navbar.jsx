import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GYM_DATA } from '../data/gymData';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Classes', href: '#classes' },
  { label: 'Membership', href: '#membership' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Location', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0B0F19]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-xl font-bold tracking-tight"
        >
          <span className="text-[#22C55E]">PowerFit</span>
          <span className="text-white"> GYM</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[#9CA3AF] hover:text-white font-medium text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#membership"
            onClick={(e) => handleNavClick(e, '#membership')}
            className="hidden md:inline-flex bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold text-sm px-5 py-2 rounded-full transition-all duration-300"
          >
            Join Now
          </a>
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B0F19]/98 border-t border-[#1F2937] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[#9CA3AF] hover:text-white font-medium py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#membership"
            onClick={(e) => handleNavClick(e, '#membership')}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold text-sm px-5 py-2.5 rounded-full text-center transition-all duration-300"
          >
            Join Now
          </a>
        </div>
      )}
    </nav>
  );
}
