const router = require('express').Router()
const UserController = require('../controllers/UserController')


router.get('/signUp', UserController.signUpForm)
router.post('/signUp', UserController.signUp)
router.get('/login', UserController.loginForm)


router.use('/login', (req, res, next) => {
    let { username, password } = req.body
    req.session.user = {
        username,
        password
    }
    console.log('masuk')
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.post('/login', UserController.login)
router.get('/all')
router.get('/best')
router.get('/dumb')

module.exports = router