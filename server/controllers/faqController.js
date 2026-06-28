const Faq = require('../models/Faq');

// Public: active FAQs in display order.
exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.findAll({
      where: { isActive: true },
      order: [['order', 'ASC'], ['id', 'ASC']]
    });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Admin: all FAQs (any status).
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.findAll({ order: [['order', 'ASC'], ['id', 'ASC']] });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'Not found' });
    await faq.update(req.body);
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'Not found' });
    await faq.destroy();
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
