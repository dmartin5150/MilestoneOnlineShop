const path = require("path");

const express = require("express");

const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");

app = express();

app.set("view engine", "ejs"); //use ejs
app.set("views", path.join(__dirname, "views")); //where to find views

app.use(express.static("public"));

app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log("Error = ", error);
  });
