const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getAllBookingsForChef,
  getCustomerBooking,
  getChefBooking,
} = require('../controllers/bookingController');

const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/')
  .post(authenticateUser, restrictedTo('customer'), createBooking)
  .get(authenticateUser, restrictedTo('customer'), getAllBookings);

router
  .route('/chef')
  .get(authenticateUser, restrictedTo('chef'), getAllBookingsForChef);

router
  .route('/chef/:id')
  .get(authenticateUser, restrictedTo('chef'), getChefBooking);

router
  .route('/customer/:id')
  .get(authenticateUser, restrictedTo('customer'), getCustomerBooking);

module.exports = router;
