const express = require('express');
const router = express.Router();

const { authenticateUser, restrictedTo } = require('../middleware/auth');
const {
  postDish,
  getAllDishes,
  getRecommendedDishes,
} = require('../controllers/dishController');

router
  .route('/')
  .post(authenticateUser, restrictedTo('chef'), postDish)
  .get(authenticateUser, getAllDishes);

router
  .route('/getRecommendedDishes')
  .get(authenticateUser, restrictedTo('customer'), getRecommendedDishes);

module.exports = router;
