const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const reviewsRouter = require("./reviews.js");
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");
const restaurantsRouter = require("./restaurants")

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/restaurants", restaurantsRouter);


router.use("/reviews", reviewsRouter);



router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});


router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});
// Gets back cookie

// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: "Demo-lition",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );
// // Test route

// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });
// Test2 route

module.exports = router;
