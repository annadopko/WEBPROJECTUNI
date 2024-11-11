const Task = require("../models/taskModel");

async function executeTask(taskId) {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Задача не знайдена");

    task.status = "in progress";
    await task.save();

    for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Імітація роботи
        task.progress = i;
        await task.save();
    }

    task.status = "completed";
    task.progress = 100;
    await task.save();
}

module.exports = { executeTask };