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
    origin: ["http://localhost:3000", " http://192.168.1.152:8000"],  // Дозволяємо обидва origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true  // Дозволяємо креденшали для всіх запитів
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
