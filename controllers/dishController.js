const ChefService = require('../models/ChefService');
const Dish = require('../models/Dish');

const postDish = async (req, res, next) => {
  const { name, price, cuisine, dishImage, isSpecial } = req.body;

  if (!name || !price || !cuisine) {
    next(new Error(`Please provide name, price, and cuisine`));
    return;
  }

  if (isSpecial && !dishImage) {
    next(new Error(`You need image for special dish`));
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
      cuisine,
      chefService,
      dishImage,
      isSpecial,
    });

    if (dish) {
      let modifiedChefService = await ChefService.findOne({ _id: chefService });
      modifiedChefService.menu.push(dish._id);
      await modifiedChefService.save();
    }

    res.status(201).json({ dish });
  } catch (err) {
    next(err);
  }
};

const getDish = async (req, res, next) => {
  const id = req.params.id;

  try {
    const dish = await Dish.findById(id);
    res.status(200).json({ dish });
  } catch (err) {
    next(err);
  }
};

const getAllDishes = async (req, res, next) => {
  let { chefService } = req.query;
  chefService = req.user?.chefService || chefService;

  try {
    const dishes = await Dish.find({ chefService });
    res.status(200).json({ dishes });
  } catch (err) {
    next(err);
  }
};

const getRecommendedDishes = async (req, res, next) => {
  let { preferredCuisine } = req.user;

  try {
    const dishes = await Dish.find({
      cuisine: preferredCuisine,
      isSpecial: 'true',
    }).populate({
      path: 'chefService',
      model: 'ChefService',
      select:
        '-email -userType -favoriteChefs -preferredCuisine -__v -chefService -profileImage -description -minServed -maxServed -currentBookings -menu -cuisine',
      populate: {
        path: 'chef',
        model: 'User',
        select:
          '-email -userType -favoriteChefs -preferredCuisine -__v -chefService -pushNotificationToken',
      },
    });

    res.status(200).json({ dishes });
  } catch (err) {
    next(err);
  }
};

const editDish = async (req, res, next) => {
  const { name, price, cuisine, dishImage, isSpecial } = req.body;
  if (!name || !price || !cuisine) {
    next(new Error(`Please provide name, price, and cuisine`));
    return;
  }

  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, {
      name,
      price,
      cuisine,
      dishImage,
      isSpecial,
    });
    res.status(200).json({ dish: dish });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postDish,
  getDish,
  getAllDishes,
  getRecommendedDishes,
  editDish,
};
