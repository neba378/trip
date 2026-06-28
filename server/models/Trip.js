const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Trip = sequelize.define('Trip', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titleAm: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locationAm: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'soldout', 'completed'),
    defaultValue: 'upcoming'
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dateEn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateAm: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departureLocationEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  departureLocationAm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  departureTimeEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  departureTimeAm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  priceETB: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  priceUSD: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  priceForeignerUSD: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  discounts: {
    type: DataTypes.JSON, // [{ label, labelAm, percent }]
    defaultValue: []
  },
  spotsTotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  spotsLeft: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descriptionEn: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descriptionAm: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  images: {
    type: DataTypes.JSON, // SQLite handles JSON as string
    defaultValue: []
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  includesEn: {
    type: DataTypes.JSON, // [{ icon, text }]
    defaultValue: []
  },
  includesAm: {
    type: DataTypes.JSON, // [{ icon, text }]
    defaultValue: []
  },
  excludesEn: {
    type: DataTypes.JSON, // [{ icon, text }]
    defaultValue: []
  },
  excludesAm: {
    type: DataTypes.JSON, // [{ icon, text }]
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  timestamps: true
});

module.exports = Trip;
