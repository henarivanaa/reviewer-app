const router = require('express').Router()
const RestaurantController = require('../controllers/RestaurantController')

router.get('/', RestaurantController.findAll)
router.get('/:id/review', RestaurantController.reviewList)
router.get('/:id/addReview', RestaurantController.addReviewForm)
router.post('/:id/addReview', RestaurantController.addReviewAndRating)
router.get('/:restaurantId/:userId/upvote', RestaurantController.upvote)
router.get('/admin/delete/:restaurantId/:userId', RestaurantController.remove)

module.exports = router