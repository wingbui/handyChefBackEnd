const Notification = require('../models/Notification');
const { Expo } = require('expo-server-sdk');

const sendNewBookingPushNotification = async (receivers, booking) => {
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

  let messages = [];

  for (let pushToken of receivers) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.log(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      body: 'You have a new booking',
      data: { payload: booking },
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  console.log(chunks);

  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        console.log('Notification sent success');
      } catch (error) {
        console.log(error.message);
        return false;
      }
    }
  })();
};

const postNewBookingNotification = async (req, res, next) => {
  const { type, receivers, booking } = req.body;

  if (!type || !receivers || !booking) {
    next(new Error('Please enter type, receivers and booking'));
    return;
  }

  try {
    let notification = await Notification.create(req.body);
    if (notification) {
      await sendNewBookingPushNotification(
        notification.receivers,
        notification.booking
      );
    }
    res.status(201).json(notification);
  } catch (err) {
    next(err);
  }
};

const getNotifications = async (req, res, next) => {
  if (!req.user.pushNotificationToken) {
    next(new Error('You do note have have notification token yet'));
    return;
  }

  let token = req.user.pushNotificationToken;
  try {
    const notifications = await Notification.find({ receivers: token });
    res.status(200).json({ notifications });
  } catch (error) {
    next(error);
  }
};

module.exports = { postNewBookingNotification, getNotifications };
