const { User, Restaurant } = require('../models')
const { hasher, bcrypt, comparer } = require('../helpers/bcrypt')

class UserController {
    static loginForm (req, res) {
        res.render('loginForm')
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
        User.findOne({
            where: {
                username: username
            }
        })
            .then(user => {
                if (!user) {
                    res.send('Username Salah')
                }
                return comparer(password, user.password)
            })
            .then(authorized => {
                if (authorized) {
                    res.redirect('/')
                } else {
                    res.send('Password Salah')
                }
            })
    }
}

module.exports = UserController