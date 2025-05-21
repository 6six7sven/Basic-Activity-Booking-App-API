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

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:bookingId
// @access  Private
const unbookActivity = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to remove this booking' });
    }

    // Optional: Check if activity is in the future
    const activity = await Activity.findById(booking.activity);
    const activityDate = new Date(activity.dateTime);
    const currentDate = new Date();
    
    // You may want to enforce a cancellation policy (e.g., can only cancel 24 hours before)
    const cancellationDeadline = new Date(activityDate);
    cancellationDeadline.setHours(cancellationDeadline.getHours() - 24);
    
    if (currentDate > cancellationDeadline) {
      return res.status(400).json({ 
        message: 'Cannot cancel bookings less than 24 hours before the activity' 
      });
    }

    // Use deleteOne() instead of remove()
    await Booking.deleteOne({ _id: booking._id });
    
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Unbooking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookActivity,
  getMyBookings,
  unbookActivity
};