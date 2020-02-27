const router = require('express').Router()
const userRoutes = require('./userRoutes')

router.get('/', (req, res) => res.render('home'))
router.use('/users', userRoutes)


module.exports = router