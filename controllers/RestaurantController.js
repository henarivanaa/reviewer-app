const { User, Restaurant, RestaurantUser } = require('../models')

class RestaurantController {
    static findAll(req, res) {
        Restaurant.findAll({ order: [['rating', 'DESC']] })
            .then(restaurant => {
                res.render('restaurant-list', { restaurants:restaurant })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static reviewList (req, res) {
        let id = req.params.id
        let role = req.session.user.role
        Restaurant.findByPk(id, { include: [ User ] })
            .then(restaurant => {
                restaurant.Users.sort((a,b) => b.RestaurantUser.review_rating - a.RestaurantUser.review_rating)
                res.render('review-list', { data: restaurant.Users, restaurantId: id , restaurantName:restaurant.name, role})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addReviewForm (req, res) {
        let id = req.params.id
        res.render('addReviewForm', { id })
    }

    static addReviewAndRating(req, res) {
        let id = req.params.id
        let { review_desc, rating } = req.body
        let tempRating
        Restaurant.findByPk(id, { include: [ User ] })
            .then(restaurant => {
                if (restaurant.rating === 0) {
                    tempRating = Number(rating)
                } else {
                    tempRating = restaurant.rating * restaurant.Users.length
                    tempRating += Number(rating)
                    tempRating /= restaurant.Users.length + 1
                }
                console.log(restaurant.rating, rating, tempRating, restaurant.Users.length)
                let newRating = {
                    rating: tempRating
                }
                return Restaurant.update(newRating, { where: { id } })
            })
            .then(() => {
                let newReview = {
                    review_rating: 0,
                    review_desc,
                    restaurantId: id,
                    userId: req.session.user.id
                }
                return RestaurantUser.create(newReview)
            })
            .then(() => {
                res.redirect(`/restaurants/${id}/review`)
            })
            .catch(err => {
                res.send(err)
            })

    }

    static upvote (req, res) {
        let restaurantId = req.params.restaurantId
        let userId = req.params.userId
        RestaurantUser.findOne({
            where: {
                restaurantId,
                userId
            }
        })
            .then(data => {
                let newRating = data.review_rating + 1
                let optionWhere = {
                    restaurantId: restaurantId,
                    userId: userId
                }
                return RestaurantUser.update({ review_rating: newRating }, { where: optionWhere })
            })
            .then(() => {
                res.redirect(`/restaurants/${restaurantId}/review`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static remove (req, res) {
        if (req.session.user.role !== 'admin level') {
            res.redirect('/users/login')
        }
        let restaurantId = req.params.restaurantId
        let userId = req.params.userId

        RestaurantUser.destroy({
            where: {
                restaurantId,
                userId
            }
        })
            .then(() => {
                res.redirect(`/restaurants/${restaurantId}/review`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = RestaurantController