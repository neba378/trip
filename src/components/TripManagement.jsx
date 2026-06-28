import { useState } from 'react';
import { 
  Plus, Edit2, Trash2, X, Check, Image as ImageIcon, 
  LayoutGrid, Trash, AlertCircle, Sparkles, ChevronRight,
  Globe, Calendar, DollarSign, MapPin, Tag, Percent, Users
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { motion, AnimatePresence } from 'framer-motion';

function DynamicList({ label, items, onChange, placeholder = "Add item..." }) {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      onChange([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          placeholder={placeholder}
          className="flex-1 bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-2 text-sm text-white focus:border-savanna-gold outline-none"
        />
        <button
          type="button"
          onClick={addItem}
          className="p-2 bg-savanna-gold text-savanna-darker rounded-xl hover:bg-white transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={index}
              className="flex items-center gap-2 bg-savanna-dark/80 px-3 py-1.5 rounded-lg text-xs text-savanna-cream"
            >
              <span className="truncate max-w-[200px]">
                {item && typeof item === 'object' ? `${item.icon ?? ''} ${item.text ?? ''}`.trim() : item}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StructuredList({ label, items, onChange }) {
  const [icon, setIcon] = useState('');
  const [text, setText] = useState('');

  const addItem = () => {
    if (text.trim()) {
      onChange([...items, { icon: icon.trim(), text: text.trim() }]);
      setIcon('');
      setText('');
    }
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Icon"
          className="w-14 bg-savanna-darker border border-savanna-green-mid rounded-xl px-2 py-2 text-sm text-center text-white focus:border-savanna-gold outline-none"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          placeholder="Item description..."
          className="flex-1 bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-2 text-sm text-white focus:border-savanna-gold outline-none"
        />
        <button
          type="button"
          onClick={addItem}
          className="p-2 bg-savanna-gold text-savanna-darker rounded-xl hover:bg-white transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={index}
              className="flex items-center gap-2 bg-savanna-dark/80 px-3 py-1.5 rounded-lg text-xs text-savanna-cream"
            >
              <span className="truncate max-w-[200px]">
                {item.icon} {item.text}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DiscountEditor({ items, onChange }) {
  const [label, setLabel] = useState('');
  const [labelAm, setLabelAm] = useState('');
  const [percent, setPercent] = useState('');

  const addItem = () => {
    if (label.trim() && percent) {
      onChange([...items, { label: label.trim(), labelAm: labelAm.trim(), percent: parseInt(percent) }]);
      setLabel('');
      setLabelAm('');
      setPercent('');
    }
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[120px]">
          <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="Label (EN)" className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-3 py-2 text-sm text-white focus:border-savanna-gold outline-none" />
        </div>
        <div className="flex-1 min-w-[120px]">
          <input type="text" value={labelAm} onChange={e => setLabelAm(e.target.value)} placeholder="Label (AM)" className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-3 py-2 text-sm text-white focus:border-savanna-gold outline-none font-amharic" />
        </div>
        <div className="w-24">
          <div className="relative">
            <input type="number" min="0" max="100" value={percent} onChange={e => setPercent(e.target.value)} placeholder="%" className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl pl-3 pr-8 py-2 text-sm text-white focus:border-savanna-gold outline-none" />
            <Percent size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-savanna-cream/40" />
          </div>
        </div>
        <button type="button" onClick={addItem} className="p-2 bg-savanna-gold text-savanna-darker rounded-xl hover:bg-white transition-colors">
          <Plus size={20} />
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {items.map((d, i) => (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                key={i}
                className="flex items-center gap-2 bg-savanna-gold/10 border border-savanna-gold/20 px-3 py-1.5 rounded-lg text-xs text-savanna-gold"
              >
                <span>{d.label} / {d.labelAm} — {d.percent}%</span>
                <button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 transition-colors">
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function TripManagement() {
  const { trips, manageTrip, deleteTrip, uploadImages } = useBooking();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', titleAm: '', location: '', locationAm: '',
    category: 'camping', status: 'upcoming', featured: false,
    dateEn: '', dateAm: '', priceETB: 0, priceUSD: 0, priceForeignerUSD: 0,
    spotsTotal: 0, spotsLeft: 0, descriptionEn: '', descriptionAm: '',
    departureLocationEn: '', departureLocationAm: '',
    departureTimeEn: '', departureTimeAm: '',
    images: [], tags: [], includesEn: [], includesAm: [], excludesEn: [], excludesAm: [],
    discounts: []
  });

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setFormData({
      ...trip,
      images: Array.isArray(trip.images) ? trip.images : JSON.parse(trip.images || '[]'),
      tags: Array.isArray(trip.tags) ? trip.tags : JSON.parse(trip.tags || '[]'),
      includesEn: Array.isArray(trip.includesEn) ? trip.includesEn : JSON.parse(trip.includesEn || '[]'),
      includesAm: Array.isArray(trip.includesAm) ? trip.includesAm : JSON.parse(trip.includesAm || '[]'),
      excludesEn: Array.isArray(trip.excludesEn) ? trip.excludesEn : JSON.parse(trip.excludesEn || '[]'),
      excludesAm: Array.isArray(trip.excludesAm) ? trip.excludesAm : JSON.parse(trip.excludesAm || '[]'),
      discounts: Array.isArray(trip.discounts) ? trip.discounts : JSON.parse(trip.discounts || '[]'),
    });
    setIsEditing(true);
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls = await uploadImages(files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      e.target.value = ''; // allow re-selecting the same file
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const normalize = (items) => (items || []).map(item =>
        typeof item === 'string' ? { icon: '', text: item } : item
      );
      // First image doubles as the cover used across cards/detail pages.
      const payload = {
        ...formData,
        coverImage: formData.images[0] || null,
        includesEn: normalize(formData.includesEn),
        includesAm: normalize(formData.includesAm),
        excludesEn: normalize(formData.excludesEn),
        excludesAm: normalize(formData.excludesAm),
      };
      await manageTrip(payload, editingTrip ? 'PATCH' : 'POST', editingTrip?.id);
      setIsEditing(false);
      setEditingTrip(null);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', titleAm: '', location: '', locationAm: '',
      category: 'camping', status: 'upcoming', featured: false,
      dateEn: '', dateAm: '', priceETB: 0, priceUSD: 0, priceForeignerUSD: 0,
      spotsTotal: 0, spotsLeft: 0, descriptionEn: '', descriptionAm: '',
      departureLocationEn: '', departureLocationAm: '',
      departureTimeEn: '', departureTimeAm: '',
      images: [], tags: [], includesEn: [], includesAm: [], excludesEn: [], excludesAm: [],
      discounts: []
    });
  };

  const confirmDelete = async (id) => {
    await deleteTrip(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
            <LayoutGrid className="text-savanna-gold" /> Expedition Catalog
          </h2>
          <p className="text-savanna-cream/40 text-sm mt-1">Manage your active and upcoming trips</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingTrip(null); setIsEditing(true); }}
          className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> New Trip
        </button>
      </div>

      {/* Grid of Trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {trips.map(trip => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={trip.id} 
              className="bg-savanna-dark border border-savanna-green-mid rounded-3xl overflow-hidden group hover:border-savanna-gold/30 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={(Array.isArray(trip.images) ? trip.images[0] : JSON.parse(trip.images || '[]')[0]) || '/placeholder.jpg'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  loading="lazy"
                  alt={trip.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-savanna-dark via-savanna-dark/20 to-transparent" />
                
                {trip.featured && (
                  <div className="absolute top-4 left-4 bg-savanna-gold text-savanna-darker text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg flex items-center gap-1">
                    <Sparkles size={10} /> Featured
                  </div>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleEdit(trip)} 
                    className="p-2.5 bg-savanna-darker backdrop-blur-md rounded-xl text-white hover:bg-savanna-gold hover:text-savanna-darker transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(trip.id)} 
                    className="p-2.5 bg-red-500/10 backdrop-blur-md rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-savanna-green-dark/80 backdrop-blur-sm text-savanna-gold px-2 py-0.5 rounded-md border border-savanna-gold/20">
                      {trip.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                      trip.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400 border-blue-400/20' : 'bg-green-500/20 text-green-400 border-green-400/20'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{trip.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-savanna-cream/60">
                    <MapPin size={14} className="text-savanna-gold" />
                    <span className="text-xs">{trip.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-savanna-cream/60">
                    <Calendar size={14} className="text-savanna-gold" />
                    <span className="text-xs">{trip.dateEn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-savanna-cream/60">
                    <DollarSign size={14} className="text-savanna-gold" />
                    <span className="text-xs font-bold text-white">{trip.priceETB?.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex items-center gap-2 text-savanna-cream/60">
                    <Users size={14} className="text-savanna-gold" />
                    <span className="text-xs">{trip.spotsLeft}/{trip.spotsTotal} Spots</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(trip.tags) ? trip.tags : JSON.parse(trip.tags || '[]')).slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] uppercase tracking-tighter text-savanna-cream/40 px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Overlay */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowDeleteConfirm(null)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-savanna-dark border border-red-500/20 rounded-[2rem] p-8 w-full max-w-sm text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Expedition?</h3>
              <p className="text-savanna-cream/60 text-sm mb-6">This action cannot be undone. All booking data for this trip will remain but the trip will be removed from the catalog.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 btn-outline py-3">Cancel</button>
                <button onClick={() => confirmDelete(showDeleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-bold transition-colors">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsEditing(false)} 
            />
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="relative bg-savanna-dark border border-savanna-green-mid rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-8 py-6 border-b border-savanna-gold/10 flex items-center justify-between bg-savanna-darker/50">
                <div>
                  <h3 className="text-xl font-display font-bold text-savanna-gold">
                    {editingTrip ? 'Edit Expedition' : 'Create New Expedition'}
                  </h3>
                  <p className="text-[10px] text-savanna-cream/40 uppercase tracking-widest mt-0.5">
                    {editingTrip ? `Editing: ${editingTrip.title}` : 'Fill in the details below'}
                  </p>
                </div>
                <button onClick={() => setIsEditing(false)} className="w-10 h-10 flex items-center justify-center rounded-full text-savanna-cream/40 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-10">
                {/* Status & Category */}
                <div className="flex flex-wrap gap-8 items-center bg-savanna-dark/80 p-6 rounded-2xl">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Category</label>
                    <div className="flex gap-2">
                      {['camping', 'hiking', 'cultural', 'safari'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({...formData, category: cat})}
                          className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                            formData.category === cat ? 'bg-savanna-gold text-savanna-darker' : 'bg-savanna-darker border border-savanna-green-mid text-savanna-cream/40 hover:text-savanna-cream'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Status</label>
                    <div className="flex gap-2">
                      {['upcoming', 'active', 'completed'].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({...formData, status: status})}
                          className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                            formData.status === status ? 'bg-savanna-gold text-savanna-darker' : 'bg-savanna-darker border border-savanna-green-mid text-savanna-cream/40 hover:text-savanna-cream'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Featured</label>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, featured: !formData.featured})}
                      className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${formData.featured ? 'bg-savanna-gold' : 'bg-savanna-darker border border-savanna-green-mid'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all duration-300 ${formData.featured ? 'translate-x-7' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Globe size={14} className="text-savanna-gold" />
                        <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest">English Content</label>
                      </div>
                      <input type="text" required placeholder="Trip Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none" />
                      <input type="text" required placeholder="Location (e.g. Bale Mountains)" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none" />
                      <input type="text" required placeholder="Date Range (e.g. Oct 12-15)" value={formData.dateEn} onChange={e => setFormData({...formData, dateEn: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none" />
                      <input type="text" placeholder="Departure Location" value={formData.departureLocationEn} onChange={e => setFormData({...formData, departureLocationEn: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none" />
                      <input type="text" placeholder="Departure Time" value={formData.departureTimeEn} onChange={e => setFormData({...formData, departureTimeEn: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none" />
                      <textarea placeholder="Trip Description" value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none h-32 resize-none" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-savanna-gold font-bold">አ</span>
                        <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest">Amharic Content</label>
                      </div>
                      <input type="text" required placeholder="የጉዞው ስም" value={formData.titleAm} onChange={e => setFormData({...formData, titleAm: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none font-amharic" />
                      <input type="text" required placeholder="ቦታ (ለምሳሌ ባሌ ተራሮች)" value={formData.locationAm} onChange={e => setFormData({...formData, locationAm: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none font-amharic" />
                      <input type="text" required placeholder="ቀን (ለምሳሌ ጥቅምት 12-15)" value={formData.dateAm} onChange={e => setFormData({...formData, dateAm: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none font-amharic" />
                      <input type="text" placeholder="የመነሻ ቦታ" value={formData.departureLocationAm} onChange={e => setFormData({...formData, departureLocationAm: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none font-amharic" />
                      <input type="text" placeholder="የመነሻ ሰዓት" value={formData.departureTimeAm} onChange={e => setFormData({...formData, departureTimeAm: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none font-amharic" />
                      <textarea placeholder="የጉዞው ዝርዝር መግለጫ" value={formData.descriptionAm} onChange={e => setFormData({...formData, descriptionAm: e.target.value})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none h-32 resize-none font-amharic" />
                    </div>
                  </div>
                </div>

                {/* Pricing & Spots */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 bg-savanna-dark/80 p-6 rounded-2xl">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Price (ETB)</label>
                    <div className="relative">
                      <input type="number" required value={formData.priceETB} onChange={e => setFormData({...formData, priceETB: parseInt(e.target.value)})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl pl-4 pr-12 py-3 text-white focus:border-savanna-gold outline-none" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-savanna-cream/40">ETB</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Price (USD)</label>
                    <div className="relative">
                      <input type="number" value={formData.priceUSD} onChange={e => setFormData({...formData, priceUSD: parseInt(e.target.value)})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl pl-4 pr-12 py-3 text-white focus:border-savanna-gold outline-none" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-savanna-cream/40">USD</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Foreigner USD</label>
                    <div className="relative">
                      <input type="number" step="0.01" value={formData.priceForeignerUSD} onChange={e => setFormData({...formData, priceForeignerUSD: parseFloat(e.target.value)})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl pl-4 pr-12 py-3 text-white focus:border-savanna-gold outline-none" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-savanna-cream/40">USD</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Total Spots</label>
                    <input type="number" required value={formData.spotsTotal} onChange={e => setFormData({...formData, spotsTotal: parseInt(e.target.value)})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Spots Left</label>
                    <input type="number" required value={formData.spotsLeft} onChange={e => setFormData({...formData, spotsLeft: parseInt(e.target.value)})} className="w-full bg-savanna-darker border border-savanna-green-mid rounded-xl px-4 py-3 text-white focus:border-savanna-gold outline-none" />
                  </div>
                </div>

                {/* Dynamic Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">
                      Trip Images <span className="text-savanna-cream/25 normal-case">(first = cover)</span>
                    </label>
                    <label className={`flex items-center justify-center gap-2 bg-savanna-darker border border-dashed border-savanna-green-mid rounded-xl px-4 py-4 text-sm cursor-pointer hover:border-savanna-gold transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      <ImageIcon size={18} className="text-savanna-gold" />
                      <span className="text-savanna-cream/70">{uploading ? 'Uploading…' : 'Upload images'}</span>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {formData.images.map((img, i) => (
                          <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-savanna-gold/10">
                            <img src={img} loading="lazy" alt={`Trip image ${i + 1}`} className="w-full h-full object-cover" />
                            {i === 0 && (
                              <span className="absolute top-1 left-1 bg-savanna-gold text-savanna-darker text-[9px] font-bold px-1.5 py-0.5 rounded">COVER</span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute top-1 right-1 bg-black/60 text-red-400 hover:text-red-300 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <DynamicList
                    label="Search Tags"
                    items={formData.tags} 
                    onChange={val => setFormData({...formData, tags: val})} 
                    placeholder="e.g. adventure, mountains..."
                  />
                  <StructuredList 
                    label="What's Included (EN)" 
                    items={formData.includesEn} 
                    onChange={val => setFormData({...formData, includesEn: val})} 
                  />
                  <StructuredList 
                    label="What's Included (AM)" 
                    items={formData.includesAm} 
                    onChange={val => setFormData({...formData, includesAm: val})} 
                  />
                  <StructuredList 
                    label="Exclusions (EN)" 
                    items={formData.excludesEn} 
                    onChange={val => setFormData({...formData, excludesEn: val})} 
                  />
                  <StructuredList 
                    label="Exclusions (AM)" 
                    items={formData.excludesAm} 
                    onChange={val => setFormData({...formData, excludesAm: val})} 
                  />
                </div>
                
                {/* Discounts */}
                <div className="bg-savanna-dark/80 p-6 rounded-2xl space-y-4">
                  <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1 block">
                    Discounts <span className="text-savanna-cream/25 normal-case">(label, labelAm, percent)</span>
                  </label>
                  <DiscountEditor
                    items={formData.discounts}
                    onChange={val => setFormData({...formData, discounts: val})}
                  />
                </div>

                <div className="pt-6 flex gap-4 border-t border-savanna-gold/10">
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 btn-outline justify-center py-4">Discard Changes</button>
                  <button type="submit" className="flex-[2] btn-primary justify-center py-4 group">
                    {editingTrip ? 'Save Expedition Changes' : 'Create Expedition Catalog'}
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
