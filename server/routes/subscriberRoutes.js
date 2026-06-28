const express = require('express');
const router = express.Router();
const {
  subscribe,
  listSubscribers,
  deleteSubscriber
} = require('../controllers/subscriberController');
const { protect, requireRole } = require('../middleware/auth');

// Public — newsletter signup from the footer.
router.post('/', subscribe);

// Admin only — view / remove subscribers.
router.get('/', protect, requireRole('admin'), listSubscribers);
router.delete('/:id', protect, requireRole('admin'), deleteSubscriber);

module.exports = router;
