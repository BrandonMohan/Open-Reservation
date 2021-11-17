const express = require("express");
const asyncHandler = require("express-async-handler");

const {Review, User, Restaurant } = require("../../db/models")

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const reviews = await Review.findAll({
        Where: { restaurantId: req.params.id}
    })
    return res.json(reviews)
}))

module.exports = router;
