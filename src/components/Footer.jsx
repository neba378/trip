import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Send } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Instagram, Facebook, Youtube, TikTok } from './BrandIcons';
import { useState } from 'react';
import toast from 'react-hot-toast';

const destinations = [
  { path: '/trips/wenchi-crater-lake-camping', labelEn: 'Wenchi Crater Lake', labelAm: 'ወንጪ ክሬተር ሀይቅ' },
  { path: '/trips/simien-mountains-trek', labelEn: 'Simien Mountains', labelAm: 'ስሜን ተራሮች' },
  { path: '/trips/bale-mountains-national-park', labelEn: 'Bale Mountains', labelAm: 'ባሌ ተራሮች' },
  { path: '/trips/lalibela-rock-churches-tour', labelEn: 'Lalibela', labelAm: 'ላሊበላ' },
];

const company = [
  { path: '/about', labelEn: 'Our Story', labelAm: 'ታሪካችን' },
  { path: '/gallery', labelEn: 'Gallery', labelAm: 'ማዕከለ-ስዕላት' },
  { path: '/contact', labelEn: 'Contact', labelAm: 'ያግኙን' },
  { path: '/my-bookings', labelEn: 'My Bookings', labelAm: 'ቦታ ማስያዣዎቼ' },
];

export default function Footer() {
  const { language } = useBooking();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    // Simulate subscription - no backend endpoint exists
    setTimeout(() => {
      toast.success(language === 'en' ? 'Subscribed!' : 'ተመዝግበዋል!');
      setEmail('');
      setSubmitting(false);
    }, 800);
  };

  return (
    <footer style={{ background: '#1A2332' }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-white font-display font-bold text-2xl leading-none tracking-tighter hover:text-ocean transition-colors">
              SAVANNA
            </Link>
            <p className="mt-4 text-white/50 font-body text-sm leading-relaxed max-w-xs">
              {language === 'en'
                ? 'Expert-guided camping, trekking, and cultural expeditions across Ethiopia\'s most breathtaking destinations.'
                : 'በኢትዮጵያ አስደናቂ መዳረሻዎች ላይ በባለሙያ የሚመሩ የካምፕ፣ የእግር ጉዞ እና የባህል ጉዞዎች።'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-8">
              {[
                { icon: Instagram, href: 'https://instagram.com/savannaethiopiatravel', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: TikTok, href: '#', label: 'TikTok' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-savanna-gold/10 hover:bg-ocean transition-all duration-200 text-white/60 hover:text-white"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-body font-medium text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              {language === 'en' ? 'Destinations' : 'መዳረሻዎች'}
            </h4>
            <ul className="space-y-4">
              {destinations.map((d) => (
                <li key={d.path}>
                  <Link
                    to={d.path}
                    className="text-white/60 hover:text-ocean transition-colors duration-200 text-sm font-body"
                  >
                    {language === 'en' ? d.labelEn : d.labelAm}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body font-medium text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              {language === 'en' ? 'Company' : 'ኩባንያ'}
            </h4>
            <ul className="space-y-4">
              {company.map((c) => (
                <li key={c.path}>
                  <Link
                    to={c.path}
                    className="text-white/60 hover:text-ocean transition-colors duration-200 text-sm font-body"
                  >
                    {language === 'en' ? c.labelEn : c.labelAm}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body font-medium text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
              {language === 'en' ? 'Newsletter' : 'ዜና መፅሄት'}
            </h4>
            <p className="text-white/50 text-sm font-body mb-4 leading-relaxed">
              {language === 'en'
                ? 'Get the latest on new trips and special offers.'
                : 'ስለ አዳዲስ ጉዞዎች እና ልዩ ቅናሾች ያውቁ።'}
            </p>
            <form onSubmit={handleNewsletter} className="flex h-12">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'en' ? 'your@email.com' : 'ኢሜይልዎ'}
                required
                className="flex-1 bg-transparent border-b border-savanna-gold/20 px-0 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-ocean transition-colors"
                aria-label={language === 'en' ? 'Email for newsletter' : 'የኢሜይል አድራሻ'}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-12 h-12 flex items-center justify-center bg-coral hover:brightness-110 transition-all duration-200 disabled:opacity-50 shrink-0"
                aria-label={language === 'en' ? 'Subscribe' : 'ይመዝገቡ'}
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-savanna-gold border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a href="tel:+251944780840" className="flex items-center gap-3 text-white/50 hover:text-ocean transition-colors text-sm">
                <Phone size={14} />
                +251 944 780 840
              </a>
              <a href="mailto:hello@savannaethiopia.com" className="flex items-center gap-3 text-white/50 hover:text-ocean transition-colors text-sm">
                <Mail size={14} />
                hello@savannaethiopia.com
              </a>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin size={14} />
                Addis Ababa, Ethiopia
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-savanna-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-body text-xs">
            &copy; {new Date().getFullYear()} SAVANNA Ethiopia Travel. {language === 'en' ? 'All rights reserved.' : 'መብቱ በህግ የተጠበቀ ነው።'}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 transition-colors text-xs font-body">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/60 transition-colors text-xs font-body">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
