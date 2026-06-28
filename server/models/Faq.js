const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Frequently asked questions, bilingual, admin-managed and orderable.
const Faq = sequelize.define('Faq', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  questionEn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  questionAm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  answerEn: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  answerAm: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Faq;
