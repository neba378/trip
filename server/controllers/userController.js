const User = require('../models/User');

// Never expose passwordHash to the client.
const publicFields = ['id', 'name', 'email', 'role', 'isActive', 'createdAt'];

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: publicFields,
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with that email already exists.' });
    }

    const user = User.build({ name: name.trim(), email: normalizedEmail, role: 'admin' });
    await user.setPassword(password);
    await user.save();

    res.status(201).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role, isActive: user.isActive }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Soft-disable an account (keeps audit trail). Guards against locking everyone out.
exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot deactivate your own account.' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const activeCount = await User.count({ where: { isActive: true } });
    if (user.isActive && activeCount <= 1) {
      return res.status(400).json({ success: false, message: 'Cannot deactivate the last active admin.' });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({ success: true, data: { id: user.id, isActive: user.isActive } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Re-enable a previously disabled account.
exports.reactivateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    user.isActive = true;
    await user.save();
    res.status(200).json({ success: true, data: { id: user.id, isActive: user.isActive } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
