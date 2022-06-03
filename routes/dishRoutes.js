const router = express.Router()
const { authenticateUser, restrictedTo } = require('../middleware/auth')
const { postDish, getdishes } = require('../controllers/dishController')

router.use('/postDish').post(authenticateUser, restrictedTo('chef'), postDish)
router.use('/getAllDishes/:id').get(authenticateUser, getdishes)

module.exports = router
