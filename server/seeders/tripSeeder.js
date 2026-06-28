/*
 * Trip seeder — single source of truth for trip content.
 *
 * Run directly to (re)build the trips table:
 *   node server/seeders/tripSeeder.js
 *
 * It calls sequelize.sync({ force: true }) which DROPS & recreates ALL tables
 * (SQLite sync() cannot add new columns to an existing table). In dev this also
 * clears admins/bookings — seedFirstAdmin() recreates the admin on next server
 * start. For a non-destructive column add, boot the server once with
 * sequelize.sync({ alter: true }) instead, then revert.
 *
 * The rich source data below is the canonical trip catalog. The old static
 * src/data/trips.js is now reference-only and is no longer imported at runtime.
 */
const sequelize = require('../config/db');
const Trip = require('../models/Trip');
require('../models/SiteSettings');
const Review = require('../models/Review');
const Subscriber = require('../models/Subscriber');
const ContactMessage = require('../models/ContactMessage');
const Faq = require('../models/Faq');
const Booking = require('../models/Booking');

const richTrips = [
  {
    slug: 'wenchi-crater-lake-camping',
    title: 'Camping to Wenchi Crater Lake',
    titleAm: 'የካምፒንግ ጉዞ ወደ ወንጪ',
    destination: 'Wenchi Crater Lake', destinationAm: 'ወንጪ',
    region: 'Oromia', type: 'camping', status: 'upcoming', featured: true,
    dates: { displayEn: 'Saturday & Sunday | May 2–3', displayAm: 'ቅዳሜ እና እሁድ | ሚያዝያ 24-25' },
    departure: { location: 'Mexico Square, Addis Ababa', locationAm: 'ሜክሲኮ', time: '06:00 AM', timeAm: '12:00' },
    pricing: { regular: 9999, foreigner: 99.99, discounts: [
      { label: 'Group 4+', labelAm: '1ኛ ቡድን 4+', percent: 10 },
      { label: 'Students', labelAm: 'ተማሪዎች', percent: 10 },
    ] },
    spotsTotal: 30, spotsLeft: 14,
    includes: [
      { icon: '🚐', en: 'Transportation', am: 'ትራንስፖርት' },
      { icon: '🍽️', en: 'Breakfast & Lunch (2 days)', am: 'ምሳ እና ቁርስ' },
      { icon: '🎫', en: 'Entrance Fee', am: 'መግቢያ ትኬት' },
      { icon: '🧭', en: 'Guide', am: 'አስጎብኚ' },
      { icon: '📸', en: 'Photography', am: 'ፎቶ' },
      { icon: '⛺️', en: 'Accommodation', am: 'ማደሪያ' },
      { icon: '🐐', en: 'Barbeque Dinner', am: 'ባርቤኪው እራት' },
      { icon: '🌊', en: 'Natural Hot Spring Mud Bath', am: 'የተፈጥሮ ፍሉ ውሀ ጭቃ ባዝ' },
      { icon: '♨️', en: 'Bathing in Natural Hot Spring', am: 'በተፈጥሮ ፍሉ ውሀ መታጠብ' },
      { icon: '🏊', en: 'Swimming', am: 'የዎና ቆይታ' },
    ],
    excludes: [
      { icon: '⛵️', en: 'Boat Trip', am: 'የጀልባ ጉዞ' },
      { icon: '🐎', en: 'Horse Riding', am: 'ፈረስ ግልብያ' },
    ],
    description: "Wenchi Crater Lake is one of Ethiopia's most breathtaking natural wonders — a volcanic crater filled with a stunning lake, hot springs, and lush forest. Experience natural hot spring mud baths, swimming, and camping under the stars.",
    descriptionAm: 'ወንጪ ክሬተር ሀይቅ ከኢትዮጵያ በጣም አስደናቂ ከሆኑ የተፈጥሮ ድንቆች አንዱ ነው። የተፈጥሮ ፍሉ ውሀ ጭቃ ባዝ፣ መዋኘት እና በኮከቦች ስር ካምፒንግ ያድርጉ።',
    images: ['/trips/wenchi/cover.jpg', '/trips/wenchi/wenchi-trip-image-2.jpg', '/trips/wenchi/info.jpg'],
    coverImage: '/trips/wenchi/cover.jpg', video: '/trips/wenchi/video.mp4',
    tags: ['camping', 'crater lake', 'hot spring', 'hiking', 'nature'],
  },
  {
    slug: 'wenchi-day-trip',
    title: 'Day Trip to Wenchi', titleAm: 'ጉዞ ወደ ወንጪ',
    destination: 'Wenchi Crater Lake', destinationAm: 'ወንጪ',
    region: 'Oromia', type: 'hiking', status: 'upcoming', featured: false,
    dates: { displayEn: 'April 25–26', displayAm: 'ሚያዝያ 17-18' },
    departure: { location: 'Mexico Square, Addis Ababa', locationAm: 'ሜክሲኮ', time: '06:00 AM', timeAm: '12:00' },
    pricing: { regular: 3999, foreigner: 50, discounts: [
      { label: 'Group 3+', labelAm: 'ቡድን 3+', percent: 10 },
      { label: 'Students', labelAm: 'ተማሪዎች', percent: 10 },
    ] },
    spotsTotal: 40, spotsLeft: 28,
    includes: [
      { icon: '🚐', en: 'Transportation', am: 'ትራንስፖርት' },
      { icon: '☕️', en: 'Breakfast & Lunch with Coffee', am: 'ምሳ እና ቁርስ ከ ሻይ,ቡና ጋር' },
      { icon: '🎫', en: 'Park Entrance Fee', am: 'መግቢያ ትኬት' },
      { icon: '👣', en: 'Guide Fee', am: 'አስጎብኚ' },
      { icon: '📸', en: 'Photography', am: 'ፎቶ' },
    ],
    excludes: [{ icon: '🐎', en: 'Horse Riding', am: 'ፈረስ ግልብያ' }],
    description: 'A perfect day trip to Wenchi Crater Lake. Enjoy refreshing swimming, relaxing hot spring bathing, exciting boat rides, amazing lakeside views, and horse riding. Capture the fun and more!',
    descriptionAm: 'ወደ ወንጪ ክሬተር ሀይቅ ፍጹም የቀን ጉዞ። መዋኘት፣ የፍሉ ውሀ መታጠብ፣ የጀልባ ጉዞ፣ የሀይቁ ዳር እይታ እና የፈረስ ግልብያ ያድርጉ።',
    images: ['/trips/wenchi/cover.jpg', '/trips/wenchi/wenchi-trip-image-2.jpg'],
    coverImage: '/trips/wenchi/cover.jpg', video: null,
    tags: ['day trip', 'crater lake', 'hot spring', 'boat ride', 'swimming'],
  },
  {
    slug: 'langano-camping',
    title: 'Camping Trip to Langano', titleAm: 'የአዳር ጉዞ ወደ ላንጋኖ',
    destination: 'Lake Langano', destinationAm: 'ላንጋኖ',
    region: 'Oromia', type: 'camping', status: 'upcoming', featured: true,
    dates: { displayEn: 'April 18–19', displayAm: 'ሚያዝያ 10-11' },
    departure: { location: 'Mexico Wabi Shebele Hotel', locationAm: 'ሜክሲኮ ዋቢ ሸበሌ ሆቴል', time: '06:00 AM', timeAm: '12:00' },
    pricing: { regular: 9999, foreigner: 99.99, discounts: [
      { label: 'Group 3+', labelAm: '1ኛ ቡድን 3+', percent: 10 },
      { label: 'Students', labelAm: 'ተማሪዎች', percent: 10 },
    ] },
    spotsTotal: 35, spotsLeft: 22,
    includes: [
      { icon: '🚌', en: 'Tourist Standard Transportation', am: 'ትራንስፖርት ቱሪስት ስታንዳርድ' },
      { icon: '🍱', en: '2 Days Full Meal', am: 'የ2ቀን ምግብ ወጪ' },
      { icon: '🍽️', en: 'Barbecue Dinner', am: 'ባርቤኪው እራት' },
      { icon: '🔥', en: 'Campfire Night', am: 'የካምፕ ፋየር ምሽት' },
      { icon: '💧', en: 'Bottled Water', am: 'የታሸገ ውሃ' },
      { icon: '⛺️', en: 'Tent for One Night', am: 'ድንኳን ለአንድ ምሽት' },
      { icon: '🧾', en: 'Park & Sites Entrance Fee', am: 'የፓርክ የመግቢያ ዋጋ' },
      { icon: '🚶', en: 'Guide Fee', am: 'የአስጎብኚ' },
      { icon: '📸', en: 'Photography', am: 'የፎቶግራፍ' },
      { icon: '🏐', en: 'Fun Games and Moments', am: 'የተለያዩ ጌሞችና' },
    ],
    excludes: [],
    description: '1 night and 2 days camping adventure at Lake Langano. Visit Abijatta Shalla National Park, Shalla Lake, Langano, and Zeway. Enjoy swimming, campfire nights, barbecue dinner, and fun games.',
    descriptionAm: 'አንድ ምሽት እና 2 ቀናት የካምፒንግ ጀብዱ በላንጋኖ ሀይቅ። አቢጃታ ሻላ ብሔራዊ ፓርክ፣ ሻላ ሀይቅ፣ ላንጋኖ እና ዝዋይ ይጎብኙ።',
    images: ['/trips/langano/cover.jpg', '/trips/langano/info.jpg', '/trips/langano/pricing.jpg'],
    coverImage: '/trips/langano/cover.jpg', video: '/trips/langano/video.mp4',
    tags: ['camping', 'lake', 'swimming', 'national park', 'campfire'],
  },
  {
    slug: 'doho-lodge-camping',
    title: 'Camping to Doho Lodge & Awash National Park', titleAm: 'ጉዞ ወደ ዶሆ ሎጅ,ቤይኑና ቪሌጅ',
    destination: 'Doho Lodge, Beynuna Village', destinationAm: 'ዶሆ ሎጅ,ቤይኑና ቪሌጅ',
    region: 'Afar', type: 'camping', status: 'upcoming', featured: false,
    dates: { displayEn: 'April 25–26', displayAm: 'ሚያዝያ 17-18' },
    departure: { location: 'Mexico Wabi Shebele Hotel', locationAm: 'ሜክሲኮ ዋቢ ሸበሌ ሆቴል', time: '06:00 AM', timeAm: '12:00' },
    pricing: { regular: 9999, foreigner: 99.99, discounts: [
      { label: 'Group 4+', labelAm: 'ቡድን 4+', percent: 10 },
      { label: 'Students', labelAm: 'ተማሪዎች', percent: 10 },
    ] },
    spotsTotal: 25, spotsLeft: 18,
    includes: [
      { icon: '🚌', en: 'Tourist Standard Transportation', am: 'ትራንስፖርት ቱሪስት ስታንዳርድ' },
      { icon: '🍱', en: '2 Days Full Meal', am: 'የ2ቀን ምግብ ወጪ' },
      { icon: '🍽️', en: 'Barbecue Dinner', am: 'ባርቤኪው እራት' },
      { icon: '🔥', en: 'Campfire Night', am: 'የካምፕ ፋየር ምሽት' },
      { icon: '💧', en: 'Bottled Water', am: 'የታሸገ ውሃ' },
      { icon: '⛺️', en: 'Room/Tent for One Night', am: 'አልጋ/ድንኳን ለአንድ ምሽት' },
      { icon: '🧾', en: 'Park & Sites Entrance Fee', am: 'የፓርክ የመግቢያ ዋጋ' },
      { icon: '🚶', en: 'Guide Fee', am: 'የአስጎብኚ' },
      { icon: '📸', en: 'Photography', am: 'የፎቶግራፍ' },
      { icon: '🏐', en: 'Fun Games and Moments', am: 'የተለያዩ ጌሞችና' },
    ],
    excludes: [],
    description: "1 night and 2 days camping at Doho Lodge, Beynuna Village, and Awash National Park. Experience nature, wildlife, and adventure in one of Ethiopia's most scenic locations.",
    descriptionAm: 'አንድ ምሽት እና 2 ቀናት ካምፒንግ በዶሆ ሎጅ፣ ቤይኑና ቪሌጅ እና አዋሽ ብሔራዊ ፓርክ። ተፈጥሮን፣ የዱር እንስሳትን እና ጀብዱን ይለማመዱ።',
    images: ['/trips/doho/cover.jpg', '/trips/doho/info.jpg'],
    coverImage: '/trips/doho/cover.jpg', video: null,
    tags: ['camping', 'nature', 'lodge', 'national park', 'wildlife'],
  },
  {
    slug: 'hawassa-wendo-genet',
    title: 'Trip to Hawassa & Wendo Genet', titleAm: 'ጉዞ ወደ ሐዋሳ እና ወንዶ ገነት',
    destination: 'Hawassa & Wendo Genet', destinationAm: 'ሐዋሳ እና ወንዶ ገነት',
    region: 'Sidama', type: 'cultural', status: 'upcoming', featured: true,
    dates: { displayEn: 'April 18–19', displayAm: 'ሚያዝያ 10-11' },
    departure: { location: 'Mexico Wabi Shebele Hotel', locationAm: 'ሜክሲኮ ዋቢ ሸበሌ', time: '06:00 AM', timeAm: '12:00' },
    pricing: { regular: 10999, foreigner: 99.9, discounts: [
      { label: 'Group 3+', labelAm: 'ቡድን 3+', percent: 10 },
      { label: 'Students', labelAm: 'ተማሪዎች', percent: 10 },
    ] },
    spotsTotal: 30, spotsLeft: 12,
    includes: [
      { icon: '🚌', en: 'Transport', am: 'ትራንስፖርት' },
      { icon: '🍽️', en: 'Full Meal', am: 'ሙሉ ምግብ' },
      { icon: '⛺️', en: 'Mid-range Room Accommodation', am: 'መካከለኛ ደረጃ ክፍል' },
      { icon: '🔥', en: 'Campfire', am: 'የካምፕ እሳት' },
      { icon: '🧍', en: 'Guide Fee', am: 'የአስጎብኚ' },
      { icon: '🏷️', en: 'Entrance Fee', am: 'የመግቢያ ዋጋ' },
      { icon: '🦆', en: 'Amora Gedel Fee', am: 'አሞራ ገደል ዋጋ' },
      { icon: '☕️', en: 'Coffee Time', am: 'የቡና ሰዓት' },
      { icon: '🛶', en: 'Boat Trip', am: 'የጀልባ ጉዞ' },
      { icon: '📸', en: 'Photography', am: 'ፎቶ' },
    ],
    excludes: [],
    description: '1 night and 2 days trip to Hawassa & Wendo Genet. Activities include swimming, fireside games, small hiking, sunset views, boat trip experience, dance nights, and more. A trip you will never forget!',
    descriptionAm: 'አንድ ምሽት እና 2 ቀናት ጉዞ ወደ ሐዋሳ እና ወንዶ ገነት። መዋኘት፣ የእሳት ጎን ጨዋታዎች፣ ትንሽ ጉዞ፣ የፀሐይ መጥለቅ እይታ፣ የጀልባ ጉዞ፣ የዳንስ ምሽቶች እና ሌሎችም።',
    images: ['/trips/hawassa/cover.jpg', '/trips/hawassa/info.jpg'],
    coverImage: '/trips/hawassa/cover.jpg', video: null,
    tags: ['cultural', 'hot spring', 'lake', 'boat trip', 'swimming', 'hiking'],
  },
  {
    slug: 'suba-national-park',
    title: 'Suba National Park & Mount Damocha', titleAm: 'ሱባ ብሔራዊ ፓርክ እና ዳሞቻ ተራራ',
    destination: 'Suba National Park', destinationAm: 'ሱባ ብሔራዊ ፓርክ',
    region: 'Oromia', type: 'trekking', status: 'upcoming', featured: false,
    dates: { displayEn: 'May 23–25', displayAm: 'ግንቦት 15-17' },
    departure: { location: 'Mexico Square, Addis Ababa', locationAm: 'ሜክሲኮ', time: '05:00 AM', timeAm: '11:00' },
    pricing: { regular: 13999, foreigner: 139.99, discounts: [
      { label: 'Group 4+', labelAm: 'ቡድን 4+', percent: 10 },
      { label: 'Students', labelAm: 'ተማሪዎች', percent: 10 },
    ] },
    spotsTotal: 20, spotsLeft: 20,
    includes: [
      { icon: '🚐', en: 'Transportation', am: 'ትራንስፖርት' },
      { icon: '⛺️', en: 'Camping Equipment', am: 'የካምፒንግ መሳሪያ' },
      { icon: '🍽️', en: 'All Meals', am: 'ሁሉም ምግቦች' },
      { icon: '🎫', en: 'Park Entrance Fee', am: 'የፓርክ መግቢያ' },
      { icon: '🧭', en: 'Expert Trek Guide', am: 'ባለሙያ አስጎብኚ' },
      { icon: '📸', en: 'Photography', am: 'ፎቶ' },
      { icon: '🦅', en: 'Wildlife Viewing', am: 'የዱር እንስሳት ማየት' },
    ],
    excludes: [],
    description: "Trek through Suba National Park and climb Mount Damocha for breathtaking views. Experience Ethiopia's diverse wildlife and stunning mountain landscapes.",
    descriptionAm: 'በሱባ ብሔራዊ ፓርክ ውስጥ ይጓዙ እና ዳሞቻ ተራራን ይውጡ። የኢትዮጵያን የተለያዩ የዱር እንስሳት ያዩ።',
    images: ['/trips/suba/cover.jpg', '/trips/suba/info.jpg'],
    coverImage: '/trips/suba/cover.jpg', video: null,
    tags: ['trekking', 'national park', 'wildlife', 'mountains', 'adventure'],
  },
];

// Flatten the rich source into the Trip table shape.
const mapTrip = (t) => ({
  slug: t.slug,
  title: t.title,
  titleAm: t.titleAm,
  location: t.destination,
  locationAm: t.destinationAm,
  category: t.type,
  region: t.region,
  type: t.type,
  status: t.status,
  featured: t.featured,
  dateEn: t.dates.displayEn,
  dateAm: t.dates.displayAm,
  departureLocationEn: t.departure.location,
  departureLocationAm: t.departure.locationAm,
  departureTimeEn: t.departure.time,
  departureTimeAm: t.departure.timeAm,
  priceETB: t.pricing.regular,
  priceUSD: Math.round(t.pricing.foreigner),
  priceForeignerUSD: t.pricing.foreigner,
  discounts: t.pricing.discounts || [],
  spotsTotal: t.spotsTotal,
  spotsLeft: t.spotsLeft,
  descriptionEn: t.description,
  descriptionAm: t.descriptionAm,
  images: t.images,
  coverImage: t.coverImage,
  video: t.video || null,
  includesEn: t.includes.map((i) => ({ icon: i.icon, text: i.en })),
  includesAm: t.includes.map((i) => ({ icon: i.icon, text: i.am })),
  excludesEn: t.excludes.map((i) => ({ icon: i.icon, text: i.en })),
  excludesAm: t.excludes.map((i) => ({ icon: i.icon, text: i.am })),
  tags: t.tags,
});

// ---------------------------------------------------------------------------
// Dummy data for the remaining tables, so the whole app (public pages + admin
// dashboard charts) can be exercised end-to-end. Delete or trim freely.
// ---------------------------------------------------------------------------

const faqs = [
  {
    questionEn: 'Do I need a visa to travel to Ethiopia?',
    questionAm: 'ወደ ኢትዮጵያ ለመጓዝ ቪዛ ያስፈልገኛል?',
    answerEn: 'Most nationalities can get an e-visa online or a visa on arrival at Bole International Airport. Domestic travelers within Ethiopia need no visa.',
    answerAm: 'አብዛኞቹ ዜጎች በመስመር ላይ ኢ-ቪዛ ማግኘት ወይም በቦሌ ኢንተርናሽናል አውሮፕላን ማረፊያ ቪዛ ማግኘት ይችላሉ።',
    order: 1, isActive: true,
  },
  {
    questionEn: 'What should I bring on a camping trip?',
    questionAm: 'በካምፒንግ ጉዞ ምን ማምጣት አለብኝ?',
    answerEn: 'Comfortable hiking shoes, warm layers for the night, a refillable water bottle, sunscreen, and a sense of adventure. Tents and meals are provided.',
    answerAm: 'ምቹ የእግር ጫማ፣ ለሌሊቱ ሞቅ ያለ ልብስ፣ የውሃ ጠርሙስ እና የፀሐይ መከላከያ ይዘው ይምጡ። ድንኳንና ምግብ በእኛ ይቀርባል።',
    order: 2, isActive: true,
  },
  {
    questionEn: 'How do I pay for my booking?',
    questionAm: 'ለቦታ ማስያዣ እንዴት እከፍላለሁ?',
    answerEn: 'After booking, you upload a payment screenshot (Telebirr, CBE, or Bank of Abyssinia). An admin confirms it and you receive a confirmation code.',
    answerAm: 'ካስያዙ በኋላ የክፍያ ስክሪንሾት (ቴሌብር፣ ሲቢኢ ወይም አቢሲኒያ ባንክ) ይጭናሉ። አስተዳዳሪ ካረጋገጠ በኋላ የማረጋገጫ ኮድ ይደርስዎታል።',
    order: 3, isActive: true,
  },
  {
    questionEn: 'Can I get a refund if I cancel?',
    questionAm: 'ከሰረዝኩ ገንዘቤ ይመለሳል?',
    answerEn: 'Cancellations made 7+ days before departure are eligible for a full refund minus processing fees. Later cancellations are reviewed case by case.',
    answerAm: 'ከመነሻ ቀን 7 ቀናት በፊት የተደረጉ ስረዛዎች ሙሉ ተመላሽ ይደረጋሉ። ዘግይተው የተደረጉ በተናጠል ይታያሉ።',
    order: 4, isActive: true,
  },
  {
    questionEn: 'Are the trips suitable for children?',
    questionAm: 'ጉዞዎቹ ለልጆች ተስማሚ ናቸው?',
    answerEn: 'Day trips and most camping trips are family-friendly. Trekking expeditions like Suba & Mount Damocha are recommended for ages 12 and up.',
    answerAm: 'የቀን ጉዞዎችና አብዛኞቹ የካምፒንግ ጉዞዎች ለቤተሰብ ተስማሚ ናቸው። እንደ ሱባ ያሉ የትሬኪንግ ጉዞዎች ከ12 ዓመት በላይ ይመከራሉ።',
    order: 5, isActive: true,
  },
  {
    questionEn: 'Is travel insurance included?',
    questionAm: 'የጉዞ መድን ይካተታል?',
    answerEn: 'Travel insurance is not included. We strongly recommend arranging your own coverage, especially for trekking trips.',
    answerAm: 'የጉዞ መድን አይካተትም። የራስዎን መድን እንዲያዘጋጁ አበክረን እንመክራለን።',
    order: 6, isActive: false, // one inactive FAQ to test the active/all filter
  },
];

const subscribers = [
  { email: 'abebe.kebede@gmail.com', source: 'footer', isActive: true },
  { email: 'sara.tesfaye@yahoo.com', source: 'footer', isActive: true },
  { email: 'daniel.bekele@outlook.com', source: 'contact', isActive: true },
  { email: 'hanna.girma@gmail.com', source: 'footer', isActive: false },
  { email: 'yonas.haile@gmail.com', source: 'footer', isActive: true },
];

const contactMessages = [
  {
    name: 'Meron Alemu', phone: '+251911223344', email: 'meron@example.com',
    message: 'Is the Wenchi camping trip still available for the May dates? We are a group of 5.',
    status: 'new',
  },
  {
    name: 'John Smith', phone: null, email: 'john.smith@example.com',
    message: 'Hi, I am a foreigner visiting Addis in June. Do you offer private guided tours?',
    status: 'read',
  },
  {
    name: 'Selamawit T.', phone: '+251922334455', email: null,
    message: 'Can you confirm whether vegetarian meals are available on the Langano trip?',
    status: 'read',
  },
  {
    name: 'Robel Tadesse', phone: '+251933445566', email: 'robel@example.com',
    message: 'Thanks for the amazing Hawassa trip last month! How do I leave a review?',
    status: 'archived',
  },
];

// Reviews + bookings reference trips by their (1-based) auto-increment id.
// Built from the created Trip rows so ids/titles always line up.
const buildReviews = (trips) => {
  const bySlug = Object.fromEntries(trips.map((t) => [t.slug, t]));
  const rows = [
    { slug: 'wenchi-crater-lake-camping', name: 'Abebe K.', rating: 5, comment: 'Absolutely unforgettable! The hot springs and camping under the stars were magical. Our guide was fantastic.', status: 'approved' },
    { slug: 'wenchi-crater-lake-camping', name: 'Sara T.', rating: 4, comment: 'Beautiful scenery and well organized. The road in is a bit rough but worth it.', status: 'approved' },
    { slug: 'wenchi-crater-lake-camping', name: 'Tourist from Germany', rating: 5, comment: 'Best weekend of my Ethiopia trip. Highly recommend for adventurous travelers.', email: 'visitor@example.com', language: 'en', status: 'pending' },
    { slug: 'langano-camping', name: 'Daniel B.', rating: 5, comment: 'The campfire night and barbecue were the highlight. Great value for money.', status: 'approved' },
    { slug: 'langano-camping', name: 'Hanna G.', rating: 4, comment: 'Lovely lake and friendly team. Would have liked more time at Abijatta.', status: 'approved' },
    { slug: 'hawassa-wendo-genet', name: 'Yonas H.', rating: 5, comment: 'Wendo Genet hot springs were so relaxing. The boat trip on Lake Hawassa was beautiful.', status: 'approved' },
    { slug: 'hawassa-wendo-genet', name: 'Marta L.', rating: 3, comment: 'Good trip overall but the schedule felt a little rushed.', status: 'approved' },
    { slug: 'wenchi-day-trip', name: 'Kebede M.', rating: 4, comment: 'Perfect quick getaway from Addis. Horse riding was fun.', status: 'pending' },
    { slug: 'doho-lodge-camping', name: 'Frehiwot A.', rating: 5, comment: 'Awash National Park wildlife was incredible. Doho Lodge hot spring pool is a must.', status: 'approved' },
  ];
  return rows
    .filter((r) => bySlug[r.slug])
    .map((r) => ({
      tripId: bySlug[r.slug].id,
      name: r.name,
      rating: r.rating,
      comment: r.comment,
      language: r.language || 'en',
      email: r.email || null,
      status: r.status,
    }));
};

const buildBookings = (trips) => {
  const bySlug = Object.fromEntries(trips.map((t) => [t.slug, t]));
  const rows = [
    { slug: 'wenchi-crater-lake-camping', firstName: 'Abebe', lastName: 'Kebede', travelers: 2, status: 'confirmed' },
    { slug: 'wenchi-crater-lake-camping', firstName: 'Sara', lastName: 'Tesfaye', travelers: 1, status: 'confirmed' },
    { slug: 'wenchi-crater-lake-camping', firstName: 'Mulu', lastName: 'Assefa', travelers: 4, status: 'pending' },
    { slug: 'langano-camping', firstName: 'Daniel', lastName: 'Bekele', travelers: 2, status: 'confirmed' },
    { slug: 'langano-camping', firstName: 'Hanna', lastName: 'Girma', travelers: 3, status: 'pending' },
    { slug: 'langano-camping', firstName: 'Tom', lastName: 'Anderson', travelers: 2, status: 'rejected' },
    { slug: 'hawassa-wendo-genet', firstName: 'Yonas', lastName: 'Haile', travelers: 2, status: 'confirmed' },
    { slug: 'hawassa-wendo-genet', firstName: 'Marta', lastName: 'Lemma', travelers: 1, status: 'confirmed' },
    { slug: 'wenchi-day-trip', firstName: 'Kebede', lastName: 'Mengistu', travelers: 5, status: 'confirmed' },
    { slug: 'wenchi-day-trip', firstName: 'Bethel', lastName: 'Solomon', travelers: 2, status: 'pending' },
    { slug: 'doho-lodge-camping', firstName: 'Frehiwot', lastName: 'Alemu', travelers: 2, status: 'confirmed' },
    { slug: 'suba-national-park', firstName: 'Nahom', lastName: 'Tadesse', travelers: 1, status: 'pending' },
  ];
  return rows
    .filter((r) => bySlug[r.slug])
    .map((r, i) => {
      const trip = bySlug[r.slug];
      return {
        firstName: r.firstName,
        lastName: r.lastName,
        email: `${r.firstName.toLowerCase()}.${r.lastName.toLowerCase()}@example.com`,
        phone: `+2519${String(11000000 + i * 137771).slice(0, 8)}`,
        travelers: r.travelers,
        tripId: trip.id,
        tripTitle: trip.title,
        tripDate: trip.dateEn,
        totalPrice: trip.priceETB * r.travelers,
        confirmationCode: `SAV-${String(1001 + i)}`,
        status: r.status,
        receiptUrl: null,
        specialRequests: i % 3 === 0 ? 'Vegetarian meals please.' : null,
      };
    });
};

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    const trips = await Trip.bulkCreate(richTrips.map(mapTrip));
    const reviews = await Review.bulkCreate(buildReviews(trips));
    const bookings = await Booking.bulkCreate(buildBookings(trips));
    await Faq.bulkCreate(faqs);
    await Subscriber.bulkCreate(subscribers);
    await ContactMessage.bulkCreate(contactMessages);

    console.log('Database seeded successfully:');
    console.log(`  • ${trips.length} trips`);
    console.log(`  • ${reviews.length} reviews (${reviews.filter((r) => r.status === 'approved').length} approved)`);
    console.log(`  • ${bookings.length} bookings`);
    console.log(`  • ${faqs.length} FAQs`);
    console.log(`  • ${subscribers.length} subscribers`);
    console.log(`  • ${contactMessages.length} contact messages`);
    console.log('Restart the server (npm run dev) to (re)create the admin login.');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
