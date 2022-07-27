const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['newBooking', 'newFavoriteAdded'],
    required: true,
  },
  receivers: [{ type: String, required: true }],
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);
