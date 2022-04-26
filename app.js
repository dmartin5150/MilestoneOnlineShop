const path = require("path");

const express = require("express");
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require("./data/database");

const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddlware = require('./middlewares/error-handlers');
const authRoutes = require("./routes/auth.routes");

app = express();

app.set("view engine", "ejs"); //use ejs
app.set("views", path.join(__dirname, "views")); //where to find views

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());

app.use(addCsrfTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddlware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log("Error = ", error);
  });
