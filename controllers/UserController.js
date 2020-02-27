const { User, Restaurant } = require('../models')
const { hasher, bcrypt, comparer } = require('../helpers/bcrypt')

class UserController {
    static loginForm (req, res) {
        if (!req.session.user) {
            res.render('loginForm')
        } else {
            res.redirect('/restaurants')
        }
    }

    static findAll (req, res) {
        User.findAll()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static signUpForm (req, res) {
        res.render('signUpForm')
    }

    static signUp (req, res) {
        let { first_name, last_name, email, phone_number, username, password } = req.body
        let newUser = {
            first_name,
            last_name,
            email,
            phone_number,
            username,
            password
        }

        User.create(newUser)
            .then(user => {
                res.send('sukses membuat akun')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login (req, res) {
        let { username, password } = req.body
        req.session.user = {
            username,
            password
        }
        let userId
        let userRole
        User.findOne({
            where: {
                username: username
            }
        })
            .then(user => {
                userId = user.id
                userRole = user.role
                if (!user) {
                    res.send('Username Salah')
                }
                return comparer(password, user.password)
            })
            .then(authorized => {
                if (authorized) {
                    req.session.user.id = userId 
                    req.session.user.role = userRole
                    res.redirect('/restaurants')
                } else {
                    res.send('Password Salah')
                }
            })
    }

    static logout (req, res) {
        req.session.destroy(err => {
            res.redirect('/restaurants')
        })
    }
}

module.exports = UserController