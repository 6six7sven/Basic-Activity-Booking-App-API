const Joi = require('joi');

const bookingSchema = Joi.object({
  activityId: Joi.string().required()
});

module.exports = {
  bookingSchema
};