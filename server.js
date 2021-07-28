const express = require("express");
// const mysql = require("mysql");

const app = express();

app.use(express.static("app/public"));

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./controllers/checklist_controller.js");

require("./app/routes/api-routes.js")(app);

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);
