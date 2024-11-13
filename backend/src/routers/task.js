const express = require("express");
const router = express.Router();
const taskService = require("../services/taskService");

router.post("/", async (req, res) => {
    const { description, pointsLimit } = req.body; // Отримуємо pointsLimit
    const task = new Task({ description, pointsLimit, status: "pending", progress: 0 });

    try {
        await task.save();
        taskService.executeTask(task._id, pointsLimit);  // Передаємо pointsLimit у taskService
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error starting task" });
    }
});

module.exports = router;
