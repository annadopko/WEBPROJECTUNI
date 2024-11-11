const { Router } = require("express");
const { User } = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const accessToken = jwt.sign(
      { _id: savedUser._id },
      process.env.JWT_SECRET_ACCESS_KEY,
      { expiresIn: "1h" }
    );

    res.send({ accessToken });
  } catch (error) {
    console.error("Error during registration:", error); // Логування помилки
    res.status(500).send({ message: "Registration failed. Please try again." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Bad credentials" });
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_ACCESS_KEY,
      { expiresIn: "1h" }
    );

    res.send({ accessToken });
  } catch (error) {
    console.error("Error during login:", error); // Логування помилки
    res.status(500).send({ message: "Login failed. Please try again." });
  }
});

module.exports = router;