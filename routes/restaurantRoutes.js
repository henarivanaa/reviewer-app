const router = require('express').Router()
const RestaurantController = require('../controllers/RestaurantController')

router.get('/', RestaurantController.findAll)
router.get('/:id/review', RestaurantController.reviewList)

module.exports = router