const express = require('express');
const router = express.Router();
const {
  postNewBookingNotification,
  getNotifications,
} = require('../controllers/notificationController');
const { authenticateUser } = require('../middleware/auth');

router
  .route('/')
  .post(authenticateUser, postNewBookingNotification)
  .get(authenticateUser, getNotifications);

module.exports = router;
