const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // accepting form data
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page ** MUST GO LAST, will fire if none of the above cases match
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
