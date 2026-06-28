const Joi = require('joi');

const bookingSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  travelers: Joi.number().min(1).required(),
  tripId: Joi.number().required(),
  tripTitle: Joi.string().required(),
  tripDate: Joi.string().required(),
  totalPrice: Joi.number().required(),
  specialRequests: Joi.string().allow('', null)
});

exports.validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'rejected').required()
});

exports.validateStatusUpdate = (req, res, next) => {
  const { error } = statusUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};
