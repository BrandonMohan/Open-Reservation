const express = require("express");
const asyncHandler = require("express-async-handler");

const {Reservation, User} = require("../../db/models")

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const reservations = await Reservation.findAll({
        include: User
    })
    return res.json(reservations)
}))

router.get('/:restaurantId', asyncHandler(async(req, res) => {

    const reservations = await Reservation.findAll({
        where: {restaurantId: req.params.id}
    })
    return res.json(reservations)
}))

module.exports = router;
