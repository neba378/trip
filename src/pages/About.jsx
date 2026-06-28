import { Link } from 'react-router-dom';
import { Mountain, Heart, Shield, Camera, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const values = [
  {
    icon: <Mountain size={24} />,
    titleEn: 'Adventure First',
    titleAm: 'ጀብዱ ቅድሚያ',
    descEn: 'We curate experiences that push boundaries and create lasting memories in Ethiopia\'s wildest places.',
    descAm: 'ወሰን የሚሻሩ ልምዶችን እናዘጋጃለን።',
  },
  {
    icon: <Heart size={24} />,
    titleEn: 'Community Focused',
    titleAm: 'ማህበረሰብ ተኮር',
    descEn: 'We work with local guides, communities, and businesses to ensure tourism benefits Ethiopia.',
    descAm: 'ቱሪዝም ኢትዮጵያን እንዲጠቅም ከአካባቢ ማህበረሰቦች ጋር እንሰራለን።',
  },
  {
    icon: <Shield size={24} />,
    titleEn: 'Safety Always',
    titleAm: 'ደህንነት ሁልጊዜ',
    descEn: 'Every trip is planned with safety as the top priority. Our guides are trained and certified.',
    descAm: 'ደህንነት ቅድሚያ ሰጥተን ሁሉንም ጉዞ እናቅዳለን።',
  },
  {
    icon: <Camera size={24} />,
    titleEn: 'Memories Included',
    titleAm: 'ትዝታዎች ይካተታሉ',
    descEn: 'Professional photography is included in every trip so you can live in the moment.',
    descAm: 'ፕሮፌሽናል ፎቶ በሁሉም ጉዞ ይካተታል።',
  },
];

const team = [
  {
    name: 'Savanna Team',
    role: 'Tour Guides & Organizers',
    roleAm: 'አስጎብኚዎች እና አዘጋጆች',
    img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80',
  },
];

export default function About() {
  const { language } = useBooking();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
            alt="About"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-savanna-gold text-sm font-medium tracking-widest uppercase mb-3">
            {language === 'en' ? 'Our Story' : 'ታሪካችን'}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white text-white-static mb-6">
            {language === 'en' ? 'About SAVANNA' : 'ስለ SAVANNA'}
          </h1>
          <p className="text-savanna-cream/80 text-base sm:text-lg leading-relaxed italic">
            "From Peaks To Valley" — {language === 'en'
              ? 'We believe every Ethiopian deserves to explore their own country\'s breathtaking beauty.'
              : 'እያንዳንዱ ኢትዮጵያዊ የሀገሩን ውበት ማሰስ ይገባዋል ብለን እናምናለን።'}
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="section-title mb-6">
              {language === 'en' ? 'Who We Are' : 'እነማን ነን'}
            </h2>
            <div className="space-y-4 text-savanna-cream/70 leading-relaxed">
              <p>
                {language === 'en'
                  ? 'SAVANNA Ethiopia Travel was born from a simple belief: Ethiopia is one of the most extraordinary countries on Earth, and more people should experience it.'
                  : 'SAVANNA Ethiopia Travel ከቀላል እምነት ተወለደ፡ ኢትዮጵያ በምድር ላይ ካሉ ድንቅ ሀገሮች አንዷ ናት።'}
              </p>
              <p>
                {language === 'en'
                  ? 'From the volcanic crater lakes of Wenchi to the ancient rock churches of Lalibela, from the dramatic peaks of the Simien Mountains to the colorful tribes of the Omo Valley — we take you there.'
                  : 'ከወንጪ ክሬተር ሀይቆች እስከ ላሊበላ ውቅር አብያተ ክርስቲያናት፣ ከስሜን ተራሮች እስከ ኦሞ ሸለቆ — እናደርሳዎታለን።'}
              </p>
              <p>
                {language === 'en'
                  ? 'We organize group trips that are affordable, safe, and unforgettable. Every package includes transportation, meals, accommodation, a professional guide, and photography — so you can focus on the experience.'
                  : 'ተመጣጣኝ ዋጋ ያላቸው፣ ደህንነቱ የተጠበቀ እና የማይረሳ የቡድን ጉዞዎችን እናዘጋጃለን።'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80"
              alt="Mountains"
              loading="lazy"
              className="rounded-xl sm:rounded-2xl h-36 sm:h-48 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
              alt="Lake"
              loading="lazy"
              className="rounded-xl sm:rounded-2xl h-36 sm:h-48 w-full object-cover mt-3 sm:mt-6"
            />
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80"
              alt="Culture"
              loading="lazy"
              className="rounded-xl sm:rounded-2xl h-36 sm:h-48 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"
              alt="Camping"
              loading="lazy"
              className="rounded-xl sm:rounded-2xl h-36 sm:h-48 w-full object-cover mt-3 sm:mt-6"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-savanna-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="section-title text-2xl sm:text-4xl">
              {language === 'en' ? 'What We Stand For' : 'ምን እናምናለን'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-[#1E2A3A] rounded-2xl p-6 hover:border-savanna-gold/40 transition-all shadow-card">
                <div className="text-savanna-gold mb-4">{v.icon}</div>
                <h3 className="text-savanna-gold font-semibold text-lg mb-2">
                  {language === 'en' ? v.titleEn : v.titleAm}
                </h3>
                <p className="text-savanna-cream/60 text-sm leading-relaxed">
                  {language === 'en' ? v.descEn : v.descAm}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="section-title mb-4">
          {language === 'en' ? 'Ready to Explore Ethiopia?' : 'ኢትዮጵያን ለማሰስ ዝግጁ ነዎት?'}
        </h2>
        <p className="text-savanna-cream/60 mb-8 max-w-xl mx-auto">
          {language === 'en'
            ? 'Join our next trip and discover why thousands of travelers trust SAVANNA.'
            : 'ቀጣዩ ጉዞ ይቀላቀሉ።'}
        </p>
        <Link to="/trips" className="btn-primary text-base px-8 py-4">
          {language === 'en' ? 'Browse Trips' : 'ጉዞዎችን ይመልከቱ'}
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
