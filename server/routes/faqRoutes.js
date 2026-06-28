const express = require('express');
const router = express.Router();
const {
  getFaqs,
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} = require('../controllers/faqController');
const { protect, requireRole } = require('../middleware/auth');

// Public — active FAQs in display order.
router.get('/', getFaqs);

// Admin only — full list (any status) and management.
router.get('/all', protect, requireRole('admin'), getAllFaqs);
router.post('/', protect, requireRole('admin'), createFaq);
router.patch('/:id', protect, requireRole('admin'), updateFaq);
router.delete('/:id', protect, requireRole('admin'), deleteFaq);

module.exports = router;
