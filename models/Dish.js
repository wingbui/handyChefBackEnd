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
  chefService: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChefService',
    required: true,
  },
  cuisine: {
    type: [{ type: String }],
    validate: {
      validator: (v) => {
        if (v.length < 1) {
          return false;
        } else if (v.includes('')) {
          return false;
        }
      },
      message: 'Please pass in cuisine type for this dish',
    },
  },
});

module.exports = mongoose.model('Dish', DishSchema);
