const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, requireRole } = require('../middleware/auth');

// Admin-only image upload (trip cover + gallery photos). Accepts up to 10
// images under the field name "images" and returns their public URLs.
// Surfaces multer errors (size/type) as clean 400s instead of a 500.
router.post('/image', protect, requireRole('admin'), (req, res) => {
  upload.array('images', 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files received.' });
    }
    const urls = req.files.map((f) => `/uploads/${f.filename}`);
    res.status(201).json({ success: true, urls });
  });
});

module.exports = router;
