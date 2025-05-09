const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const { bookingSchema } = require('../validation/bookingValidation');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Private
const bookActivity = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Headers:', req.headers);
    // Validate request body
    const { error } = bookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { activityId } = req.body;

    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if user already booked this activity
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: activityId
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Activity already booked' });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      activity: activityId
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('activity')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookActivity,
  getMyBookings
};