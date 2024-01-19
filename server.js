const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db");
  })
  .catch((err) => {
    console.log("Failed to sync db:" + err.message);
  });

var corsOptions = {
  origin: "https://localhost:8081",
};
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db");
// });
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});
require("./app/routes/tutorial.routes.js")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
