const express = require('express');
const router = express.Router();

const { authenticateUser, restrictedTo } = require('../middleware/auth');
const {
  postDish,
  getAllDishes,
  getRecommendedDishes,
  getDish,
  editDish,
} = require('../controllers/dishController');

router
  .route('/')
  .post(authenticateUser, restrictedTo('chef'), postDish)
  .get(authenticateUser, getAllDishes);

router
  .route('/getRecommendedDishes')
  .get(authenticateUser, restrictedTo('customer'), getRecommendedDishes);

router.route('/:id').get(authenticateUser, getDish);

router
  .route('/editDish/:id')
  .get(authenticateUser, restrictedTo('chef'), editDish);

module.exports = router;
