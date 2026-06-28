import { useState } from 'react';
import { Phone, Send, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Contact() {
  const { language } = useBooking();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to a backend
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
            alt="Contact"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-savanna-gold text-sm font-medium tracking-widest uppercase mb-3">
            {language === 'en' ? 'Get In Touch' : 'ያግኙን'}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white text-white-static mb-4">
            {language === 'en' ? 'Contact Us' : 'ያግኙን'}
          </h1>
          <p className="text-savanna-cream/70 text-base sm:text-lg max-w-xl mx-auto">
            {language === 'en'
              ? 'Have questions about a trip? Ready to book? We\'re here to help.'
              : 'ስለ ጉዞ ጥያቄ አለዎት? ለመያዝ ዝግጁ ነዎት? እዚህ ነን።'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="section-title mb-6">
                {language === 'en' ? 'Reach Us Directly' : 'ቀጥታ ያግኙን'}
              </h2>

              {/* Phone numbers */}
              <div className="space-y-4">
                {[
                  { number: '+251 944 780 840', label: language === 'en' ? 'Main Line' : 'ዋና መስመር' },
                  { number: '+251 904 149 468', label: language === 'en' ? 'Bookings' : 'ቦታ ማስያዝ' },
                  { number: '+251 909 930 093', label: language === 'en' ? 'Support' : 'ድጋፍ' },
                ].map((p, i) => (
                  <a
                    key={i}
                    href={`tel:${p.number.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 bg-[#1E2A3A] rounded-xl p-4 hover:border-savanna-gold/40 transition-all group shadow-card"
                  >
                    <div className="w-10 h-10 rounded-full bg-savanna-gold/10 flex items-center justify-center group-hover:bg-savanna-gold/20 transition-colors">
                      <Phone size={18} className="text-savanna-gold" />
                    </div>
                    <div>
                      <div className="text-savanna-cream font-medium">{p.number}</div>
                      <div className="text-savanna-cream/40 text-xs">{p.label}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-savanna-gold font-semibold mb-4">
                {language === 'en' ? 'Follow & Message Us' : 'ይከተሉን እና ይጻፉልን'}
              </h3>
              <div className="space-y-3">
                <a
                  href="https://t.me/savannaethiopiatravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#0088cc]/10 border border-[#0088cc]/30 rounded-xl p-4 hover:bg-[#0088cc]/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
                    <Send size={18} className="text-[#0088cc]" />
                  </div>
                  <div>
                    <div className="text-[#0088cc] font-medium">Telegram</div>
                    <div className="text-savanna-cream/40 text-xs">@savannaethiopiatravel</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/savannaethiopiatravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#E1306C]/10 border border-[#E1306C]/30 rounded-xl p-4 hover:bg-[#E1306C]/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E1306C]/20 flex items-center justify-center">
                    <span className="text-[#E1306C] text-lg">📷</span>
                  </div>
                  <div>
                    <div className="text-[#E1306C] font-medium">Instagram</div>
                    <div className="text-savanna-cream/40 text-xs">@savannaethiopiatravel</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-[#1E2A3A] rounded-xl p-5">
              <div className="flex items-center gap-2 text-savanna-gold font-semibold mb-3">
                <Clock size={18} />
                {language === 'en' ? 'Response Hours' : 'የምላሽ ሰዓቶች'}
              </div>
              <div className="space-y-1 text-sm text-savanna-cream/60">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Mon – Fri' : 'ሰኞ – ዓርብ'}</span>
                  <span>8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Saturday' : 'ቅዳሜ'}</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Sunday' : 'እሁድ'}</span>
                  <span>10:00 AM – 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 text-savanna-cream/60 text-sm">
              <MapPin size={18} className="text-savanna-gold shrink-0 mt-0.5" />
              <div>
                <div className="text-savanna-cream font-medium mb-0.5">
                  {language === 'en' ? 'Based in' : 'ቦታ'}
                </div>
                Addis Ababa, Ethiopia<br />
                {language === 'en' ? 'Departure from Mexico Square' : 'ከሜክሲኮ ይነሳሉ'}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-[#1E2A3A] rounded-2xl p-4 sm:p-6 shadow-card">
              <h2 className="text-savanna-gold font-display font-bold text-2xl mb-6">
                <MessageCircle size={22} className="inline mr-2" />
                {language === 'en' ? 'Send a Message' : 'መልዕክት ይላኩ'}
              </h2>

              {sent ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-savanna-cream font-bold text-xl mb-2">
                    {language === 'en' ? 'Message Sent!' : 'መልዕክት ተልኳል!'}
                  </h3>
                  <p className="text-savanna-cream/60 text-sm">
                    {language === 'en'
                      ? 'We\'ll get back to you within 24 hours.'
                      : 'በ24 ሰዓት ውስጥ እንመልሳለን።'}
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', phone: '', message: '' }); }}
                    className="btn-outline mt-6"
                  >
                    {language === 'en' ? 'Send Another' : 'ሌላ ይላኩ'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-savanna-cream/70 text-sm font-medium block mb-1.5">
                      {language === 'en' ? 'Your Name' : 'ስምዎ'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={language === 'en' ? 'Full name' : 'ሙሉ ስም'}
                      className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-sm text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-savanna-cream/70 text-sm font-medium block mb-1.5">
                      {language === 'en' ? 'Phone / Telegram' : 'ስልክ / ቴሌግራም'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+251 9XX XXX XXX"
                      className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-sm text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-savanna-cream/70 text-sm font-medium block mb-1.5">
                      {language === 'en' ? 'Message' : 'መልዕክት'} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder={language === 'en'
                        ? 'Ask about a trip, request a custom tour, or just say hi!'
                        : 'ስለ ጉዞ ይጠይቁ ወይም ሰላም ይበሉ!'}
                      className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-sm text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-4">
                    {language === 'en' ? 'Send Message' : 'መልዕክት ላክ'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
