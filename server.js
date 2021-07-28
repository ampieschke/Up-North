const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/checklist", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

require("./app/routes/api-routes.js")(app);

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);
