const express = require("express");
const authMiddleware = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome admin" });
  }
);

module.exports = router;
