var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

var entries = [];
app.locals.entries = entries;
//Logging requests with Morgan
app.use(logger("dev"));
// Setting view engine to EJS
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
//Populates req.body if the user is submitting a form
app.use(bodyParser.urlencoded({ extended: false }));

//Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

app.post("/new-entry", (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: req.body.title,
    body: req.body.body,
    published: new Date()
  });
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).render("404");
});

http.createServer(app).listen(3000, () => {
  console.log("Diary application started.");
});
