const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const {singleMulterUpload} = require("../../awsS3")
const {singlePublicFileUpload} = require("../../awsS3")
const { Restaurant, User } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.findAll();
    return res.json(restaurants);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    return res.json(restaurant);
  })
);

// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const restaurant = await Restaurant.create(req.body);
//     res.json(restaurant);
//   })
// );

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    restaurant.update(req.body);
    return res.json(restaurant);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.id;
    const findRestaurant = await Restaurant.findByPk(restaurantId);
    if (findRestaurant) {
      const restaurant = await findRestaurant.destroy();
      res.status(204).end();
    } else {
      next();
    }
  })
);

router.put(
  "/search/all",
  asyncHandler(async function (req, res) {
    const  search  = req.body.input;
    let restaurants;
    let searchResult = false;
    if (search !== undefined) {
      restaurants = await Restaurant.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
      });
      if (restaurants.length > 0) {
        searchResult = true;
      }
    } else {
      searchResult = false;
      restaurants = await Restaurant.findAll();
    }
    return res.json(restaurants);
  })
);


router.post(
    "/",
    singleMulterUpload("logo"),
    asyncHandler(async (req, res) => {
      const { address, city, state, name, ownerId } = req.body;
      const logo = await singlePublicFileUpload(req.file);
      const restaurant = await Restaurant.create({
        address,
        city,
        state,
        name,
        logo,
        ownerId
      });

      return res.json({
        restaurant,
      });
    })
  );


module.exports = router;
