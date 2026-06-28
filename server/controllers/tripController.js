const Trip = require('../models/Trip');
const slugify = require('slugify');

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTripBySlug = async (req, res) => {
  try {
    const trip = await Trip.findOne({ where: { slug: req.params.slug } });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const tripData = req.body;
    if (!tripData.slug) {
      tripData.slug = slugify(tripData.title, { lower: true });
    }
    const trip = await Trip.create(tripData);
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    
    await trip.update(req.body);
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    
    await trip.destroy();
    res.status(200).json({ success: true, message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
