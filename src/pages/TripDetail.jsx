import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Clock, Users, ChevronLeft,
  Check, X, Phone, Send, ArrowRight, Star,
  Share2, Camera, Shield, Coffee, Car, Home as HomeIcon
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import BookingModal from '../components/BookingModal';
import Lightbox from '../components/Lightbox';
import toast from 'react-hot-toast';

export default function TripDetail() {
  const { slug } = useParams();
  const { language, trips, bookedTrips } = useBooking();
  const navigate = useNavigate();
  const trip = trips.find(t => t.slug === slug);
  const isAlreadyBooked = trip ? bookedTrips.has(String(trip.id)) : false;
  const [activeImg, setActiveImg] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-savanna-darker p-4">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl sm:text-8xl mb-6">🗺️</motion.div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">{language === 'en' ? 'Trip not found' : 'ጉዞ አልተገኘም'}</h2>
          <Link to="/trips" className="btn-primary">{language === 'en' ? 'Explore Other Trips' : 'ሌሎች ጉዞዎችን ያስሱ'}</Link>
        </div>
      </div>
    );
  }

  const images = Array.isArray(trip.images) ? trip.images : JSON.parse(trip.images || '[]');
  const includes = language === 'en' ? (Array.isArray(trip.includesEn) ? trip.includesEn : JSON.parse(trip.includesEn || '[]')) : (Array.isArray(trip.includesAm) ? trip.includesAm : JSON.parse(trip.includesAm || '[]'));
  const excludes = language === 'en' ? (Array.isArray(trip.excludesEn) ? trip.excludesEn : JSON.parse(trip.excludesEn || '[]')) : (Array.isArray(trip.excludesAm) ? trip.excludesAm : JSON.parse(trip.excludesAm || '[]'));

  const spotsPercent = Math.round(((trip.spotsTotal - trip.spotsLeft) / trip.spotsTotal) * 100);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-savanna-darker pb-24 lg:pb-0">
      {/* ── HERO GALLERY ── */}
      <div className="relative h-[60vh] lg:h-[80vh] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={images[activeImg] || '/placeholder.jpg'}
            alt={trip.title}
            onClick={() => setShowLightbox(true)}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
            className="w-full h-full object-cover cursor-zoom-in"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-savanna-darker" />

        {/* Floating Actions */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/30 backdrop-blur-xl rounded-xl sm:rounded-2xl text-white text-white-static hover:bg-savanna-gold hover:text-savanna-darker transition-all">
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button onClick={handleShare} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/30 backdrop-blur-xl rounded-xl sm:rounded-2xl text-white text-white-static hover:bg-savanna-gold hover:text-savanna-darker transition-all">
            <Share2 size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Image Nav */}
        <div className="absolute bottom-10 left-6 right-6 flex justify-between items-end z-10">
          <div className="max-w-2xl">
            <div className="flex gap-2 mb-4">
              <span className="bg-savanna-gold text-savanna-darker text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{trip.status}</span>
              <span className="bg-black/30 backdrop-blur-md text-white text-white-static text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{trip.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-display font-black text-white text-white-static leading-none tracking-tighter">
              {language === 'en' ? trip.title : trip.titleAm}
            </h1>
          </div>

          <div className="hidden md:flex gap-3 bg-black/20 backdrop-blur-md p-2 rounded-2xl">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? 'border-savanna-gold scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}>
                <img src={img} loading="lazy" className="w-full h-full object-cover" alt={`${trip.title} image ${i + 1}`} />
              </button>
            ))}
          </div>
          {/* Mobile image dots */}
          <div className="flex md:hidden gap-2 absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? 'bg-savanna-gold w-4' : 'bg-white/40'}`} aria-label={`View image ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16">
          <div className="lg:col-span-8 space-y-12 sm:space-y-20">
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { icon: <Calendar className="text-savanna-gold" />, label: 'Date', value: language === 'en' ? trip.dateEn : trip.dateAm },
                { icon: <MapPin className="text-savanna-gold" />, label: 'Location', value: language === 'en' ? trip.location : trip.locationAm },
                { icon: <Clock className="text-savanna-gold" />, label: 'Duration', value: 'Expedition' },
                { icon: <Shield className="text-savanna-gold" />, label: 'Security', value: 'Verified' },
              ].map((s, i) => (
                <div key={i} className="bg-[#1E2A3A]/60 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-card">
                  <div className="mb-4">{s.icon}</div>
                  <div className="text-savanna-cream/40 text-[10px] uppercase tracking-widest font-bold mb-1">{s.label}</div>
                  <div className="text-white font-bold text-sm">{s.value}</div>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-savanna-gold font-display font-bold text-xl sm:text-2xl uppercase tracking-widest mb-6 sm:mb-8">The Story</h2>
              <p className="text-savanna-cream/70 text-base sm:text-lg md:text-xl leading-relaxed font-light italic">
                {language === 'en' ? trip.descriptionEn : trip.descriptionAm}
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1E2A3A]/80 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-card">
                <h3 className="text-white font-display font-bold text-lg sm:text-xl mb-6 sm:mb-8 flex items-center gap-3">What's Included</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 sm:gap-4 text-savanna-cream/70 text-xs sm:text-sm">
                      <Check size={16} className="text-savanna-gold shrink-0" /> {item?.icon} {item?.text ?? item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1E2A3A]/50 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10">
                <h3 className="text-white font-display font-bold text-lg sm:text-xl mb-6 sm:mb-8 flex items-center gap-3">Exclusions</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {excludes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 sm:gap-4 text-savanna-cream/40 text-xs sm:text-sm italic">
                      <X size={16} className="text-red-400 shrink-0" /> {item?.icon} {item?.text ?? item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sticky Card */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 bg-[#1E2A3A] rounded-2xl sm:rounded-[3rem] border border-savanna-gold/20 p-6 sm:p-10 shadow-2xl">
              <div className="mb-8 sm:mb-10">
                <div className="text-savanna-cream/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Price per person</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-5xl font-display font-black text-savanna-gold">{trip.priceETB.toLocaleString()}</span>
                  <span className="text-savanna-cream/40 font-bold uppercase tracking-widest text-sm">ETB</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setShowBooking(true)} 
                  disabled={trip.status === 'soldout' || isAlreadyBooked} 
                  className="w-full btn-primary py-5 text-lg justify-center disabled:opacity-50"
                >
                  {trip.status === 'soldout' 
                    ? 'Sold Out' 
                    : isAlreadyBooked 
                    ? (language === 'en' ? 'Already Booked ✓' : 'ተይዟል ✓')
                    : (language === 'en' ? 'Book Now' : 'አሁን ይያዙ')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showBooking && <BookingModal trip={trip} onClose={() => setShowBooking(false)} />}
      {showLightbox && (
        <Lightbox 
          images={images} 
          currentIndex={activeImg} 
          onClose={() => setShowLightbox(false)} 
          onNavigate={(index) => setActiveImg(index)}
        />
      )}
    </div>
  );
}
