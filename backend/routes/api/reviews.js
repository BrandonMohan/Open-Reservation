const express = require("express");
const asyncHandler = require("express-async-handler");

const {Review, User, Restaurant } = require("../../db/models")

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    console.log(req.params.id);
    const reviews = await Review.findAll({
        where: {restaurantId: req.params.id}
    })
    res.json(reviews)
}))

module.exports = router;
