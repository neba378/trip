const User = require('../models/User');

/**
 * Bootstraps the first admin account.
 *
 * If the users table is empty, creates one admin from ADMIN_EMAIL / ADMIN_PASSWORD.
 * Once any admin exists, this is a no-op — further accounts are created from the
 * Admin panel (Manage Admins) so credentials never live in source or env long-term.
 */
async function seedFirstAdmin() {
  const count = await User.count();
  if (count > 0) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      '[seed] No users exist and ADMIN_EMAIL / ADMIN_PASSWORD are not set. ' +
      'Set them in server/.env to bootstrap the first admin, then restart.'
    );
    return;
  }

  const admin = User.build({ name: 'Administrator', email, role: 'admin' });
  await admin.setPassword(password);
  await admin.save();

  console.log(`[seed] First admin created: ${email} (change this password after first login).`);
}

module.exports = seedFirstAdmin;
