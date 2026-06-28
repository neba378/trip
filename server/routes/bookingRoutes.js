const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createBooking, getBookingByEmail, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, requireRole } = require('../middleware/auth');
const { validateBooking, validateStatusUpdate } = require('../middleware/validate');

// Absolute uploads dir (server/uploads) — matches the static mount in index.js
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer Config — store payment receipts, images only, capped size.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WEBP, GIF) are allowed.'));
    }
  }
});

// Surface multer errors (size/type) as clean 400s instead of a 500.
const uploadReceipt = (req, res, next) => {
  upload.single('receipt')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// Public — anyone can submit a booking with a payment screenshot.
router.post('/', uploadReceipt, validateBooking, createBooking);
router.get('/lookup', getBookingByEmail);

// Protected — admin only.
router.get('/', protect, requireRole('admin'), getAllBookings);
router.patch('/:id', protect, requireRole('admin'), validateStatusUpdate, updateBookingStatus);

module.exports = router;
