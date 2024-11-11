const Task = require("../models/Task");

async function calculatePi(taskId, pointsLimit) {
    let insideCircle = 0;
    const INTERVAL = Math.floor(pointsLimit / 100);

    for (let i = 1; i <= pointsLimit; i++) {
        const x = Math.random();
        const y = Math.random();

        if (x * x + y * y <= 1) {
            insideCircle++;
        }

        if (i % INTERVAL === 0) {
            const task = await Task.findById(taskId);
            if (!task || task.status === "cancelled") return;

            task.progress = (i / pointsLimit) * 100;
            await task.save();
        }
    }

    const task = await Task.findById(taskId);
    if (task && task.status === "in progress") {
        task.status = "completed";
        task.result = (4 * insideCircle) / pointsLimit;
        await task.save();
    }
}

module.exports = calculatePi;