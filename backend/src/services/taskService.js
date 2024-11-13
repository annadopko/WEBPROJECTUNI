const Task = require("../models/Task");

async function executeTask(taskId, pointsLimit) {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Задача не знайдена");

    task.status = "in progress";
    await task.save();

    // Імітація обчислень Монте-Карло з використанням pointsLimit
    for (let i = 0; i <= 100; i += 10) {
        // Імітуємо роботу (завдання з pointsLimit)
        await new Promise((resolve) => setTimeout(resolve, 1000)); 

        // Оновлюємо прогрес
        task.progress = i;
        task.pointsProcessed = Math.floor((i / 100) * pointsLimit); // Рахуємо, скільки точок оброблено
        await task.save();
    }

    task.status = "completed";
    task.progress = 100;
    task.pointsProcessed = pointsLimit; // Після завершення всі точки оброблені
    await task.save();
}

module.exports = { executeTask };
