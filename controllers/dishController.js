const mongoose = require('mongoose')
const Dish = require('../models/Dish')

const postDish = async (req, res, next) => {
  const { name, price } = req.body

  if (name && !price) {
    throw new Error(`Please provide a price of the ${name}`)
  } else if (!name) {
    throw new Error(`Please provide atleast 1 dish`)
  } else if (name && price) {
    const dish = new Dish({
      name: name,
      price: price,
    })
    Dish.save().then((result) => {
      res.send({
        data: blog,
        message: 'Entry Successfully added !',
      })
    })
  }
}

const getDishes = (req, res, next) => {
  Dish.find({})
    .exec()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.error(err))
}

modules.exports = { postDish, getDishes }
