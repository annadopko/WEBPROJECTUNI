const { Router } = require("express");
const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const authenticateJWT = require("../middlewares/authenticateJWT.js");

const router = Router();

router.use("/api/auth", authRouter);
router.use(authenticateJWT);
router.use("/api/user", userRouter);

module.exports = router;
