const Activity = require('../models/Activity');
const { activitySchema } = require('../validation/activityValidation');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({}).sort({ dateTime: 1 });
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new activity (admin functionality - could be added later)
// @route   POST /api/activities
// @access  Private/Admin
const createActivity = async (req, res) => {
  try {
    // Validate request body
    const { error } = activitySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, location, dateTime } = req.body;

    const activity = await Activity.create({
      title,
      description,
      location,
      dateTime
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getActivities,
  createActivity
};