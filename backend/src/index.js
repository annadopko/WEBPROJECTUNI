const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routers/main-router.js");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect("mongodb://localhost/web_uni_project")
  .then(async () => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

const app = express();

// Це якщо будеш на локалхості фронтенд мати, наприклад на реакті, щоб cors помилок не було

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//   })
// );

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
