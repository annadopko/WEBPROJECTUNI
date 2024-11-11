const Task = require("../models/Task");
const calculatePi = require("../utils/calculatePi");

exports.startTask = async (req, res) => {
    const { userId, pointsLimit, description } = req.body;
    const MAX_POINTS_LIMIT = 1e7;

    if (pointsLimit > MAX_POINTS_LIMIT) {
        return res.status(400).json({ message: "Задача перевищує допустиму трудомісткість." });
    }

    const task = new Task({ userId, description, pointsLimit, status: "in progress" });
    await task.save();

    calculatePi(task._id, pointsLimit);
    res.json({ message: "Задача запущена", taskId: task._id });
};

exports.cancelTask = async (req, res) => {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);

    if (!task || task.status !== "in progress") {
        return res.status(400).json({ message: "Задачу не знайдено або вона вже завершена." });
    }

    task.status = "cancelled";
    await task.save();
    res.json({ message: "Задача скасована" });
};

exports.getTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
        return res.status(404).json({ message: "Задачу не знайдено" });
    }

    res.json(task);
};