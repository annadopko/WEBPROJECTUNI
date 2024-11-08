const { Router } = require("express");
const { User } = require("../models/User.js");

const router = Router();

router.get("/", async (req, res) => {
  return res.status(200).send(await User.find());
});

module.exports = router;
