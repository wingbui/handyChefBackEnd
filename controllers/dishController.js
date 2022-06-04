const Dish = require('../models/Dish');

const postDish = async (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    next(new Error(`Please provide name and price`));
    return;
  }

  if (!req.user?.chefService) {
    next(new Error(`You don't have the chef Service yet`));
    return;
  }

  const chefService = req.user.chefService;
  try {
    const dish = await Dish.create({
      name,
      price,
      chefService,
    });
    res.status(201).json({ dish });
  } catch (err) {
    next(err);
  }
};

const getAllDishes = async (req, res, next) => {
  if (!req.user?.chefService) {
    next(new Error(`You don't have the chef Service yet`));
    return;
  }
  const chefService = req.user.chefService;
  try {
    const dishes = await Dish.find({ chefService });
    res.status(200).json({ dishes });
  } catch (err) {
    next(err);
  }
};

module.exports = { postDish, getAllDishes };
