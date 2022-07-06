const ChefService = require('../models/ChefService');
const User = require('../models/User');

// chef side
const postChefService = async (req, res, next) => {
  if (req.user?.chefService) {
    next(
      new Error(
        'You already created one chef service. Not allowed to create more'
      )
    );
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

    if (chefService) {
      let user = await User.findOne({ _id: req.user._id });
      user.chefService = chefService._id;
      await user.save();
    }

    res.status(201).json(chefService);
  } catch (err) {
    next(err);
    return;
  }
};

const getChefService = async (req, res, next) => {
  const id = req.params.id;

  try {
    const chefService = await ChefService.findById(id)
      .populate('menu')
      .populate({ path: 'chef', select: '-preferredCuisine -_id -chefService -favoriteChefs' });
    res.status(200).json({ chefService });
  } catch (err) {
    next(err);
  }
};

const getAllChefServices = async (req, res, next) => {
  const { cuisine, bookingDate, location } = req.query;

  let queryObj = {};
  if (cuisine) {
    queryObj.cuisine = { $in: cuisine };
  }
  if (bookingDate) {
    queryObj.currentBookings[bookingDate] = bookingDate;
  }

  if (location) {
    queryObj.location = { $regex: location, $options: 'i' };
  }

  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  try {
    let result = ChefService.find(queryObj).populate('chef');
    result = result.skip(skip).limit(limit);

    const chefServices = await result;

    const totalChefServices = await ChefService.countDocuments(queryObj);
    const pages = Math.ceil(totalChefServices / limit);

    res.status(200).json({
      chefServices,
      totalChefServices,
      pages: pages,
    });
  } catch (err) {
    next(err);
  }
};

const patchChefService = async (req, res, next) => {};

module.exports = {
  postChefService,
  getChefService,
  getAllChefServices,
  patchChefService,
};
