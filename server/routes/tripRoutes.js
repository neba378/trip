const express = require('express');
const router = express.Router();
const { 
  getAllTrips, 
  getTripBySlug, 
  createTrip, 
  updateTrip, 
  deleteTrip 
} = require('../controllers/tripController');
const { protect, requireRole } = require('../middleware/auth');

// Public routes
router.get('/', getAllTrips);
router.get('/:slug', getTripBySlug);

// Protected routes (Admin only)
router.post('/', protect, requireRole('admin'), createTrip);
router.patch('/:id', protect, requireRole('admin'), updateTrip);
router.delete('/:id', protect, requireRole('admin'), deleteTrip);

module.exports = router;
