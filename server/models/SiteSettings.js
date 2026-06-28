const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Single-row (id=1) white-label configuration: branding, contacts, payments,
// socials, and the currency rate. Served publicly at GET /api/settings and
// edited by admins. This is what makes the product re-skinnable per agency.
const SiteSettings = sequelize.define('SiteSettings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: 1
  },
  brandName: { type: DataTypes.STRING, defaultValue: 'SAVANNA' },
  brandNameAm: { type: DataTypes.STRING, defaultValue: 'ሳቫና' },
  tagline: { type: DataTypes.STRING, defaultValue: 'Ethiopia Travel' },
  taglineAm: { type: DataTypes.STRING, defaultValue: 'የኢትዮጵያ ጉዞ' },
  logoUrl: { type: DataTypes.STRING, allowNull: true },
  // Theme colors as hex strings; applied at runtime as CSS variables.
  colors: {
    type: DataTypes.JSON,
    defaultValue: {
      cream: '#FAF7F0',
      paper: '#FFFFFF',
      ink: '#1C1917',
      muted: '#78716C',
      gold: '#C68E2A',
      goldSoft: '#F4E9D2',
      green: '#2F4A39',
      line: '#E8E2D8'
    }
  },
  contactPhones: {
    type: DataTypes.JSON, // [{ label, number }]
    defaultValue: [
      { label: 'Main Line', number: '+251 944 780 840' },
      { label: 'Bookings', number: '+251 904 149 468' },
      { label: 'Support', number: '+251 909 930 093' }
    ]
  },
  email: { type: DataTypes.STRING, defaultValue: 'info@savannaethiopiatravel.com' },
  address: { type: DataTypes.STRING, defaultValue: 'Addis Ababa, Ethiopia' },
  addressAm: { type: DataTypes.STRING, defaultValue: 'አዲስ አበባ, ኢትዮጵያ' },
  socials: {
    type: DataTypes.JSON,
    defaultValue: {
      telegram: 'https://t.me/savannaethiopiatravel',
      instagram: 'https://instagram.com/savannaethiopiatravel',
      facebook: '',
      youtube: '',
      tiktok: ''
    }
  },
  payment: {
    type: DataTypes.JSON,
    defaultValue: {
      accountName: 'Savanna Travel',
      telebirr: '0944 780 840',
      cbe: '1000524300657',
      abyssinia: '67531167'
    }
  },
  whatsappNumber: { type: DataTypes.STRING, defaultValue: '+251944780840' },
  telegramUrl: { type: DataTypes.STRING, defaultValue: 'https://t.me/savannaethiopiatravel' },
  businessHours: {
    type: DataTypes.JSON,
    defaultValue: [
      { label: 'Mon – Fri', value: '8:00 AM – 8:00 PM' },
      { label: 'Saturday', value: '9:00 AM – 6:00 PM' },
      { label: 'Sunday', value: '10:00 AM – 4:00 PM' }
    ]
  },
  // ETB per 1 USD — drives the customer-facing currency toggle.
  currencyRate: { type: DataTypes.FLOAT, defaultValue: 150 }
}, {
  timestamps: true
});

module.exports = SiteSettings;
