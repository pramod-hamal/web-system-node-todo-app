const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const http = require("http");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const setLocals = require("./middlewares/setLocals");
dotenv.config();

//Initialize App with express server
const app = express();

/**
 * GLOBAL DATABASE SETTINGS
 */
global.TODO_DB = require("./database/models");
app.use(
  session({
    secret: "Secret Keys",
    resave: false,
    saveUninitialized: false,
    // rolling: true,
    store: new MySQLStore({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
    }),
  })
);
//Set ENV
// app.set("env", process.env.NODE_ENV);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(expressLayouts);
app.set("layout", "./layout/layout");

app.use("/public-assets", express.static(__dirname + "/public-assets"));

// Express body parser
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
//set flash
app.use(flash());

//Routes
app.use(setLocals);

require("./routes")(app);
app.use("*", function(req, res) {
  res.redirect("/auth/login")
})
/**
 * Start Http server.
 */
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT);
server.on("listening", function () {
  console.log(`Server is running on http://localhost:${PORT}/.`);
});
