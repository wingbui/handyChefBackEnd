const Booking = require('../models/Booking')

const createBooking = async (req, res, next) => {
  const {
    bookingDate,
    numberOfCustomers,
    selectedDish,
    notes,
    totalPrice,
    status,
  } = req.body

  if (!req.user?.chefService) {
    next(new Error(`You don't have the chef Service yet`))
    return
  }

  req.body.chef = req.user._id

  if (!bookingDate || !numberOfCustomers || !selectedDish || !totalPrice) {
    next(new Error('Please enter the * fields'))
    return
  } else {
    try {
      const booking = await Booking.create({
        customer,
        chefService,
        bookingDate,
        numberOfCustomers,
        selectedDish,
        notes,
        totalPrice,
        status,
      })
      res.status(200).json({ booking })
    } catch (err) {
      next(err)
    }
  }
}

const getAllBookings = async (req, res, next) => {
  try {
    const booking = await Booking.find({ _id: req.user._id })
    res.status(200).json({ booking })
  } catch (err) {
    next(err)
  }
}

const getAllBookingsForChef = async (req, res, next) => {
  let { chefService } = req.query
  chefService = req.user?.chefService || chefService
  try {
    const booking = await Booking.find({ chefService })
    res.status(200).json({ booking })
  } catch (err) {
    next(err)
  }
}

module.exports = { createBooking, getAllBookings, getAllBookingsForChef }
