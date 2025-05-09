const express = require('express');
const { getActivities, createActivity } = require('../controllers/activityController');

const router = express.Router();

router.get('/', getActivities);
router.post('/', createActivity); // This could be protected with admin middleware later

module.exports = router;