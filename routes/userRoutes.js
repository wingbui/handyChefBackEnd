const express = require('express');
const router = express.Router();
const {
  toggleAddRemoveFavoriteChef,
  persistPushNotificationToken,
  testPush,
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

router.route('/testPush').get(testPush);
module.exports = router;
