const express = require('express')
const router = express.Router()
const {
  createBooking,
  getAllBookings,
  getAllBookingsForChef,
} = require('../controllers/bookingController')

const { authenticateUser, restrictedTo } = require('../middleware/auth')

router
  .route('/')
  .post(authenticateUser, restrictedTo('customer'), createBooking)
  .get(getAllBookings)

router
  .route('/chef/:id')
  .get(authenticateUser, restrictedTo('chef'), getAllBookingsForChef)

module.exports = router
