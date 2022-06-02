const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const {
  postChefService,
  getChefService,
  getChefServiceChefSide,
} = require('../controllers/chefServiceController.js');
const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/postChefService')
  .post(authenticateUser, restrictedTo('chef'), postChefService);

router
  .route('/getChefServiceChefSide')
  .get(authenticateUser, getChefServiceChefSide);

router
  .route('/:id')
  .get(authenticateUser, restrictedTo('customer'), getChefService);

module.exports = router;
