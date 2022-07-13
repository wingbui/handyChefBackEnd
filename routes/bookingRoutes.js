const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllCustomerBookings,
  getCustomerBooking,
  getChefBooking,
  getAllChefBookings,
} = require('../controllers/bookingController');

const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/')
  .post(authenticateUser, restrictedTo('customer'), createBooking);

router
  .route('/customer')
  .get(authenticateUser, restrictedTo('customer'), getAllCustomerBookings);

router
  .route('/chef')
  .get(authenticateUser, restrictedTo('chef'), getAllChefBookings);

router
  .route('/chef/:id')
  .get(authenticateUser, restrictedTo('chef'), getChefBooking);

router
  .route('/customer/:id')
  .get(authenticateUser, restrictedTo('customer'), getCustomerBooking);

module.exports = router;
