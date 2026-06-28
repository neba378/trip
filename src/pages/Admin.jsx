import { useState, useMemo } from 'react';
import { 
  Check, X, Phone, Mail, Users, Calendar, DollarSign, 
  Image as ImageIcon, LogOut, Search, Filter, TrendingUp, 
  PieChart as PieChartIcon, BarChart as BarChartIcon,
  LayoutGrid, ArrowUpRight, Activity, Wallet, Clock,
  ChevronRight, ExternalLink, ShieldCheck, AlertCircle, Eye
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import TripManagement from '../components/TripManagement';
import AdminManagement from '../components/AdminManagement';
import { AdminTableRowSkeleton } from '../components/Skeleton';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const COLORS = ['#D4A017', '#1A3A2A', '#ef4444', '#3b82f6'];

export default function Admin() {
  const { bookings, updateBookingStatus, adminToken, loginAdmin, logoutAdmin, bookingsLoading } = useBooking();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list'); // list | analytics | trips | admins
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginAdmin(email, password);
  };

  const filtered = useMemo(() => bookings.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter;
    const name = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
    const matchSearch = search === '' ||
      name.includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      (b.confirmationCode && b.confirmationCode.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  }), [bookings, filter, search]);

  const stats = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    rejected: bookings.filter(b => b.status === 'rejected').length,
    revenue: bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    potentialRevenue: bookings
      .filter(b => b.status === 'pending')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
  }), [bookings]);

  // Analytics Data
  const pieData = useMemo(() => [
    { name: 'Confirmed', value: stats.confirmed },
    { name: 'Pending', value: stats.pending },
    { name: 'Rejected', value: stats.rejected },
  ].filter(d => d.value > 0), [stats]);

  const barData = useMemo(() => {
    const tripStats = bookings.reduce((acc, b) => {
      acc[b.tripTitle] = (acc[b.tripTitle] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(tripStats).map(key => ({
      name: key.split(' ').slice(0, 2).join(' '),
      bookings: tripStats[key]
    })).sort((a, b) => b.bookings - a.bookings).slice(0, 5);
  }, [bookings]);

  if (!adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-savanna-darker p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-savanna-dark border border-savanna-green-mid rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-savanna-gold to-transparent opacity-20" />
          <div className="text-center mb-8">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="w-20 h-20 rounded-[2rem] bg-savanna-gold flex items-center justify-center text-savanna-darker font-bold text-3xl mx-auto mb-6 shadow-xl shadow-savanna-gold/20"
            >
              S
            </motion.div>
            <h1 className="text-white text-white-static font-display font-bold text-3xl mb-2">Admin Access</h1>
            <p className="text-savanna-cream/40 text-sm">Authorized personnel only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-savanna-cream/20 group-focus-within:text-savanna-gold transition-colors" size={20} />
              <input
                type="email"
                className="w-full bg-savanna-darker border border-savanna-green-mid rounded-2xl pl-12 pr-4 py-4 text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <div className="relative group">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-savanna-cream/20 group-focus-within:text-savanna-gold transition-colors" size={20} />
              <input
                type="password"
                className="w-full bg-savanna-darker border border-savanna-green-mid rounded-2xl pl-12 pr-4 py-4 text-savanna-cream focus:outline-none focus:border-savanna-gold transition-all"
                placeholder="Secure Access Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full btn-primary justify-center py-4 rounded-2xl group">
              Authenticate
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-savanna-darker p-3 sm:p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold text-savanna-gold uppercase tracking-[0.3em]">Management Suite</span>
              <div className="w-1.5 h-1.5 rounded-full bg-savanna-gold" />
              <span className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-[0.3em]">v2.1 Stable</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-bold text-white flex items-center gap-4">
              Control Center
            </h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1">
            <div className="bg-savanna-dark p-1 rounded-xl sm:rounded-2xl border border-savanna-green-mid flex shadow-lg">
              {[
                { id: 'list', icon: Search, label: 'Bookings' },
                { id: 'analytics', icon: TrendingUp, label: 'Insights' },
                { id: 'trips', icon: LayoutGrid, label: 'Catalog' },
                { id: 'admins', icon: ShieldCheck, label: 'Admins' }
              ].map((v) => (
                <button 
                  key={v.id}
                  onClick={() => setView(v.id)}
                  className={`shrink-0 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2.5 transition-all ${view === v.id ? 'bg-savanna-gold text-savanna-darker shadow-lg shadow-savanna-gold/20' : 'text-savanna-cream/40 hover:text-savanna-cream'}`}
                >
                  <v.icon size={14} className="sm:w-4 sm:h-4" /> {v.label}
                </button>
              ))}
            </div>
            <button 
              onClick={logoutAdmin}
              className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: 'Total Expeditions', value: stats.total, icon: Activity, color: 'text-savanna-gold' },
                  { label: 'Pending Approval', value: stats.pending, icon: Clock, color: 'text-yellow-500' },
                  { label: 'Confirmed Travelers', value: stats.confirmed, icon: Users, color: 'text-green-500' },
                  { label: 'Realized Revenue', value: `${stats.revenue.toLocaleString()} ETB`, icon: Wallet, color: 'text-savanna-gold' }
                ].map((stat, i) => (
                  <div key={i} className="bg-savanna-dark p-6 rounded-3xl border border-savanna-green-mid shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:scale-110 transition-transform duration-700">
                      <stat.icon size={100} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-savanna-cream/40 text-[10px] font-bold uppercase tracking-widest mb-4">{stat.label}</p>
                      <div className="flex items-end justify-between">
                        <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                        <div className="w-8 h-8 rounded-xl bg-savanna-darker flex items-center justify-center text-savanna-cream/20">
                          <stat.icon size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filters & Search */}
              <div className="bg-savanna-dark p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-col lg:flex-row gap-4 sm:gap-5 shadow-xl">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-savanna-cream/20 group-focus-within:text-savanna-gold transition-colors" size={20} />
                  <input 
                    type="text"
                    placeholder="Search by name, phone or code..."
                    className="w-full bg-savanna-darker rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-savanna-gold transition-all text-savanna-cream"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                  {['all', 'pending', 'confirmed', 'rejected'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${filter === f ? 'bg-savanna-gold border border-savanna-gold text-savanna-darker shadow-lg shadow-savanna-gold/20' : 'bg-savanna-darker text-savanna-cream/40 hover:text-savanna-cream'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="bg-savanna-dark rounded-2xl sm:rounded-[2.5rem] border border-savanna-green-mid overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-savanna-darker/50 border-b border-savanna-gold/10">
                        <th className="p-3 sm:p-6 text-[10px] font-bold text-savanna-cream/30 uppercase tracking-[0.3em]">Traveler</th>
                        <th className="p-3 sm:p-6 text-[10px] font-bold text-savanna-cream/30 uppercase tracking-[0.3em]">Expedition</th>
                        <th className="p-3 sm:p-6 text-[10px] font-bold text-savanna-cream/30 uppercase tracking-[0.3em]">Investment</th>
                        <th className="p-3 sm:p-6 text-[10px] font-bold text-savanna-cream/30 uppercase tracking-[0.3em]">Status</th>
                        <th className="p-3 sm:p-6 text-[10px] font-bold text-savanna-cream/30 uppercase tracking-[0.3em] text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {bookingsLoading ? (
                        [1, 2, 3, 4, 5].map(i => <AdminTableRowSkeleton key={i} />)
                      ) : filtered.length > 0 ? (
                        filtered.map((booking) => (
                          <motion.tr 
                            layout
                            key={booking.id} 
                            className="transition-colors group"
                          >
                              <td className="p-3 sm:p-6">
                                <div className="font-bold text-white text-xs sm:text-base">{booking.firstName} {booking.lastName}</div>
                                <div className="flex items-center gap-3 mt-1.5">
                                  <span className="text-[10px] text-savanna-cream/40 font-mono flex items-center gap-1">
                                    <Phone size={10} className="text-savanna-gold/40" /> {booking.phone}
                                  </span>
                                  <span className="w-1 h-1 rounded-full bg-savanna-gold/10" />
                                  <span className="text-[10px] text-savanna-cream/40 font-mono flex items-center gap-1">
                                    <Mail size={10} className="text-savanna-gold/40" /> {booking.email?.slice(0, 15)}...
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 sm:p-6">
                                <div className="text-xs sm:text-sm font-bold text-savanna-gold group-hover:text-white transition-colors">{booking.tripTitle}</div>
                                <div className="text-[10px] text-savanna-cream/30 uppercase tracking-widest mt-1.5 font-mono">ID: {booking.confirmationCode}</div>
                              </td>
                              <td className="p-3 sm:p-6">
                                <div className="font-black text-white text-xs sm:text-base">{booking.totalPrice?.toLocaleString()} ETB</div>
                                <div className="text-[10px] text-savanna-cream/40 uppercase tracking-widest mt-1">{booking.travelers} Adventurer{booking.travelers > 1 ? 's' : ''}</div>
                              </td>
                              <td className="p-3 sm:p-6">
                                <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[8px] sm:text-[9px] font-bold uppercase tracking-widest border flex items-center gap-2 w-fit ${
                                  booking.status === 'confirmed' 
                                    ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                                    : booking.status === 'rejected' 
                                    ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                                    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${booking.status === 'confirmed' ? 'bg-green-500' : booking.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`} />
                                  {booking.status}
                                </span>
                              </td>
                              <td className="p-3 sm:p-6">
                                <div className="flex justify-center gap-1.5 sm:gap-2">
                                <button 
                                  onClick={() => setSelectedBooking(booking)} 
                                  className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all shadow-lg flex items-center justify-center"
                                  title="View Details"
                                >
                                  <Eye size={18} />
                                </button>
                                {booking.status === 'pending' && (
                                  <>
                                    <button 
                                      onClick={() => updateBookingStatus(booking.id, 'confirmed')} 
                                      className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl border border-green-500/20 hover:bg-green-500 hover:text-white transition-all shadow-lg shadow-green-500/10 flex items-center justify-center"
                                      title="Approve"
                                    >
                                      <Check size={18} />
                                    </button>
                                    <button 
                                      onClick={() => updateBookingStatus(booking.id, 'rejected')} 
                                      className="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10 flex items-center justify-center"
                                      title="Reject"
                                    >
                                      <X size={18} />
                                    </button>
                                  </>
                                )}
                                {booking.receiptUrl && (
                                  <a 
                                    href={`${API_URL}${booking.receiptUrl}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 bg-savanna-gold/10 text-savanna-gold rounded-xl border border-savanna-gold/20 hover:bg-savanna-gold hover:text-savanna-darker transition-all shadow-lg shadow-savanna-gold/10 flex items-center justify-center"
                                    title="Open Receipt"
                                  >
                                    <ExternalLink size={18} />
                                  </a>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-20 text-center">
                            <div className="w-20 h-20 bg-savanna-darker rounded-full flex items-center justify-center mx-auto mb-6 text-savanna-cream/20">
                              <Search size={32} />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">No results found</h3>
                            <p className="text-savanna-cream/40 max-w-xs mx-auto text-sm">We couldn't find any bookings matching your current filters or search query.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : view === 'analytics' ? (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Distribution */}
              <div className="bg-savanna-dark p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[2.5rem] border border-savanna-green-mid shadow-2xl">
                <div className="flex items-center justify-between mb-6 sm:mb-10">
                  <h3 className="text-white font-display font-bold text-lg sm:text-2xl flex items-center gap-3">
                    <PieChartIcon className="text-savanna-gold" /> Booking Flow
                  </h3>
                  <div className="bg-savanna-darker px-3 py-1.5 rounded-xl text-[10px] font-bold text-savanna-cream/40 uppercase tracking-widest">
                    Live Status
                  </div>
                </div>
                <div className="h-[350px] relative">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={110}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0D1F17', border: '1px solid #2D5A3D', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                          itemStyle={{ color: '#F5EDD6', fontSize: '12px', fontWeight: 'bold' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-savanna-cream/20">
                      <AlertCircle size={48} className="mb-4" />
                      <p>Insufficient data for distribution</p>
                    </div>
                  )}
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-black text-white">{stats.total}</span>
                    <span className="text-[10px] font-bold text-savanna-cream/40 uppercase tracking-widest">Total</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-8 mt-10">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 0 10px ${COLORS[index % COLORS.length]}40` }} />
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-widest">{entry.name}</p>
                        <p className="text-sm font-bold text-white">{entry.value} Bookings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popularity */}
              <div className="bg-savanna-dark p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-[2.5rem] border border-savanna-green-mid shadow-2xl">
                <div className="flex items-center justify-between mb-6 sm:mb-10">
                  <h3 className="text-white font-display font-bold text-lg sm:text-2xl flex items-center gap-3">
                    <BarChartIcon className="text-savanna-gold" /> Popular Expeditions
                  </h3>
                  <div className="flex items-center gap-2 text-savanna-gold text-xs font-bold">
                    Top 5 <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="h-[350px]">
                  {barData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2D5A3D" horizontal={true} vertical={false} opacity={0.3} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#F5EDD6" fontSize={10} width={100} axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{ fill: 'rgba(212, 160, 23, 0.05)' }}
                          contentStyle={{ backgroundColor: '#0D1F17', border: '1px solid #2D5A3D', borderRadius: '16px' }}
                        />
                        <Bar dataKey="bookings" fill="#D4A017" radius={[0, 8, 8, 0]} barSize={32}>
                          {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#D4A017' : '#D4A01780'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-savanna-cream/20">
                      <BarChartIcon size={48} className="mb-4" />
                      <p>No trip booking data yet</p>
                    </div>
                  )}
                </div>
                <div className="mt-8 p-6 bg-savanna-dark/80 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-savanna-gold/10 rounded-xl flex items-center justify-center text-savanna-gold">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Highest Demand</p>
                    <p className="text-savanna-cream/40 text-xs">
                      {barData[0] ? `${barData[0].name} leads with ${barData[0].bookings} confirmed interests.` : 'Collecting more data...'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : view === 'trips' ? (
            <motion.div
              key="trips"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TripManagement />
            </motion.div>
          ) : (
            <AdminManagement />
          )}
        </AnimatePresence>

        {/* Booking Detail Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedBooking(null)} 
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                className="relative bg-savanna-dark border border-savanna-green-mid rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              >
                <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-savanna-gold/10 flex items-center justify-between bg-savanna-darker/50">
                  <div>
                    <span className="text-[10px] font-bold text-savanna-gold uppercase tracking-[0.2em]">Booking Details</span>
                    <h2 className="text-xl font-display font-bold text-white mt-0.5">{selectedBooking.firstName} {selectedBooking.lastName}</h2>
                  </div>
                  <button onClick={() => setSelectedBooking(null)} className="w-10 h-10 flex items-center justify-center rounded-full text-savanna-cream/40 hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-1 p-4 sm:p-8 space-y-4 sm:space-y-8">
                  {/* Payment Screenshot */}
                  {selectedBooking.receiptUrl && (
                    <div className="bg-savanna-dark/80 rounded-2xl border border-savanna-gold/10 overflow-hidden">
                      <div className="px-6 py-4 border-b border-savanna-gold/10 flex items-center justify-between">
                        <span className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest flex items-center gap-2">
                          <ImageIcon size={14} className="text-savanna-gold" /> Payment Receipt
                        </span>
                        <a 
                          href={`${API_URL}${selectedBooking.receiptUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-savanna-gold hover:text-white transition-colors flex items-center gap-1"
                        >
                          Open Full Size <ExternalLink size={12} />
                        </a>
                      </div>
                      <div className="bg-black/40 flex items-center justify-center p-4">
                        <img 
                          src={`${API_URL}${selectedBooking.receiptUrl}`} 
                          alt="Payment receipt" 
                          loading="lazy"
                          className="max-h-[400px] object-contain rounded-xl shadow-2xl"
                        />
                      </div>
                    </div>
                  )}

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      <div className="bg-savanna-dark/80 p-5 rounded-2xl">
                        <p className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-widest mb-3">Traveler</p>
                        <p className="text-white font-bold text-lg">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                        <div className="flex items-center gap-2 mt-2 text-savanna-cream/60 text-sm">
                          <Mail size={14} className="text-savanna-gold/40" /> {selectedBooking.email}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-savanna-cream/60 text-sm">
                          <Phone size={14} className="text-savanna-gold/40" /> {selectedBooking.phone}
                        </div>
                      </div>
                      <div className="bg-savanna-dark/80 p-5 rounded-2xl">
                        <p className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-widest mb-3">Expedition</p>
                        <p className="text-white font-bold">{selectedBooking.tripTitle}</p>
                        <div className="flex items-center gap-2 mt-2 text-savanna-cream/60 text-sm">
                          <Calendar size={14} className="text-savanna-gold/40" /> {selectedBooking.tripDate}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-savanna-cream/60 text-sm">
                          <Users size={14} className="text-savanna-gold/40" /> {selectedBooking.travelers} traveler{selectedBooking.travelers > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="bg-savanna-dark/80 p-5 rounded-2xl">
                        <p className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-widest mb-3">Payment</p>
                        <p className="text-3xl font-black text-savanna-gold">{Number(selectedBooking.totalPrice).toLocaleString()} <span className="text-sm font-bold text-savanna-cream/40">ETB</span></p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-xl text-[9px] font-bold uppercase tracking-widest border flex items-center gap-1.5 w-fit ${
                            selectedBooking.status === 'confirmed' 
                              ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                              : selectedBooking.status === 'rejected' 
                              ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                              : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${selectedBooking.status === 'confirmed' ? 'bg-green-500' : selectedBooking.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`} />
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>
                  <div className="bg-savanna-dark/80 p-5 rounded-2xl">
                    <p className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-widest mb-3">Confirmation Code</p>
                    <p className="text-2xl font-mono font-bold text-white tracking-wider">{selectedBooking.confirmationCode}</p>
                    <p className="text-[10px] text-savanna-cream/40 mt-2">
                      Booked on {new Date(selectedBooking.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                    </div>
                  </div>

                  {selectedBooking.specialRequests && (
                    <div className="bg-savanna-dark/80 p-5 rounded-2xl">
                      <p className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-widest mb-2">Special Requests</p>
                      <p className="text-savanna-cream/70 text-sm italic">{selectedBooking.specialRequests}</p>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                {selectedBooking.status === 'pending' && (
                  <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-savanna-gold/10 bg-savanna-darker/50 flex gap-4">
                    <button 
                      onClick={() => { updateBookingStatus(selectedBooking.id, 'rejected'); setSelectedBooking(null); }} 
                      className="flex-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl py-4 font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <X size={20} /> Reject Booking
                    </button>
                    <button 
                      onClick={() => { updateBookingStatus(selectedBooking.id, 'confirmed'); setSelectedBooking(null); }} 
                      className="flex-[2] bg-green-500/10 text-green-500 border border-green-500/20 rounded-2xl py-4 font-bold hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Check size={20} /> Confirm & Approve
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
