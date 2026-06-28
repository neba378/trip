const { fn, col } = require('sequelize');
const Review = require('../models/Review');

// Returns a map { [tripId]: { ratingAvg, ratingCount } } for approved reviews.
// Used by tripController to attach aggregate ratings to trips.
async function getRatingsMap(tripIds) {
  const where = { status: 'approved' };
  if (Array.isArray(tripIds) && tripIds.length) where.tripId = tripIds;

  const rows = await Review.findAll({
    where,
    attributes: ['tripId', [fn('AVG', col('rating')), 'avg'], [fn('COUNT', col('id')), 'count']],
    group: ['tripId'],
    raw: true
  });

  const map = {};
  for (const r of rows) {
    map[r.tripId] = {
      ratingAvg: Math.round(Number(r.avg) * 10) / 10,
      ratingCount: Number(r.count)
    };
  }
  return map;
}

// Public: submit a review (lands as pending until an admin approves).
exports.createReview = async (req, res) => {
  try {
    const { tripId, name, rating, comment, language, email } = req.body;
    const review = await Review.create({
      tripId, name, rating, comment,
      language: language || 'en',
      email: email || null,
      status: 'pending'
    });
    res.status(201).json({ success: true, data: { id: review.id, status: review.status } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Public: approved reviews for a trip only (no email exposed).
exports.getApprovedForTrip = async (req, res) => {
  try {
    const { tripId } = req.query;
    if (!tripId) {
      return res.status(400).json({ success: false, message: 'tripId is required' });
    }
    const reviews = await Review.findAll({
      where: { tripId, status: 'approved' },
      attributes: ['id', 'tripId', 'name', 'rating', 'comment', 'language', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    const map = await getRatingsMap([tripId]);
    res.status(200).json({
      success: true,
      data: reviews,
      summary: map[tripId] || { ratingAvg: 0, ratingCount: 0 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Admin: all reviews, any status.
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Admin: moderate a review (approve / reject).
exports.updateReview = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    review.status = status;
    await review.save();
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    await review.destroy();
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getRatingsMap = getRatingsMap;
