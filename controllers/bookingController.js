const Booking = require('../models/Booking');

const createBooking = async (req, res, next) => {
  const {
    bookingDate,
    chefService,
    numberOfCustomers,
    selectedDishes,
    notes,
    totalPrice,
    address,
    phone,
  } = req.body;

  if (
    !address ||
    !phone ||
    !bookingDate ||
    !chefService ||
    !numberOfCustomers ||
    !selectedDishes ||
    !totalPrice ||
    selectedDishes.length <= 0
  ) {
    next(
      new Error(
        'Please enter all the values:  bookingDate, chefService, numberOfCustomers, selectedDishes, totalPrice, address and phone'
      )
    );
    return;
  } else {
    try {
      const booking = await Booking.create({
        customer: req.user._id,
        address,
        phone,
        bookingDate,
        chefService,
        notes,
        numberOfCustomers,
        selectedDishes,
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

const getAllChefBookings = async (req, res, next) => {
  const { bookingDate } = req.query;

  let queryObj = {};
  if (bookingDate) {
    queryObj.bookingDate = bookingDate;
  }
  if (status) {
    queryObj.status = status;
  }

  queryObj.chefService = req.user.chefService;

  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  try {
    let result = Booking.find(queryObj);

    result = result.skip(skip).limit(limit);

    const bookings = await result;

    const totalBookings = await Booking.countDocuments(queryObj);
    const pages = Math.ceil(totalBookings / limit);
    res.status(200).json({ bookings, totalBookings, pages });
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
  getAllChefBookings,
  getCustomerBooking,
  getChefBooking,
};
