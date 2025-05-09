const Joi = require('joi');

const activitySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  dateTime: Joi.date().iso().required()
});

module.exports = {
  activitySchema
};