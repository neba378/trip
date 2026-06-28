import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { motion } from 'framer-motion';

const statusColors = {
  upcoming: 'bg-savanna-gold/20 text-savanna-gold border-savanna-gold/30',
  soldout: 'bg-red-900/30 text-red-400 border-red-500/30',
  ongoing: 'bg-green-900/30 text-green-400 border-green-500/30',
  completed: 'bg-gray-800 text-gray-400 border-gray-600/30',
};

const categoryIcons = {
  camping: '⛺️',
  hiking: '🥾',
  trekking: '🥾',
  cultural: '🏛️',
  historical: '📜',
};

export default function TripCard({ trip }) {
  const { language } = useBooking();
  const spotsPercent = Math.round(((trip.spotsTotal - trip.spotsLeft) / trip.spotsTotal) * 100);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link to={`/trips/${trip.slug}`} className="card group block h-full flex flex-col relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-savanna-gold/0 via-savanna-gold/0 to-savanna-gold/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Image Section */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={trip.images?.[0] || '/placeholder.jpg'}
            alt={trip.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-savanna-dark via-savanna-dark/20 to-transparent opacity-80" />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`tag-chip ${statusColors[trip.status] || statusColors.upcoming}`}>
              {trip.status === 'upcoming' ? (language === 'en' ? 'Upcoming' : 'ቀጣይ') :
               trip.status === 'soldout' ? (language === 'en' ? 'Sold Out' : 'ተሞልቷል') :
               trip.status === 'ongoing' ? (language === 'en' ? 'Ongoing' : 'በሂደት') : 
               (language === 'en' ? 'Completed' : 'ተጠናቋል')}
            </span>
            {trip.featured && (
              <span className="tag-chip bg-savanna-gold text-savanna-darker flex items-center gap-1.5">
                <Sparkles size={10} /> {language === 'en' ? 'Featured' : 'ተመረጠ'}
              </span>
            )}
          </div>

          {/* Category Icon */}
          <div className="absolute top-4 right-4 w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-xl shadow-2xl group-hover:bg-savanna-gold group-hover:text-midnight transition-all duration-500 group-hover:rotate-12">
            {categoryIcons[trip.category] || '🌍'}
          </div>

          {/* Price Floating Tag */}
          <div className="absolute bottom-4 left-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-black/60 backdrop-blur-xl rounded-xl px-4 py-2"
            >
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest block mb-0.5">Starting From</span>
              <div className="text-savanna-gold font-display font-bold text-2xl leading-none">
                {trip.priceETB?.toLocaleString()}
                <span className="text-[10px] font-bold text-white/40 ml-1 uppercase">ETB</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-1 rounded-full bg-savanna-gold" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Expedition Journey</span>
            </div>
            <h3 className="text-white font-display font-bold text-xl group-hover:text-savanna-gold transition-colors duration-300 leading-tight">
              {language === 'en' ? trip.title : trip.titleAm}
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-white/50 group-hover:text-white/70 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-savanna-gold/10 flex items-center justify-center text-savanna-gold shrink-0">
                  <MapPin size={14} />
                </div>
                <span className="text-xs font-medium truncate">{language === 'en' ? trip.location : trip.locationAm}</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 group-hover:text-white/70 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-savanna-gold/10 flex items-center justify-center text-savanna-gold shrink-0">
                  <Calendar size={14} />
                </div>
                <span className="text-xs font-medium truncate">{language === 'en' ? trip.dateEn : trip.dateAm}</span>
              </div>
            </div>

            {/* Availability Progress */}
            <div className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-savanna-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    {trip.spotsLeft} {language === 'en' ? 'Spots Left' : 'ቦታ ቀርቷል'}
                  </span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${spotsPercent > 80 ? 'text-red-400' : 'text-savanna-gold'}`}>
                  {spotsPercent}% Booked
                </span>
              </div>
              <div className="h-1.5 bg-savanna-gold/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${spotsPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full transition-colors duration-500 ${spotsPercent > 80 ? 'bg-red-500' : 'bg-savanna-gold'}`}
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-auto pt-5 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Explore</span>
              <p className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] group-hover:text-savanna-gold transition-colors mt-0.5">View Details</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-savanna-gold/10 flex items-center justify-center text-savanna-gold group-hover:bg-savanna-gold group-hover:text-midnight transition-all">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
