const { Expo } = require('expo-server-sdk');

const User = require('../models/User.js');

const toggleAddRemoveFavoriteChef = async (req, res, next) => {
  const { chefService } = req.body;
  if (!chefService) {
    next(new Error('Please pass in a chef service ObjectId'));
    return;
  }

  try {
    let currentUser = await User.findById(req.user._id);

    if (
      currentUser.favoriteChefs.length &&
      currentUser.favoriteChefs.length > 0
    ) {
      if (currentUser.favoriteChefs.find((item) => item.equals(chefService))) {
        currentUser.favoriteChefs = currentUser.favoriteChefs.filter(
          (item) => !item.equals(chefService)
        );
        await currentUser.save();
        res.json({ user: currentUser });
      } else {
        currentUser.favoriteChefs.push(chefService);
        await currentUser.save();
        res.json({ user: currentUser });
      }
    } else {
      currentUser.favoriteChefs.push(chefService);
      await currentUser.save();
      res.json({ user: currentUser });
    }
  } catch (err) {
    next(err);
  }
};

const persistPushNotificationToken = async (req, res, next) => {
  const { pushNotificationToken } = req.body;
  if (!pushNotificationToken) {
    next(new Error('Please pass in the push notification token'));
    return;
  }

  try {
    let currentUser = await User.findById(req.user._id);
    currentUser.pushNotificationToken = pushNotificationToken;

    await currentUser.save();
    res.json({ user: currentUser });
  } catch (err) {
    next(err);
  }
};

const addPreferredCuisine = async (req, res, next) => {
  const { preferredCuisine } = req.body;
  if (!preferredCuisine) {
    next(new Error('Please pass in the preferred cuisine array'));
    return;
  }

  try {
    let currentUser = await User.findById(req.user._id);

    currentUser.preferredCuisine.push(...preferredCuisine);
    currentUser.preferredCuisine = [...new Set(currentUser.preferredCuisine)];
    await currentUser.save();
    res.json({ user: currentUser });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    let currentUser = await User.findById(req.user._id)
      .populate({
        path: 'favoriteChefs',
        model: 'ChefService',
        populate: {
          path: 'chef',
          model: 'User',
          select: '-favoriteChefs -preferredCuisine -chefService',
        },
      })
      .populate({
        path: 'chefService',
        model: 'ChefService',
      });
    res.json({ currentUser });
  } catch (error) {
    next(error);
  }
};

const persistCustomerAddress = async (req, res, next) => {
  const { billingAddress, shippingAddress } = req.body;
  if (!billingAddress || !shippingAddress) {
    next(new Error('Please pass in the address'));
    return;
  }

  try {
    let currentUser = await User.findById(req.user._id);
    currentUser.billingAddress = billingAddress;
    currentUser.shippingAddress = shippingAddress;
    currentUser.save();
    res.json({ user: currentUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleAddRemoveFavoriteChef,
  persistPushNotificationToken,
  addPreferredCuisine,
  getCurrentUser,
  persistCustomerAddress,
};
