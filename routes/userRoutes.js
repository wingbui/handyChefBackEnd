const express = require('express');
const router = express.Router();
const {
  toggleAddRemoveFavoriteChef,
} = require('../controllers/userController');
const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/customer/toggleAddRemoveFavoriteChef')
  .patch(
    authenticateUser,
    restrictedTo('customer'),
    toggleAddRemoveFavoriteChef
  );

restrictedTo;
module.exports = router;
