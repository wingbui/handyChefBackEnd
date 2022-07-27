const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    billingAddress: {
      address: { type: String },
      phone: { type: Number },
    },
    bookingDate: { type: Date },
    chefService: { type: mongoose.Schema.ObjectId, ref: 'ChefService' },
    customer: { type: mongoose.Schema.ObjectId, ref: 'User' },
    notes: { type: String },
    numberOfCustomers: { type: Number },
    selectedDishes: [
      {
        dish: { type: mongoose.Schema.ObjectId, reference: 'Dish ' },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ['todo', 'cancelled', 'done'],
      default: 'todo',
    },
    totalPrice: { type: Number },
    shippingAddress: {
      address: { type: String },
      phone: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);
