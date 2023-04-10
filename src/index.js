const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const SortMiddleware = require("./app/middlewares/SortMiddleware");

const app = express();

const port = 3000;

const route = require("./routes");
const db = require("./config/db");

//Connect to db
db.connect();
//use sactic folder
app.use(express.static(path.join(__dirname, "public")));

//bat du lieu submit luu vao
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

//custom middlewares
app.use(SortMiddleware);
//HTTP logger
// app.use(morgan("combined"));

//temple engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";
        const icons = {
          default: "bi bi-filter",
          asc: "bi bi-sort-down",
          desc: "bi bi-sort-down-alt",
        };
        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };
        const icon = icons[sortType];
        const type = types[sortType];
        return `<a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
          </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");

// Views and view engine
app.set("views", path.join(__dirname, "resources", "views"));

//Route init
route(app);

app.listen(port, () => {
  console.log(`App app listening on port ${port}`);
});
