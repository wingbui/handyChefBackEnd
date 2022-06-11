const mongoose = require('mongoose');

const ChefServiceSchema = new mongoose.Schema({
  chef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  location: {
    type: String,
    required: true,
    default: 'Vancouver, British Columbia, Canada',
  },
  cuisine: [{ type: String, required: true }],
  profileImage: {
    type: String,
  },
  description: {
    type: String,
  },
  minServed: {
    type: Number,
    required: true,
  },
  maxServed: {
    type: Number,
    required: true,
  },
  currentBookings: [{ type: mongoose.Schema.ObjectId, ref: 'Booking' }],
  menu: [{ type: mongoose.Schema.ObjectId, ref: 'Dish' }],
});

module.exports = mongoose.model('ChefService', ChefServiceSchema);
