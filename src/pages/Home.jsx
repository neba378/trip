import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mountain, Star, ChevronDown, Phone, Send, Search, Calendar, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import TripCard from '../components/TripCard';

const stats = [
  { value: '500+', labelEn: 'Happy Travelers', labelAm: 'ደስተኛ ተጓዦች' },
  { value: '20+', labelEn: 'Destinations', labelAm: 'መዳረሻዎች' },
  { value: '3+', labelEn: 'Years Experience', labelAm: 'ዓመት ልምድ' },
  { value: '4.9★', labelEn: 'Rating', labelAm: 'ደረጃ' },
];

const highlights = [
  {
    icon: '⛺️',
    titleEn: 'Camping Adventures',
    titleAm: 'የካምፒንግ ጉዞዎች',
    descEn: 'Sleep under Ethiopia\'s stars at crater lakes, mountain peaks, and hidden valleys.',
    descAm: 'በኢትዮጵያ ኮከቦች ስር ያድሩ።',
  },
  {
    icon: '🥾',
    titleEn: 'Guided Trekking',
    titleAm: 'ትሬኪንግ',
    descEn: 'Expert guides lead you through the Simien Mountains, Bale, and beyond.',
    descAm: 'ባለሙያ አስጎብኚዎች ወደ ስሜን ተራሮች ይወስዱዎታል።',
  },
  {
    icon: '🏛️',
    titleEn: 'Cultural Tours',
    titleAm: 'ባህላዊ ጉዞዎች',
    descEn: 'Discover Lalibela, Axum, Harar — the living history of ancient Ethiopia.',
    descAm: 'ላሊበላ፣ አክሱም፣ ሐረርን ያግኙ።',
  },
  {
    icon: '📸',
    titleEn: 'Photography Included',
    titleAm: 'ፎቶ ይካተታል',
    descEn: 'Every trip includes professional photography so you keep the memories.',
    descAm: 'ሁሉም ጉዞ ፕሮፌሽናል ፎቶ ያካትታል።',
  },
];

const testimonials = [
  {
    name: 'Meron T.',
    text: 'The Wenchi trip was absolutely magical. SAVANNA took care of everything — food, camping, photos. Best weekend of my life!',
    rating: 5,
    trip: 'Wenchi Crater Lake',
  },
  {
    name: 'Dawit A.',
    text: 'Professional team, stunning destinations, and the photography they provided was incredible. Already booked my next trip!',
    rating: 5,
    trip: 'Simien Mountains',
  },
  {
    name: 'Sarah K.',
    text: 'As a foreigner, I was nervous about traveling in Ethiopia. SAVANNA made it seamless and unforgettable. Highly recommend!',
    rating: 5,
    trip: 'Lalibela Tour',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { language, trips } = useBooking();
  const featured = trips.filter(t => t.featured);
  const upcoming = trips.filter(t => t.status === 'upcoming');
  const [searchDest, setSearchDest] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTravelers, setSearchTravelers] = useState(1);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="/trips/wenchi/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-savanna-darker" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Tagline */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-savanna-gold/10 border border-savanna-gold/30 rounded-full px-4 py-2 mb-8 backdrop-blur-md"
              >
                <Mountain size={14} className="text-savanna-gold" />
                <span className="text-savanna-gold text-xs font-bold tracking-[0.3em] uppercase">
                  {language === 'en' ? 'Peaks to Valley' : 'ከፍታ ወደ ሸለቆ'}
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hero-headline mb-4"
              >
                SAVANNA
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-lg sm:text-2xl md:text-4xl font-display text-savanna-gold text-shadow-lg mb-8 tracking-[0.3em] sm:tracking-[0.4em] font-light"
              >
                ETHIOPIA TRAVEL
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-savanna-cream/80 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
              >
                {language === 'en'
                  ? 'Unforgettable adventures crafted for the bold. From the Simien peaks to the crater lakes of Wenchi.'
                  : 'የማይረሱ የጀብዱ ጉዞዎች። ከስሜን ተራሮች እስከ ወንጪ ሀይቅ ድረስ።'}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-5 justify-center items-center"
              >
                <Link to="/trips" className="btn-primary text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 group shadow-2xl shadow-savanna-gold/20">
                  {language === 'en' ? 'Start Adventure' : 'ጉዞ ይጀምሩ'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="btn-outline text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 backdrop-blur-sm">
                  {language === 'en' ? 'Our Story' : 'ስለ እኛ'}
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Frosted Glass Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="max-w-3xl mx-auto mt-10"
            role="search"
            aria-label="Search trips"
          >
              <div className="glass p-2 sm:p-3 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-savanna-gold transition-colors" />
                  <input
                    type="text"
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    placeholder={language === 'en' ? 'Destination' : 'መዳረሻ'}
                    className="w-full h-12 bg-transparent border border-savanna-gold/10 rounded-lg pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-savanna-gold transition-colors"
                  />
                </div>
                <div className="flex-1 relative">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-savanna-gold transition-colors" />
                  <input
                    type="text"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    placeholder={language === 'en' ? 'Date' : 'ቀን'}
                    className="w-full h-12 bg-transparent border border-savanna-gold/10 rounded-lg pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-savanna-gold transition-colors"
                  />
                </div>
                <div className="w-full sm:w-28 relative">
                  <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-savanna-gold transition-colors" />
                  <select
                    value={searchTravelers}
                    onChange={(e) => setSearchTravelers(Number(e.target.value))}
                    className="w-full h-12 bg-transparent border border-savanna-gold/10 rounded-lg pl-11 pr-4 text-sm text-white appearance-none focus:outline-none focus:border-savanna-gold transition-colors"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n} className="bg-savanna-darker text-white/80">{n} {language === 'en' ? 'person' : 'ሰው'}{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              <Link
                to="/trips"
                className="btn-coral h-12 px-8 whitespace-nowrap"
              >
                {language === 'en' ? 'Search' : 'ፈልግ'}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-body font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative z-10 -mt-10 mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-savanna-dark/80 backdrop-blur-xl border border-savanna-gold/10 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10"
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center relative group">
                <div className="text-savanna-gold font-display font-black text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform duration-500">{s.value}</div>
                <div className="text-savanna-cream/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {language === 'en' ? s.labelEn : s.labelAm}
                </div>
                {i < stats.length - 1 && <div className="hidden md:block absolute right-[-20px] top-1/2 -translate-y-1/2 w-[1px] h-10 bg-savanna-gold/10" />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── UPCOMING TRIPS ── */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-savanna-gold text-xs font-bold tracking-[0.4em] uppercase mb-3">
              {language === 'en' ? 'Exploration' : 'አሰሳ'}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              {language === 'en' ? 'Upcoming Expeditions' : 'ቀጣይ ጉዞዎች'}
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link to="/trips" className="btn-outline px-6 py-3 text-sm group">
              {language === 'en' ? 'View Catalog' : 'ሁሉንም ይመልከቱ'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {upcoming.map(trip => (
            <motion.div key={trip.id} variants={fadeInUp}>
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── WHY SAVANNA (GRID) ── */}
      <section className="py-16 sm:py-32 bg-savanna-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-savanna-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-savanna-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-savanna-gold text-xs font-bold tracking-[0.4em] uppercase mb-4"
            >
              {language === 'en' ? 'The Difference' : 'ልዩነቱ'}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white px-4"
            >
              {language === 'en' ? 'Why Travel With Us?' : 'ለምን ከእኛ ጋር ይጓዛሉ?'}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1E2A3A]/60 backdrop-blur-sm rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 hover:border-savanna-gold/40 transition-all duration-500 group shadow-card"
              >
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 inline-block">{h.icon}</div>
                <h3 className="text-white font-display font-bold text-xl mb-4">
                  {language === 'en' ? h.titleEn : h.titleAm}
                </h3>
                <p className="text-savanna-cream/60 text-sm leading-relaxed font-light">
                  {language === 'en' ? h.descEn : h.descAm}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT (WENCHI) ── */}
      <section className="py-16 sm:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <p className="text-savanna-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">
                  {language === 'en' ? 'Signature Trip' : 'ልዩ ጉዞ'}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                  {language === 'en' ? 'Wenchi Crater Lake' : 'ወንጪ ክሬተር ሀይቅ'}
                </h2>
              </div>
              
              <p className="text-savanna-cream/70 text-lg leading-relaxed font-light">
                {language === 'en'
                  ? 'A volcanic masterpiece featuring a turquoise lake, natural hot springs, and an ancient monastery. We offer the most professional camping experience at Wenchi, just 2 hours from the capital.'
                  : 'ንጹህ ሀይቅ የሞላ የእሳተ ገሞራ ክሬተር፣ ፍሉ ውሀ፣ ደን እና የደሴት ገዳም። ከአዲስ አበባ 2 ሰዓት ርቀት ላይ የሚገኝ አስደናቂ ቦታ።'}
              </p>

              <div className="grid grid-cols-2 gap-6">
                {['⛺️ Premium Camping', '🌊 Hot Spring Bath', '⛵️ Boat Expeditions', '📸 Professional Photos'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-savanna-cream/80 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-savanna-gold" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link to="/trips/wenchi-crater-lake-camping" className="btn-primary px-10 py-5 text-lg shadow-xl shadow-savanna-gold/10">
                  {language === 'en' ? 'Secure Your Spot' : 'ቦታዎን ያስይዙ'}
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 sm:grid-cols-12 gap-2 sm:gap-4">
                <div className="col-span-2 sm:col-span-8">
                  <img src="/trips/wenchi/cover.jpg" alt="Wenchi" loading="lazy" className="rounded-xl sm:rounded-[2rem] h-48 sm:h-[400px] w-full object-cover shadow-2xl" />
                </div>
                <div className="col-span-2 sm:col-span-4 space-y-2 sm:space-y-4">
                  <img src="/trips/wenchi/wenchi-trip-image-2.jpg" alt="Camping" loading="lazy" className="rounded-xl sm:rounded-[1.5rem] h-24 sm:h-[190px] w-full object-cover shadow-xl" />
                  <img src="/trips/wenchi/info.jpg" alt="Nature" loading="lazy" className="rounded-xl sm:rounded-[1.5rem] h-24 sm:h-[190px] w-full object-cover shadow-xl" />
                </div>
              </div>
              {/* Floating Decoration */}
              <div className="absolute -bottom-6 -left-6 bg-savanna-gold p-6 rounded-2xl shadow-2xl hidden md:block">
                <div className="text-savanna-darker font-display font-black text-2xl">9.8</div>
                <div className="text-savanna-darker/60 text-[10px] font-bold uppercase tracking-widest">Rating</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-24 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=80"
            alt="Mountains"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold text-white text-white-static mb-6 sm:mb-8 leading-none">
              {language === 'en' ? 'Life Is An' : 'ህይወት'}<br />
              <span className="text-savanna-gold">{language === 'en' ? 'Adventure' : 'ጀብዱ ናት'}</span>
            </h2>
            <p className="text-savanna-cream/70 text-base sm:text-xl md:text-2xl mb-10 sm:mb-12 font-light leading-relaxed">
              {language === 'en'
                ? 'Don\'t just exist, explore. Join our next expedition and create memories that last a lifetime.'
                : 'አይኑሩ ብቻ፣ ይጓዙ። የሚቀጥለውን ጉዞ ይቀላቀሉ እና የማይረሱ ትዝታዎችን ይፍጠሩ።'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/trips" className="btn-primary text-base sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl shadow-savanna-gold/20">
                {language === 'en' ? 'Join Next Trip' : 'ቀጣይ ጉዞ ይቀላቀሉ'}
              </Link>
              <a href="tel:+251944780840" className="btn-outline text-base sm:text-xl px-8 sm:px-12 py-4 sm:py-6 backdrop-blur-md group">
                <Phone size={20} className="sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                {language === 'en' ? 'Contact Us' : 'ያግኙን'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL & TELEGRAM ── */}
      <section className="py-20 bg-savanna-darker border-t border-savanna-green-mid/20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-savanna-cream/40 text-[10px] uppercase tracking-[0.4em] font-bold mb-8">
              {language === 'en' ? 'Join Our Community' : 'ማህበረሰባችንን ይቀላቀሉ'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="https://t.me/savannaethiopiatravel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0088cc]/80 text-white px-8 py-4 rounded-2xl transition-all font-bold shadow-xl shadow-[#0088cc]/20"
              >
                <Send size={20} />
                Telegram Channel
              </a>
              <a
                href="https://instagram.com/savannaethiopiatravel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-savanna-gold/10 hover:bg-savanna-gold hover:text-savanna-darker border border-savanna-gold/20 text-white px-8 py-4 rounded-2xl transition-all font-bold"
              >
                <span className="text-xl">📸</span>
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
