import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const [scale, setScale] = useState(1);

  const handleZoom = (delta) => {
    setScale(prev => Math.min(Math.max(1, prev + delta), 3));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col"
        style={{ '--savanna-white': '#FFFFFF' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 z-10">
          <div className="text-white/40 text-xs font-black uppercase tracking-widest">
            {currentIndex + 1} / {images.length}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleZoom(0.5)} className="text-white/60 hover:text-white transition-colors">
              <ZoomIn size={20} />
            </button>
            <button onClick={() => handleZoom(-0.5)} className="text-white/60 hover:text-white transition-colors">
              <ZoomOut size={20} />
            </button>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden p-4 md:p-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg pointer-events-none"
              loading="lazy"
              alt=""
            />
          </AnimatePresence>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => { setScale(1); onNavigate((currentIndex - 1 + images.length) % images.length); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-2xl text-white/60 hover:bg-savanna-gold hover:text-savanna-darker transition-all"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => { setScale(1); onNavigate((currentIndex + 1) % images.length); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-2xl text-white/60 hover:bg-savanna-gold hover:text-savanna-darker transition-all"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="p-6 overflow-x-auto flex justify-center gap-3 no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setScale(1); onNavigate(i); }}
              className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                i === currentIndex ? 'border-savanna-gold scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'
              }`}
            >
              <img src={img} loading="lazy" className="w-full h-full object-cover" alt={`View image ${i + 1}`} />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
