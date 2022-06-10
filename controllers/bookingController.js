const Booking = require('../models/Booking')

const createBooking = async (req, res, next) => {
  const {
    bookingDate,
    chefService,
    numberOfCustomers,
    selectedDish,
    notes,
    totalPrice,
  } = req.body

  if (
    !bookingDate ||
    !numberOfCustomers ||
    !selectedDish ||
    !totalPrice ||
    !chefService
  ) {
    next(new Error('Please enter the * fields'))
    return
  } else {
    try {
      const booking = await Booking.create({
        customer: req.user._id,
        chefService,
        bookingDate,
        numberOfCustomers,
        selectedDish,
        notes,
        totalPrice,
      })
      res.status(200).json({ booking })
    } catch (err) {
      next(err)
    }
  }
}

const getAllBookings = async (req, res, next) => {
  console.log('here')
  console.log(req.user)
  try {
    const booking = await Booking.find({ customer: req.user._id })
    res.status(200).json({ booking })
  } catch (err) {
    next(err)
  }
}

const getAllBookingsForChef = async (req, res, next) => {
  try {
    const booking = await Booking.find({ chefService: req.user.chefService })
    res.status(200).json({ booking })
  } catch (err) {
    next(err)
  }
}

module.exports = { createBooking, getAllBookings, getAllBookingsForChef }
