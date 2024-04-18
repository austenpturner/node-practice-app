const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();

// connect to MongoDB
const dbURI =
  "mongodb+srv://austenpt:Aptnode0907@node-practice.k2vtxon.mongodb.net/node-practice?retryWrites=true&w=majority&appName=node-practice";
mongoose
  .connect(dbURI) // async task
  .then((result) => app.listen(3000)) // listen for requests
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

// EXAMPLE MIDDLEWARE
// app.use((req, res, next) => {
//   console.log("new request made: ");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "first blog post",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "second blog post",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "third blog post",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page ** MUST GO LAST, will fire if none of the above cases match
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
