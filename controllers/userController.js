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
    console.log(err);
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

module.exports = { toggleAddRemoveFavoriteChef, persistPushNotificationToken };
