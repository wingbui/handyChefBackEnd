const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: { type: Number, default: 1, required: true },
  chefService: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChefService',
    required: true,
  },
  cuisine: { type: String, required: true },
  dishImage: { type: String },
  isSpecial: { type: Boolean, default: false },
});

module.exports = mongoose.model('Dish', DishSchema);
