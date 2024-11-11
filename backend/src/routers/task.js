const { Router } = require("express");
const taskController = require("../controllers/taskController");

const router = Router();

router.post("/start", taskController.startTask);
router.post("/cancel", taskController.cancelTask);
router.get("/:taskId/progress", taskController.getTaskStatus);

module.exports = router;