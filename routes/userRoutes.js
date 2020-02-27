const router = require('express').Router()
const UserController = require('../controllers/UserController')


router.get('/signUp', UserController.signUpForm)
router.post('/signUp', UserController.signUp)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)



module.exports = router