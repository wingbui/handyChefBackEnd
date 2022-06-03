const express = require('express');
const router = express.Router();

const { authenticateUser, restrictedTo } = require('../middleware/auth');
const { postDish, getAllDishes } = require('../controllers/dishController');

router
  .route('/')
  .post(authenticateUser, restrictedTo('chef'), postDish)
  .get(authenticateUser, getAllDishes);

module.exports = router;
