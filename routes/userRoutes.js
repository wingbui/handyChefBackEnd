const express = require('express');
const router = express.Router();
const {
  toggleAddRemoveFavoriteChef,
  persistPushNotificationToken,
  addPreferredCuisine,
  getCurrentUser,
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
  .route('/customer/addPreferredCuisine')
  .patch(authenticateUser, restrictedTo('customer'), addPreferredCuisine);

router
  .route('/persistPushNotificationToken')
  .patch(authenticateUser, persistPushNotificationToken);

router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

module.exports = router;
