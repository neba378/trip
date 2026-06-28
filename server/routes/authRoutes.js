const express = require('express');
const router = express.Router();
const { login, verifyToken } = require('../controllers/authController');
const { listUsers, createUser, deactivateUser, reactivateUser } = require('../controllers/userController');
const { protect, requireRole } = require('../middleware/auth');

// Public
router.post('/login', login);

// Authenticated
router.get('/verify', protect, verifyToken);

// Admin account management (any active admin may manage admins)
router.get('/users', protect, requireRole('admin'), listUsers);
router.post('/users', protect, requireRole('admin'), createUser);
router.patch('/users/:id/deactivate', protect, requireRole('admin'), deactivateUser);
router.patch('/users/:id/reactivate', protect, requireRole('admin'), reactivateUser);

module.exports = router;
