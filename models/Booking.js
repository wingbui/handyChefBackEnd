const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

  chefService: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChefService',
  },

  bookingDate: { type: Date },

  numberOfCustomers: { type: Number },

  selectedDishes: [{ type: mongoose.Schema.ObjectId, reference: 'Dish ' }],

  notes: { type: String },

  totalPrice: { type: Number },

  status: {
    type: String,
    enum: ['todo', 'cancelled', 'done'],
    default: 'todo',
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
