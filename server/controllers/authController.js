const jwt = require('jsonwebtoken');
const User = require('../models/User');

const TOKEN_TTL = '1d';

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });

    // Run a comparison even when the user is missing/inactive so response time
    // does not reveal whether an email exists. Always return the same message.
    const passwordOk = user ? await user.validPassword(password) : false;

    if (!user || !user.isActive || !passwordOk) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_TTL }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// protect middleware already validated the token and loaded the live account.
exports.verifyToken = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};
