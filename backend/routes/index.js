// All routes live in this folder 
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    const token = req.csrfToken();
    res.cookie("XSRF-TOKEN", token);
    res.sendStatus(200);
  });
}


module.exports = router;
