const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, requireRole } = require('../middleware/auth');

// Public — white-label config consumed by the frontend at load.
router.get('/', getSettings);

// Admin only — edit branding / contacts / payment / currency rate.
router.put('/', protect, requireRole('admin'), updateSettings);

module.exports = router;
