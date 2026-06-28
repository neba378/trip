const Subscriber = require('../models/Subscriber');

// Public: add an email to the mailing list. Idempotent — re-subscribing or an
// already-known email returns 200 rather than an error.
exports.subscribe = async (req, res) => {
  try {
    const email = (req.body.email || '').toLowerCase().trim();
    const source = req.body.source || 'footer';

    const [subscriber, created] = await Subscriber.findOrCreate({
      where: { email },
      defaults: { email, source, isActive: true }
    });

    if (!created && !subscriber.isActive) {
      subscriber.isActive = true;
      await subscriber.save();
    }

    res.status(200).json({
      success: true,
      message: created ? 'Subscribed successfully' : 'You are already subscribed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.listSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByPk(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: 'Not found' });
    await subscriber.destroy();
    res.status(200).json({ success: true, message: 'Removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
