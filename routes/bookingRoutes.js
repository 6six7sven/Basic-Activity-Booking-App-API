const express = require('express');
const { bookActivity, getMyBookings, unbookActivity } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, bookActivity);
router.get('/my', protect, getMyBookings);
router.delete('/:bookingId', protect, unbookActivity); // New endpoint for unbooking

module.exports = router;