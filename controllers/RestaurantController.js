const { User, Restaurant, RestaurantUser } = require('../models')

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
                // res.send(restaurant.Users)
                res.render('review-list', { data: restaurant.Users, restaurantId: id })
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
        let newReview = {
            review_desc
        }
        Restaurant.findByPk(id, { include: [ User ] })
            .then(restaurant => {
                let tempRating = ((restaurant.rating * restaurant.Users.length) + rating) / restaurant.Users.length + 1
                let newRating = {
                    rating: tempRating
                }
                return Restaurant.update(newRating, { where: { id } })
            })
            .then(() => {
                return RestaurantUser.update(newReview, { where: { restaurantId: id } })
            })
            .then(() => {
                res.redirect(`/${id}/review`)
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
                console.log('masooook')
                res.redirect(`/restaurants/${restaurantId}/review`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = RestaurantController