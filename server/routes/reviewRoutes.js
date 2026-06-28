const express = require('express');
const router = express.Router();
const {
  createReview,
  getApprovedForTrip,
  getAllReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect, requireRole } = require('../middleware/auth');

// Public — submit a review (lands as pending) and read approved reviews for a trip.
router.post('/', createReview);
router.get('/', getApprovedForTrip); // requires ?tripId=

// Admin only — moderate all reviews.
router.get('/all', protect, requireRole('admin'), getAllReviews);
router.patch('/:id', protect, requireRole('admin'), updateReview);
router.delete('/:id', protect, requireRole('admin'), deleteReview);

module.exports = router;
