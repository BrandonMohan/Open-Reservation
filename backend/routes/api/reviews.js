const express = require("express");
const asyncHandler = require("express-async-handler");

const {Review, User, Restaurant } = require("../../db/models")

const router = express.Router();

router.get('/restaurants/:id', asyncHandler(async (req, res)=> {
    const reviews = await Review.findAll({
        where: {
            restaurantId: req.params.id
        }
    })
    const reviewObj = {}
    reviews.forEach(review => {
        reviewObj[review.id] = review
    })
    res.json(reviewObj)
}))

router.get('/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const review = await Review.findByPk(id);
    return res.json(review)
}))

router.delete('/:id', asyncHandler(async(req, res, next) => {
    const reviewId = req.params.id
    const findReview = await Review.findByPk(reviewId)
        if(findReview) {
            const review = await findReview.destroy()
            res.status(204).end()
        } else {
            next();
        }
}))

router.put('/:id', asyncHandler(async(req, res)=> {
    const id = req.params.id
    const review = await Review.findByPk(id)
    review.update(req.body)
    return res.json(review)
}))

router.post('/', asyncHandler(async(req, res) => {
    const review = await Review.create(req.body)
    res.json(review)
}))

module.exports = router;
