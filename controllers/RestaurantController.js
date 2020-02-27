const { User, Restaurant } = require('../models')

class RestaurantController {
    static findAll(req, res) {
        Restaurant.findAll()
            .then(restaurant => {
                res.render('restaurant-list', { restaurants:restaurant })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static reviewList (req, res) {
        let id = req.params.id
        Restaurant.findByPk(id, { include: [ User ] })
            .then(restaurant => {
                res.send(restaurant.Users)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = RestaurantController