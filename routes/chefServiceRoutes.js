const express = require('express');
const router = express.Router();
const {
  postChefService,
  getChefService,
  getAllChefServices,
} = require('../controllers/chefServiceController.js');
const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/')
  .post(authenticateUser, restrictedTo('chef'), postChefService)
  .get(getAllChefServices)

router.route('/').get(getAllChefServices);
router.route('/:id').get(authenticateUser, getChefService);

module.exports = router;
