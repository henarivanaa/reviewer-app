const router = require('express').Router()
const userRoutes = require('./userRoutes')
const restaurantRoutes = require('./restaurantRoutes')

router.get('/', (req, res) => res.render('home'))
router.use('/users', userRoutes)

const isLoggedIn = (req, res, next) => {
    console.log(req.session)
    if (req.session.user) {
        next()
    } else {
        res.redirect('/users/login')
    }
}

router.use('/restaurants', isLoggedIn, restaurantRoutes)


module.exports = router