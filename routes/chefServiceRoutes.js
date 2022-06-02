const express = require('express');
const router = express.Router();
const { postChefService } = require('../controllers/chefServiceController.js');
const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/postChefService')
  .post(authenticateUser, restrictedTo('chef'), postChefService);

module.exports = router;
