const ContactMessage = require('../models/ContactMessage');

// Public: submit a contact-form message.
exports.createMessage = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const msg = await ContactMessage.create({
      name, phone: phone || null, email: email || null, message
    });
    res.status(201).json({ success: true, data: { id: msg.id } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.listMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Not found' });
    msg.status = status;
    await msg.save();
    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Not found' });
    await msg.destroy();
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
