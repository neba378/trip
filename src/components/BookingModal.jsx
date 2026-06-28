import { useState } from 'react';
import { X, Check, Phone, Send, User, Users, GraduationCap, Globe, Upload, Image, ArrowRight, Loader2, ChevronRight, ShieldCheck, Wallet } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { motion, AnimatePresence } from 'framer-motion';

const travelerTypes = [
  { value: 'regular', icon: <User size={18} />, labelEn: 'Regular', labelAm: 'መደበኛ', discount: 0 },
  { value: 'student', icon: <GraduationCap size={18} />, labelEn: 'Student (10% off)', labelAm: 'ተማሪ (10% ቅናሽ)', discount: 10 },
  { value: 'group', icon: <Users size={18} />, labelEn: 'Group 4+ (10% off)', labelAm: 'ቡድን 4+ (10% ቅናሽ)', discount: 10 },
  { value: 'foreigner', icon: <Globe size={18} />, labelEn: 'Foreigner', labelAm: 'ውጭ አገር', discount: 0, foreignPrice: true },
];

export default function BookingModal({ trip, onClose }) {
  const { language, addBooking, loading, markTripBooked } = useBooking();
  const [step, setStep] = useState(1); 
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    travelerType: 'regular',
    groupSize: 1,
    notes: '',
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  const selectedType = travelerTypes.find(t => t.value === form.travelerType);
  const isForeigner = form.travelerType === 'foreigner';
  
  const basePrice = isForeigner ? (trip.priceUSD || 180) : trip.priceETB;
  const currency = isForeigner ? 'USD' : 'ETB';
  const discountAmount = isForeigner ? 0 : (basePrice * (selectedType?.discount || 0)) / 100;
  const finalPrice = basePrice - discountAmount;
  const totalPrice = finalPrice * form.groupSize;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) return setStep(2);
    if (step === 2) return setStep(3);
    
    try {
      const formData = new FormData();
      formData.append('firstName', form.firstName);
      formData.append('lastName', form.lastName);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('travelers', form.groupSize);
      formData.append('tripId', trip.id);
      formData.append('tripTitle', trip.title);
      formData.append('tripDate', trip.dateEn);
      formData.append('totalPrice', totalPrice);
      formData.append('specialRequests', form.notes);
      
      if (paymentScreenshot) formData.append('receipt', paymentScreenshot);

      const result = await addBooking(formData);
      setBookingResult(result);
      setStep(4);
    } catch (error) {
      if (error.response?.status === 409) {
        markTripBooked(trip.id);
        onClose();
      }
    }
  };

  const stepVariants = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-gradient-to-b from-savanna-dark to-savanna-darker border border-savanna-gold/20 rounded-[2.5rem] w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Progress Bar */}
        <div className="h-1.5 bg-savanna-dark/80 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-savanna-gold shadow-[0_0_15px_rgba(212,160,23,0.5)]" 
          />
        </div>

        {/* Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-savanna-gold/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-savanna-gold uppercase tracking-[0.2em]">Step {step} of 4</span>
              <div className="w-1 h-1 rounded-full bg-savanna-gold/30" />
              <span className="text-[10px] font-bold text-savanna-cream/30 uppercase tracking-[0.2em]">{trip.category}</span>
            </div>
            <h2 className="text-white font-display font-bold text-2xl">
              {step === 4 ? 'Adventure Confirmed!' : step === 3 ? 'Final Review' : step === 2 ? 'Secure Payment' : 'Begin Your Journey'}
            </h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full text-savanna-cream/40 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Select Traveler Type</label>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    {travelerTypes.map(t => (
                      <button 
                        key={t.value} 
                        type="button" 
                        onClick={() => setForm({...form, travelerType: t.value})} 
                        className={`p-4 rounded-2xl transition-all flex items-center gap-4 group ${
                          form.travelerType === t.value 
                            ? 'border border-savanna-gold bg-savanna-gold/10 text-savanna-gold' 
                            : 'text-savanna-cream/60 hover:bg-savanna-gold/5'
                        }`}
                      >
                        <div className={`p-2 rounded-xl transition-colors ${form.travelerType === t.value ? 'bg-savanna-gold text-savanna-darker' : 'text-savanna-cream/40'}`}>
                          {t.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold uppercase tracking-wider">{language === 'en' ? t.labelEn : t.labelAm}</p>
                          <p className="text-[10px] opacity-50">{t.discount > 0 ? `${t.discount}% discount applied` : 'Standard pricing'}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Personal Information</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-savanna-cream/20 group-focus-within:text-savanna-gold transition-colors" size={18} />
                      <input type="text" required placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full bg-transparent border border-savanna-gold/10 rounded-xl pl-12 pr-4 py-3.5 text-white outline-none focus:border-savanna-gold transition-all" />
                    </div>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-savanna-cream/20 group-focus-within:text-savanna-gold transition-colors" size={18} />
                      <input type="text" required placeholder="Last Name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full bg-transparent border border-savanna-gold/10 rounded-xl pl-12 pr-4 py-3.5 text-white outline-none focus:border-savanna-gold transition-all" />
                    </div>
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-savanna-cream/20 group-focus-within:text-savanna-gold transition-colors" size={18} />
                    <input type="tel" required placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-transparent border border-savanna-gold/10 rounded-xl pl-12 pr-4 py-3.5 text-white outline-none focus:border-savanna-gold transition-all" />
                  </div>
                  <div className="relative group">
                    <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-savanna-cream/20 group-focus-within:text-savanna-gold transition-colors" size={18} />
                    <input type="email" required placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-transparent border border-savanna-gold/10 rounded-xl pl-12 pr-4 py-3.5 text-white outline-none focus:border-savanna-gold transition-all" />
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary justify-center py-4 group">
                  Next Step
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-8"
              >
                <div className="bg-savanna-gold/5 border border-savanna-gold/20 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Wallet size={80} className="text-savanna-gold" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-savanna-gold/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Payment Method: Telebirr / CBE</p>
                    <h3 className="text-white text-3xl font-black mb-2 tracking-tight">+251 944 780 840</h3>
                    <div className="flex items-center justify-center gap-2 text-savanna-cream/40 text-xs uppercase tracking-widest">
                      <ShieldCheck size={14} className="text-savanna-gold" />
                      Account: Savanna Travel
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-savanna-cream/40 uppercase tracking-widest ml-1">Upload Receipt</label>
                  <label className="block border-2 border-dashed border-savanna-gold/10 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 text-center cursor-pointer hover:border-savanna-gold/30 transition-all group relative overflow-hidden">
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    {previewUrl ? (
                      <div className="relative">
                        <img src={previewUrl} loading="lazy" className="max-h-48 mx-auto rounded-xl shadow-2xl" alt="Receipt preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                          <p className="text-white text-xs font-bold uppercase">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4">
                        <div className="w-16 h-16 bg-savanna-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Upload className="text-savanna-gold" size={28} />
                        </div>
                        <p className="text-white font-bold mb-1">Upload Payment Screenshot</p>
                        <p className="text-savanna-cream/40 text-xs">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 btn-outline justify-center py-4 rounded-2xl">Back</button>
                  <button onClick={() => setStep(3)} disabled={!paymentScreenshot} className="flex-[2] btn-primary justify-center py-4 rounded-2xl disabled:opacity-50 group">
                    Review Booking
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="bg-savanna-dark/80 border border-savanna-gold/10 rounded-3xl p-8 space-y-6">
                    <div className="flex justify-between items-start pb-6 border-b border-savanna-gold/10">
                      <div>
                        <p className="text-savanna-cream/40 text-[10px] font-bold uppercase tracking-widest mb-1">Traveler Details</p>
                        <h4 className="text-white font-bold text-xl">{form.firstName} {form.lastName}</h4>
                        <p className="text-savanna-cream/60 text-xs">{form.email} • {form.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-savanna-cream/40 text-[10px] font-bold uppercase tracking-widest mb-1">Package</p>
                        <span className="bg-savanna-gold/10 text-savanna-gold text-[10px] font-bold px-2 py-1 rounded-lg border border-savanna-gold/20 uppercase">
                          {form.travelerType}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-savanna-cream/60">Base Price ({form.groupSize} traveler)</span>
                        <span className="text-white font-mono">{(basePrice * form.groupSize).toLocaleString()} {currency}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Special Discount</span>
                          <span className="text-green-400 font-mono">-{(discountAmount * form.groupSize).toLocaleString()} {currency}</span>
                        </div>
                      )}
                      <div className="pt-4 border-t border-savanna-gold/10 flex justify-between items-center">
                        <span className="text-white font-bold">Total Amount Due</span>
                        <span className="text-savanna-gold text-2xl font-black font-mono">{totalPrice.toLocaleString()} {currency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-4 items-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <p className="text-[10px] text-blue-200/60 leading-relaxed uppercase tracking-wider">
                      Your data is encrypted and secure. By confirming, you agree to our expedition terms and cancellation policy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 btn-outline justify-center py-4 rounded-2xl">Back</button>
                  <button onClick={handleSubmit} disabled={loading} className="flex-[2] btn-primary justify-center py-4 rounded-2xl disabled:opacity-50">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Check size={20} />
                        <span>Confirm & Reserve Spot</span>
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-8"
              >
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto"
                  >
                    <Check size={48} />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-savanna-gold text-savanna-darker rounded-full flex items-center justify-center font-bold"
                  >
                    !
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-2">Expedition Secured!</h3>
                  <p className="text-savanna-cream/60 max-w-xs mx-auto text-sm">
                    We've received your booking. Our team will verify your payment and contact you shortly.
                  </p>
                </div>

                  <div className="bg-savanna-dark/80 border border-savanna-gold/10 rounded-2xl p-6 mx-auto w-full max-w-[280px]">
                  <p className="text-[10px] text-savanna-cream/40 uppercase tracking-[0.2em] mb-2">Confirmation Code</p>
                  <p className="text-2xl font-mono font-bold text-savanna-gold tracking-widest uppercase">
                    {bookingResult?.confirmationCode}
                  </p>
                </div>

                <div className="pt-4">
                  <button onClick={onClose} className="btn-primary px-12 py-4 rounded-2xl">
                    Back to Expeditions
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
