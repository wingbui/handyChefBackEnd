const express = require('express');
const router = express.Router();
const {
  postChefService,
  getChefService,
  getAllChefServices,
  updateChefService,
} = require('../controllers/chefServiceController.js');
const { authenticateUser, restrictedTo } = require('../middleware/auth');

router
  .route('/')
  .post(authenticateUser, restrictedTo('chef'), postChefService)
  .get(getAllChefServices);

router.route('/').get(getAllChefServices);
router
  .route('/:id')
  .get(authenticateUser, getChefService)
  .patch(authenticateUser, restrictedTo('chef'), updateChefService);

module.exports = router;
