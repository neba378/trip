import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, X, Compass, ArrowRight, Filter, LayoutGrid } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import TripCard from '../components/TripCard';
import { TripCardSkeleton } from '../components/Skeleton';

export default function Trips() {
  const { language, trips, tripsLoading } = useBooking();
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');

  const filtered = useMemo(() => trips.filter(trip => {
    const name = language === 'en' ? (trip.title || '') : (trip.titleAm || '');
    const location = language === 'en' ? (trip.location || '') : (trip.locationAm || '');
    const tags = Array.isArray(trip.tags) ? trip.tags : JSON.parse(trip.tags || '[]');
    
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      location.toLowerCase().includes(search.toLowerCase()) ||
      tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    const matchType = activeType === 'all' || trip.category === activeType;
    const matchStatus = activeStatus === 'all' || trip.status === activeStatus;
    
    return matchSearch && matchType && matchStatus;
  }), [trips, language, search, activeType, activeStatus]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-savanna-darker">
      {/* ── HEADER ── */}
      <div className="relative py-28 md:py-40 overflow-hidden">
        {/* Animated Background with Parallax effect */}
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80"
            alt="Expeditions"
            loading="lazy"
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-savanna-gold/50" />
              <span className="text-savanna-gold text-xs font-bold tracking-[0.5em] uppercase">
                {language === 'en' ? 'Exploration' : 'አሰሳ'}
              </span>
              <div className="w-12 h-[1px] bg-savanna-gold/50" />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white text-white-static mb-6 sm:mb-8 tracking-tighter">
              {language === 'en' ? 'Our Expeditions' : 'የእኛ ጉዞዎች'}
            </h1>
            <p className="text-savanna-cream/60 text-base sm:text-lg md:text-2xl font-light leading-relaxed max-w-3xl mx-auto px-4">
              {language === 'en'
                ? 'Discover carefully curated journeys to the most breathtaking locations in the heart of Ethiopia.'
                : 'በኢትዮጵያ ውስጥ ወደሚገኙ አስደናቂ ቦታዎች በጥንቃቄ የተዘጋጁ ጉዞዎች።'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="sticky top-16 z-30 bg-savanna-darker/80 backdrop-blur-2xl border-b border-savanna-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col xl:flex-row gap-8 items-center">
            {/* Search */}
            <div className="relative w-full xl:max-w-md group">
              <div className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-savanna-gold transition-colors" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search destinations, tags...' : 'ጉዞዎችን ይፈልጉ...'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-transparent border border-savanna-gold/10 rounded-2xl pl-14 pr-12 py-4 text-sm text-white focus:outline-none focus:border-savanna-gold transition-all placeholder:text-white/20"
                />
                {search && (
                  <button 
                    onClick={() => setSearch('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-white/30 hover:text-savanna-gold transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 w-full items-center">
              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto w-full no-scrollbar p-1">
                {['all', 'camping', 'hiking', 'cultural', 'safari'].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`shrink-0 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                      activeType === type
                        ? 'bg-savanna-gold text-savanna-darker shadow-lg shadow-savanna-gold/20'
                        : 'text-white/40 hover:text-savanna-gold'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Status & Toggle */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-3 px-4 py-2">
                  <Filter size={14} className="text-savanna-gold" />
                  <select
                    value={activeStatus}
                    onChange={e => setActiveStatus(e.target.value)}
                    className="bg-transparent text-[10px] font-bold text-white/40 focus:outline-none uppercase tracking-[0.2em] cursor-pointer appearance-none pr-4"
                  >
                    <option value="all">{language === 'en' ? 'All Status' : 'ሁሉም'}</option>
                    <option value="upcoming">{language === 'en' ? 'Upcoming' : 'ቀጣይ'}</option>
                    <option value="active">{language === 'en' ? 'Active' : 'በሂደት'}</option>
                    <option value="completed">{language === 'en' ? 'Completed' : 'ተጠናቋል'}</option>
                  </select>
                </div>
                <div className="w-px h-6 bg-savanna-gold/10" />
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-savanna-gold/10 text-savanna-gold hover:bg-savanna-gold hover:text-savanna-darker transition-all">
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-savanna-gold/10 flex items-center justify-center text-savanna-gold">
              <Compass size={20} className="animate-spin-slow" />
            </div>
            <div>
              <p className="text-white font-bold text-2xl tracking-tight">
                {filtered.length} {language === 'en' ? 'Expeditions' : 'ጉዞዎች'}
              </p>
              <p className="text-savanna-cream/40 text-[10px] uppercase tracking-[0.2em] font-bold">Found in catalog</p>
            </div>
          </div>
        </div>

        {tripsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => <TripCardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(trip => (
                <motion.div
                  key={trip.id}
                  variants={itemVariants}
                  layout
                >
                  <TripCard trip={trip} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 sm:py-40 bg-savanna-dark/80 rounded-2xl sm:rounded-[3rem] border border-dashed border-savanna-gold/10"
          >
            <div className="w-24 h-24 bg-savanna-gold/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search size={40} className="text-savanna-gold/20" />
            </div>
            <h3 className="text-white text-3xl font-display font-bold mb-4">
              {language === 'en' ? 'No Expeditions Found' : 'ጉዞ አልተገኘም'}
            </h3>
            <p className="text-savanna-cream/40 max-w-md mx-auto mb-10 text-lg font-light leading-relaxed">
              {language === 'en' 
                ? 'We couldn\'t find any trips matching your filters. Try adjusting your search or clearing all filters.' 
                : 'ፍለጋዎን ያስተካክሉ ወይም ፍልተሮቹን ይቀይሩ።'}
            </p>
            <button 
              onClick={() => {setSearch(''); setActiveType('all'); setActiveStatus('all');}}
              className="btn-primary px-10 py-4 group"
            >
              Reset Discovery Filters
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>

      {/* ── CUSTOM TRIP CTA ── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-savanna-gold/10 border border-savanna-gold/20 rounded-2xl sm:rounded-[3rem] p-6 sm:p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-96 h-96 bg-savanna-gold/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 group-hover:bg-savanna-gold/20 transition-all duration-1000" />
          <div className="relative z-10">
            <span className="text-savanna-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-6 block">Tailored Experiences</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
              {language === 'en' ? 'Design Your Private Adventure' : 'የራስዎ የሆነ ጉዞ ይፈልጋሉ?'}
            </h2>
            <p className="text-savanna-cream/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              {language === 'en' 
                ? 'We organize bespoke private expeditions for families, groups, and organizations. Tell us your vision, and we\'ll build the itinerary.'
                : 'ለቤተሰብ፣ ለቡድን እና ለድርጅቶች የግል ጉዞዎችን እናዘጋጃለን። የት መሄድ እንደሚፈልጉ ይንገሩን።'}
            </p>
            <button className="btn-primary px-12 py-5 text-lg group">
              Inquire Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
