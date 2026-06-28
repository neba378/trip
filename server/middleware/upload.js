const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Absolute uploads dir (server/uploads) — must match the static mount in
// index.js (express.static(path.join(__dirname, 'uploads'))). Using an absolute
// path means it works no matter the cwd (e.g. `npm run dev` runs from the repo
// root, where a relative 'uploads/' would not exist and writes would ENOENT).
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Shared image-upload config: stores to server/uploads, images only, 5 MB cap.
// Used by booking receipts and admin trip-image uploads.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files (JPEG, PNG, WEBP, GIF) are allowed.'));
  }
});

module.exports = upload;
