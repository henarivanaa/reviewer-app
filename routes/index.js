const router = require('express').Router()
const userRoutes = require('./userRoutes')
const restaurantRoutes = require('./restaurantRoutes')

router.get('/', (req, res) => res.render('home'))
router.use('/users', userRoutes)
router.use('/restaurants', restaurantRoutes)


module.exports = router