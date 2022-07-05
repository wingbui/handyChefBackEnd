const Booking = require('../models/Booking');
const ChefService = require('../models/ChefService');

const createBooking = async (req, res, next) => {
  const {
    bookingDate,
    chefService,
    numberOfCustomers,
    selectedDishes,
    notes,
    totalPrice,
  } = req.body;

  if (
    !bookingDate ||
    !numberOfCustomers ||
    !selectedDishes ||
    selectedDishes.length <= 0 ||
    !totalPrice ||
    !chefService
  ) {
    next(
      new Error(
        'Please enter all the values:  bookingDate, chefService, numberOfCustomers, selectedDishes, totalPrice'
      )
    );
    return;
  } else {
    try {
      const booking = await Booking.create({
        customer: req.user._id,
        chefService,
        bookingDate,
        numberOfCustomers,
        selectedDishes,
        notes,
        totalPrice,
      });
      res.status(200).json({ booking });
    } catch (err) {
      next(err);
    }
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const booking = await Booking.find({ customer: req.user._id }).populate({
      path: 'selectedDishes',
      model: 'Dish',
    });

    res.status(200).json({ booking });
  } catch (err) {
    next(err);
  }
};

const getAllBookingsForChef = async (req, res, next) => {
  try {
    const booking = await Booking.find({ chefService: req.user.chefService });
    res.status(200).json({ booking });
  } catch (err) {
    next(err);
  }
};

const getCustomerBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findOne({ _id: id, customer: req.user._id });
    res.status(200).json({ booking });
  } catch (err) {
    next(err);
  }
};
const getChefBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findOne({ _id: id, chef: req.user._id });
    res.status(200).json({ booking });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getAllBookingsForChef,
  getCustomerBooking,
  getChefBooking,
};
