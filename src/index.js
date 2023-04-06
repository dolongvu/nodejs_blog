const express = require("express");
const path = require("path");

const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

//HTTP logger
app.use(morgan("combined"));

//temple engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

// Views and view engine
app.set("views", path.join(__dirname, "resources/views"));

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/new", (req, res) => {
  res.render("new");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
