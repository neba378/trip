const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Verifies the Bearer token, loads the live user record, and attaches it to
 * req.user. Loading from the DB (instead of trusting the token payload alone)
 * means a deactivated or deleted admin is rejected immediately, even if their
 * token has not yet expired.
 */
async function protect(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is no longer active.' });
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

/**
 * Route guard that enforces the user's role. Must run after protect().
 * Usage: router.get('/', protect, requireRole('admin'), handler)
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: insufficient permissions.' });
    }
    next();
  };
}

module.exports = { protect, requireRole };
