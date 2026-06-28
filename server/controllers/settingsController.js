const SiteSettings = require('../models/SiteSettings');

// Returns the single settings row, creating it with model defaults on first call.
async function getOrCreate() {
  let settings = await SiteSettings.findByPk(1);
  if (!settings) {
    settings = await SiteSettings.create({ id: 1 });
  }
  return settings;
}

exports.getSettings = async (req, res) => {
  try {
    const settings = await getOrCreate();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await getOrCreate();
    // Only allow known columns to be updated; ignore id/timestamps.
    const editable = [
      'brandName', 'brandNameAm', 'tagline', 'taglineAm', 'logoUrl', 'colors',
      'contactPhones', 'email', 'address', 'addressAm', 'socials', 'payment',
      'whatsappNumber', 'telegramUrl', 'businessHours', 'currencyRate'
    ];
    for (const key of editable) {
      if (key in req.body) settings[key] = req.body[key];
    }
    await settings.save();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getOrCreate = getOrCreate;
