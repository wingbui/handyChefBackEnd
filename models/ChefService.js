const mongoose = require('mongoose');

const ChefServiceSchema = new mongoose.Schema({
  chef: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  cuisine: [{ type: String }],
  profileImage: {
    type: String,
  },
  description: {
    type: String,
  },
  minServed: {
    type: Number,
  },
  maxServed: {
    type: Number,
  },
  currentBookings: [],
});

module.exports = mongoose.model('ChefService', ChefServiceSchema);
