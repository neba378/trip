import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { path: '/trips', labelEn: 'Expeditions', labelAm: 'ጉዞዎች' },
  { path: '/gallery', labelEn: 'Gallery', labelAm: 'ማዕከለ-ስዕላት' },
  { path: '/about', labelEn: 'Our Story', labelAm: 'ታሪካችን' },
  { path: '/contact', labelEn: 'Contact', labelAm: 'ያግኙን' },
  { path: '/my-bookings', labelEn: 'My Bookings', labelAm: 'ቦታ ማስያዣዎቼ' },
];

export default function Navbar() {
  const { language, toggleLanguage } = useBooking();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      role="navigation"
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled ? 'h-14 shadow-[0_1px_0_rgba(212,160,23,0.12)]' : 'h-[72px]'
      }`}
      style={{
        background: `rgba(18,25,38,0.98)`,
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-display font-bold text-xl leading-none tracking-tighter hover:text-savanna-gold transition-colors duration-200"
        >
          SAVANNA
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {language === 'en' ? link.labelEn : link.labelAm}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-white/40 hover:text-savanna-gold transition-colors duration-200 text-xs font-medium uppercase tracking-widest px-3 py-2"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            <span>{language === 'en' ? 'አማ' : 'EN'}</span>
          </button>

          <Link to="/trips" className="btn-primary text-xs py-2.5 px-6">
            {language === 'en' ? 'Book a Trip' : 'ጉዞ ያስይዙ'}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-savanna-gold transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
            style={{
              background: 'rgba(18,25,38,0.98)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
            }}
          >
            <div className="h-full flex flex-col">
              {/* Close button */}
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-savanna-gold/10">
                <span className="text-white font-display font-bold text-xl">SAVANNA</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-savanna-gold transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
                {links.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        className={`text-2xl font-display font-normal transition-colors duration-200 ${
                          isActive ? 'text-savanna-gold' : 'text-white/70 hover:text-savanna-gold'
                        }`}
                      >
                        {language === 'en' ? link.labelEn : link.labelAm}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-8 w-full space-y-3"
                >
                  <Link
                    to="/trips"
                    className="btn-primary w-full text-center py-4"
                    onClick={() => setMobileOpen(false)}
                  >
                    {language === 'en' ? 'Book a Trip' : 'ጉዞ ያስይዙ'}
                  </Link>

                  <button
                    onClick={toggleLanguage}
                    className="w-full flex items-center justify-center gap-2 text-white/40 hover:text-savanna-gold transition-colors text-xs font-medium uppercase tracking-widest py-3"
                  >
                    <Globe size={14} />
                    <span>{language === 'en' ? 'አማርኛ' : 'ENGLISH'}</span>
                  </button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
