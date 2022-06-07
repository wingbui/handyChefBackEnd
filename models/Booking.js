const mongoose = require('mongoose')

const ChefServiceSchema = new mongoose.Schema({
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
  selectedDish: [{ type: mongoose.Schema.ObjectID, reference: 'Dish ' }],
  notes: { type: String },
  totalPrice: { type: Number },
  status: {
    type: String,
    enum: ['todo', 'cancelled', 'done'],
    default: 'todo',
  },
})

module.exports = mongoose.model('ChefService', ChefServiceSchema)
