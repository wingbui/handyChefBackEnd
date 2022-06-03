const express = require('express')
const router = express.Router()
const {
  postChefService,
  getChefService,
} = require('../controllers/chefServiceController.js')
const { authenticateUser, restrictedTo } = require('../middleware/auth')

router
  .route('/postChefService')
  .post(authenticateUser, restrictedTo('chef'), postChefService)

router.route('/:id').get(authenticateUser, getChefService)

module.exports = router
