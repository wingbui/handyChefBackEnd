const express = require('express');
const router = express.Router();
const {
  toggleAddRemoveFavoriteChef,
  persistPushNotificationToken,
} = require('../controllers/userController');
const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/customer/toggleAddRemoveFavoriteChef')
  .patch(
    authenticateUser,
    restrictedTo('customer'),
    toggleAddRemoveFavoriteChef
  );

router
  .route('/persistPushNotificationToken')
  .patch(authenticateUser, persistPushNotificationToken);

module.exports = router;
