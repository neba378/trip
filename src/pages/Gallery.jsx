import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { galleryItems, categories } from '../data/gallery';
import Lightbox from '../components/Lightbox';

export default function Gallery() {
  const { language } = useBooking();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const galleryImages = filtered.map(item => item.src);

  return (
    <div className="min-h-screen pt-20">
      {/* ... existing header and filter ... */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
            alt="Gallery"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-savanna-gold text-sm font-medium tracking-widest uppercase mb-3">
            {language === 'en' ? 'Visual Stories' : 'የምስል ታሪኮች'}
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white text-white-static mb-4">
            {language === 'en' ? 'Gallery' : 'ጋለሪ'}
          </h1>
          <p className="text-savanna-cream/70 text-lg max-w-xl mx-auto">
            {language === 'en'
              ? 'Moments captured from our adventures across Ethiopia.'
              : 'በኢትዮጵያ ጀብዱዎቻችን ላይ የተቀረጹ ቅጽበቶች።'}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="sticky top-16 z-30 bg-savanna-darker/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat.value
                  ? 'bg-savanna-gold text-savanna-darker'
                  : 'bg-[#1E2A3A] text-savanna-cream/70 hover:text-savanna-gold'
              }`}
            >
              {language === 'en' ? cat.labelEn : cat.labelAm}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden"
              onClick={() => setLightboxIndex(index)}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500 max-h-[80vh]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn size={28} className="text-white text-white-static opacity-0 group-hover:opacity-100 transition-opacity md:opacity-0" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <p className="text-white text-white-static text-sm font-medium">
                  {language === 'en' ? item.caption : item.captionAm}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== -1 && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </div>
  );
}
