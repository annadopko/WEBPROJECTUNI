const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routers/main-router.js");
const taskRoutes = require("./routers/task");  // Додаємо маршрути для задач
const cors = require("cors");  // Імпортуємо CORS
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect("mongodb://localhost/web_uni_project")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

const app = express();

// Налаштовуємо CORS, дозволяємо запити тільки з localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",  // фронтенд працює на порту 3000
    methods: ["GET", "POST"],         // дозволяємо лише GET та POST запити
    allowedHeaders: ["Content-Type", "Authorization"],  // Дозволяємо заголовки
  })
);

app.use(express.json());  // Налаштовуємо парсинг JSON

// Використовуємо маршрути для основних функцій та задач
app.use(routes);  // Використовуємо основні маршрути
app.use("/api/task", taskRoutes);  // Додаємо маршрути для задач

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
