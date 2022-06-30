const express = require('express');
const router = express.Router();
const {
  postNewBookingNotification,
} = require('../controllers/notificationController');
const { authenticateUser } = require('../middleware/auth');

router.route('/').post(authenticateUser, postNewBookingNotification);

module.exports = router;
