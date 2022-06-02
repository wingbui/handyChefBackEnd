const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'ChefService' },
  dishes: [
    {
      totalNoOFDishes: [{ type: String, price: Number }],
    },
  ],
})

module.exports = mongoose.model('Dish', dishSchema)
