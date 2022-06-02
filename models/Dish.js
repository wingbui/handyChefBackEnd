const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },

  price: {
    type: 'Number',
    required: true,
  },

  chefService: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChefService',
  },
})

module.exports = mongoose.model('Dish', DishSchema)
