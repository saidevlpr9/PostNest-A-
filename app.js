require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const Blog = require('./models/blog')
const cookieParser = require("cookie-parser");

mongoose
  .connect("mongodb+srv://saidevlpr9:0ZTHpnTiN8BF1VC4@cluster0.tlgit.mongodb.net/POSTNEST")
  .then((e) => console.log("MongoDB Connected"));

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const path = require("path");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))
app.use(checkForAuthenticationCookie("token"));
app.get("/", async(req, res) => {
  const allBlogs = await Blog.find({})
  res.render("home", { user: req.user,blogs : allBlogs});
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started On ${PORT}`));
