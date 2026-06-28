const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Newsletter / mailing-list subscribers (from the footer signup).
const Subscriber = sequelize.define('Subscriber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  source: {
    type: DataTypes.STRING,
    defaultValue: 'footer'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Subscriber;
