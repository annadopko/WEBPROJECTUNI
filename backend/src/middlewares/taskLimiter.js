const Task = require('../models/taskModel'); // Змініть на відповідну модель, якщо потрібно

const MAX_CONCURRENT_TASKS = 5; // Максимальна кількість одночасних задач

const taskLimiter = async (req, res, next) => {
    const userId = req.data._id; // ID користувача з даних токена (налаштованого middleware authenticateJWT)

    try {
        // Підрахунок активних задач користувача
        const activeTasksCount = await Task.countDocuments({ userId, status: { $in: ['pending', 'in progress'] } });

        if (activeTasksCount >= MAX_CONCURRENT_TASKS) {
            return res.status(429).json({ message: 'Ви перевищили максимальну кількість одночасних задач.' });
        }

        next(); // Продовжити обробку запиту, якщо ліміт не перевищено
    } catch (error) {
        console.error('Помилка при перевірці задач:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

module.exports = taskLimiter; 