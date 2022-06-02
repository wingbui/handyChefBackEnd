const ChefService = require('../models/ChefService');

// chef side
const postChefService = async (req, res, next) => {
  try {
    const chefService = await ChefService.find({ chef: req.user._id });
    if (chefService[0]) {
      throw new Error(
        'You already created one chef service. Not allowed to create more'
      );
    }
  } catch (err) {
    next(err);
    return;
  }

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

const getChefServiceChefSide = async (req, res, next) => {
  try {
    const chefService = await ChefService.find({ chef: req.user._id });
    if (!chefService[0]) {
      throw new Error('you do not have chef service yet');
    } else {
      res.status(200).json({ chefService: chefService[0] });
    }
  } catch (err) {
    next(err);
  }
};

// customer side
const getChefService = async (req, res, next) => {
  const id = req.params.id;

  try {
    const chefService = await ChefService.findById(id);
    res.status(200).json({ chefService });
  } catch (err) {
    next(err);
  }
};

const getAllChefServices = async (req, res, next) => {};

const patchChefService = async (req, res, next) => {};

module.exports = {
  postChefService,
  getChefService,
  getChefServiceChefSide,
  getAllChefServices,
  patchChefService,
};
