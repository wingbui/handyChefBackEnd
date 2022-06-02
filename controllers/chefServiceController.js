const ChefService = require('../models/ChefService');

const postChefService = async (req, res, next) => {
  const {
    cuisine,
    profileImage,
    description,
    minServed,
    maxServed,
    currentBookings,
  } = req.body;

  if ((!cuisine.length > 0, !minServed, !maxServed)) {
    throw new Error(
      'Please provide cuisine, minimum and maximum customer you served'
    );
  }

  req.body.chef = req.user._id;
  try {
    const chefService = await ChefService.create(req.body);
    res.status(201).json(chefService);
  } catch (err) {
    next(err);
    return;
  }
};

const getChefService = async (req, res, next) => {};

const getAllChefServices = async (req, res, next) => {};

const patchChefService = async (req, res, next) => {};

module.exports = {
  postChefService,
  getChefService,
  getAllChefServices,
  patchChefService,
};
