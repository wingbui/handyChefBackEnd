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
    console.log(err);
    next(err);
  }
};

const testPush = (req, res, next) => {
  // Create a new Expo SDK client
  // optionally providing an access token if you have enabled push security
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

  // Create the messages that you want to send to clients
  let messages = [];
  let pushToken = 'ExponentPushToken[lgU7WQBROXjXE70dNmvSEx]';

  // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
  messages.push({
    to: pushToken,
    sound: 'default',
    body: 'This is a test notification',
    data: { withSome: 'data' },
  });
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        res.json({ status: 'done' });
      } catch (error) {
        console.error(error);
      }
    }
  })();
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
  console.log(preferredCuisine);
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
    let currentUser = await User.findById(req.user._id).populate({
      path: 'favoriteChefs',
      model: 'ChefService',
    });
    res.json({ currentUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleAddRemoveFavoriteChef,
  persistPushNotificationToken,
  addPreferredCuisine,
  getCurrentUser,
};
