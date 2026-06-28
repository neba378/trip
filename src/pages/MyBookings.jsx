import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Ticket, Calendar, Users, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink, ChevronRight, Mail, MapPin, ArrowRight, Compass, Hourglass } from 'lucide-react';
import axios from 'axios';
import { useBooking } from '../context/BookingContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusConfig = {
  pending: {
    icon: Hourglass,
    label: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
  },
  confirmed: {
    icon: CheckCircle,
    label: { en: 'Confirmed', am: 'ተረጋግጧል' },
  },
  rejected: {
    icon: XCircle,
    label: { en: 'Rejected', am: 'ውድቅ ተደርጓል' },
  },
};

export default function MyBookings() {
  const { language, syncBookedTrips, savedEmail, saveEmail } = useBooking();
  const [email, setEmail] = useState(savedEmail);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = async (emailToSearch) => {
    setLoading(true);
    setSearched(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/bookings/lookup`, { params: { email: emailToSearch } });
      setBookings(res.data.data || []);
      syncBookedTrips(emailToSearch);
    } catch {
      setBookings([]);
      setError('Could not reach server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (savedEmail) fetchBookings(savedEmail);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    saveEmail(email.trim());
    fetchBookings(email.trim());
  };

  return (
    <div className="min-h-screen bg-savanna-darker">
      {/* ─── HERO ─── */}
      <div className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-savanna-gold/[0.04] via-transparent to-savanna-darker" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-savanna-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-savanna-green/5 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-savanna-gold/20 to-savanna-gold/5 border border-savanna-gold/20 flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Ticket className="w-10 h-10 text-savanna-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white text-white-static mb-4 font-display tracking-tight">
              {language === 'en' ? 'My Bookings' : 'ቦታ ማስያዣዎቼ'}
            </h1>
            <p className="text-savanna-cream/50 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              {language === 'en'
                ? 'Enter your email to view all your trip reservations'
                : 'የቦታ ማስያዣዎችዎን ለማየት ኢሜይልዎን ያስገቡ'}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSearch}
            className="max-w-xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-savanna-gold/20 to-savanna-green/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-savanna-dark/80 backdrop-blur-xl border border-savanna-gold/10 rounded-2xl overflow-hidden group-focus-within:border-savanna-gold/40 transition-all duration-300">
                <Mail className="absolute left-5 w-5 h-5 text-white/30 group-focus-within:text-savanna-gold transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'en' ? 'your@email.com' : 'ኢሜይልዎ'}
                  required
                  className="w-full bg-transparent pl-14 pr-4 py-5 text-white placeholder-white/30 focus:outline-none text-sm"
                />
                <div className="pr-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary text-xs py-3 px-6 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-savanna-darker border-t-transparent rounded-full animate-spin" />
                        {language === 'en' ? 'Searching' : 'በመፈለግ ላይ'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search size={14} />
                        {language === 'en' ? 'Search' : 'ፈልግ'}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        </div>
      </div>

      {/* ─── RESULTS ─── */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {searched && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {bookings.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-savanna-dark/80 rounded-3xl"
                >
                  <Compass className="w-16 h-16 text-savanna-cream/15 mx-auto mb-6" />
                  <p className="text-savanna-cream/40 text-xl font-medium mb-3">
                    {language === 'en'
                      ? 'No bookings found'
                      : 'ምንም የቦታ ማስያዣ አልተገኘም'}
                  </p>
                  <p className="text-savanna-cream/20 text-sm mb-8 max-w-xs mx-auto">
                    {language === 'en'
                      ? 'This email has no reservations yet. Start your adventure!'
                      : 'ይህ ኢሜይል እስካሁን ምንም የቦታ ማስያዣ የለውም። ጉዞዎን ይጀምሩ!'}
                  </p>
                  <Link
                    to="/trips"
                    className="inline-flex items-center gap-2 btn-primary text-sm py-3.5 px-8"
                  >
                    {language === 'en' ? 'Explore Trips' : 'ጉዞዎችን ያስሱ'}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-savanna-gold/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-savanna-gold/10 border border-savanna-gold/20 flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-savanna-gold" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white">{bookings.length}</div>
                        <div className="text-xs text-savanna-cream/40 font-medium uppercase tracking-wider">
                          {language === 'en' ? 'Booking(s)' : 'የቦታ ማስያዣ(ዎች)'}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex gap-4 text-xs text-savanna-cream/30">
                      {['pending', 'confirmed', 'rejected'].map(s => {
                        const st = statusConfig[s];
                        const count = bookings.filter(b => b.status === s).length;
                        if (count === 0) return null;
                        return (
                          <span key={s} className="font-medium">
                            {count} {language === 'en' ? st.label.en : st.label.am}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-5">
                    {bookings.map((booking, i) => {
                      const st = statusConfig[booking.status] || statusConfig.pending;
                      const StatusIcon = st.icon;
                      const statusColors = {
                        pending: { stripe: 'bg-savanna-gold/30', badge: 'text-savanna-gold bg-savanna-gold/10 border-savanna-gold/20' },
                        confirmed: { stripe: 'bg-savanna-green/30', badge: 'text-savanna-green bg-savanna-green/10 border-savanna-green/20' },
                        rejected: { stripe: 'bg-red-500/30', badge: 'text-savanna-cream/50 bg-savanna-dark/80' },
                      };
                      const sc = statusColors[booking.status] || statusColors.pending;
                      return (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
                        >
                          <div className="group relative bg-savanna-dark/90 rounded-3xl overflow-hidden transition-all duration-500">
                            <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${sc.stripe}`} />

                            <div className="p-6 md:p-8">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 px-3.5 py-2 bg-savanna-dark/80 rounded-xl">
                                    <Ticket className="w-3.5 h-3.5 text-savanna-gold/50" />
                                    <span className="text-xs font-mono font-bold text-savanna-gold tracking-widest">
                                      {booking.confirmationCode}
                                    </span>
                                  </div>
                                  <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border ${sc.badge}`}>
                                    <StatusIcon size={12} />
                                    {language === 'en' ? st.label.en : st.label.am}
                                  </div>
                                </div>

                                <Link
                                  to={`/trips/${booking.tripId}`}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-savanna-cream/30 hover:text-savanna-gold transition-colors group/link"
                                >
                                  {language === 'en' ? 'View Trip' : 'ጉዞውን ይመልከቱ'}
                                  <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 font-display tracking-tight">
                                {booking.tripTitle}
                              </h3>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                  { icon: Calendar, label: language === 'en' ? 'Date' : 'ቀን', value: language === 'en' ? new Date(booking.tripDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date(booking.tripDate).toLocaleDateString() },
                                  { icon: Users, label: language === 'en' ? 'Travelers' : 'ተጓዦች', value: `${booking.travelers} ${language === 'en' ? (booking.travelers > 1 ? 'people' : 'person') : 'ሰዎች'}` },
                                  { icon: DollarSign, label: language === 'en' ? 'Total Paid' : 'ጠቅላላ', value: `${Number(booking.totalPrice).toLocaleString()} ETB` },
                                  { icon: Clock, label: language === 'en' ? 'Booked On' : 'የተያዘበት', value: language === 'en' ? new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date(booking.createdAt).toLocaleDateString() },
                                ].map((item, idx) => (
                                  <div key={idx} className="bg-savanna-dark/80 rounded-2xl p-4">
                                    <item.icon className="w-4 h-4 text-savanna-gold/40 mb-2.5" />
                                    <div className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-widest mb-1">
                                      {item.label}
                                    </div>
                                    <div className="text-sm font-bold text-white">
                                      {item.value}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-5 pt-4 border-t border-savanna-gold/10 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-savanna-cream/25">
                                  <div className="w-6 h-6 rounded-lg bg-savanna-gold/10 border border-savanna-gold/20 flex items-center justify-center">
                                    <span className="text-[9px] font-black text-savanna-gold">
                                      {booking.firstName?.[0]}{booking.lastName?.[0]}
                                    </span>
                                  </div>
                                  {booking.firstName} {booking.lastName}
                                  <span className="text-savanna-cream/15 mx-1">·</span>
                                  {booking.email}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {searched && loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-savanna-dark/80 rounded-3xl p-8 animate-pulse">
                  <div className="flex gap-3 mb-6">
                    <div className="h-8 w-36 bg-savanna-dark rounded-xl" />
                    <div className="h-8 w-24 bg-savanna-dark rounded-xl" />
                  </div>
                  <div className="h-7 w-64 bg-savanna-dark rounded-lg mb-6" />
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="h-20 bg-savanna-dark rounded-2xl" />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
