const express = require('express');
const router = express.Router();
const {
  createMessage,
  listMessages,
  updateMessage,
  deleteMessage
} = require('../controllers/contactController');
const { protect, requireRole } = require('../middleware/auth');

// Public — submit a contact-form message.
router.post('/', createMessage);

// Admin only — read / moderate / delete messages.
router.get('/', protect, requireRole('admin'), listMessages);
router.patch('/:id', protect, requireRole('admin'), updateMessage);
router.delete('/:id', protect, requireRole('admin'), deleteMessage);

module.exports = router;
