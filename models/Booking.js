const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  billingAddress: {
    address: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  bookingDate: { type: Date },
  chefService: { type: mongoose.Schema.ObjectId, ref: 'ChefService' },
  customer: { type: mongoose.Schema.ObjectId, ref: 'User' },
  notes: { type: String },
  numberOfCustomers: { type: Number },
  selectedDishes: [
    {
      type: mongoose.Schema.ObjectId,
      reference: 'Dish ',
      quantity: { type: Number, default: 1, required: true },
    },
  ],
  status: {
    type: String,
    enum: ['todo', 'cancelled', 'done'],
    default: 'todo',
  },
  totalPrice: { type: Number },
  timestamps: true,
  shippingAddress: {
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    totalPrice: { type: Number },
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
