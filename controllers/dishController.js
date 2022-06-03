const mongoose = require('mongoose')
const Dish = require('../models/Dish')

const postDish = (req, res, next) => {
  const { name, price } = req.body

  if (name && !price) {
    throw new Error(`Please provide a price of the ${name} added`)
  } else if (!name) {
    throw new Error(`Please provide atleast 1 dish`)
  } else if (name && price) {
    const dish = new Dish({
      name: name,
      price: price,
    })
    Dish.save().then((result) => {
      res.status(201).send({
        data: dish,
        message: 'Entry Successfully added !',
      })
    })
  }
}

const getDishes = (req, res, next) => {
  req.body.chef = req.user._id
  Dish.find({ user: req.user._id })
    .exec()
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => console.error(err))
}

modules.exports = { postDish, getDishes }
