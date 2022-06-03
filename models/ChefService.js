const mongoose = require('mongoose');

const ChefServiceSchema = new mongoose.Schema({
  chef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
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
  currentBookings: [],
});

module.exports = mongoose.model('ChefService', ChefServiceSchema);
