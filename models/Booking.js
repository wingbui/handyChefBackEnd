const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  address: { type: String, required: true },
  bookingDate: { type: Date },
  chefService: { type: mongoose.Schema.ObjectId, ref: 'ChefService' },
  customer: { type: mongoose.Schema.ObjectId, ref: 'User' },
  notes: { type: String },
  numberOfCustomers: { type: Number },
  selectedDishes: [{ type: mongoose.Schema.ObjectId, reference: 'Dish ' }],
  status: {
    type: String,
    enum: ['todo', 'cancelled', 'done'],
    default: 'todo',
  },
  totalPrice: { type: Number },
});

module.exports = mongoose.model('Booking', BookingSchema);
