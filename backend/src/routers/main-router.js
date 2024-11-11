// src/routers/main-router.js
const { Router } = require("express");
const authRouter = require("./auth.js");
const userRouter = require("./user.js");
const authenticateJWT = require("../middlewares/authenticateJWT.js");
const taskLimiter = require("../middlewares/taskLimiter.js");

const router = Router();

router.use("/api/auth", authRouter);
router.use(authenticateJWT); // Перевірка автентифікації
router.use(taskLimiter); // Перевірка обмеження одночасних задач
router.use("/api/user", userRouter); // Підключення маршруту

module.exports = router;
