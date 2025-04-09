const express = require("express");
const mongoose = require("mongoose");
const ejsEngine = require('ejs-mate'),
const app = express();
const port = 3000;
const path = require("path");
const campGround = require("./models/campGround.js");
const methodOverride = require("method-override");
mongoose.connect("mongodb://127.0.0.1:27017/campGroundDB");

app.engine('ejs', ejsEngine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/campgrounds", async (req, res) => {
  const campGrounds = await campGround.find({});
  res.render("campgrounds/index", { campGrounds });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
  const campGroundNew = new campGround(req.body.campground);
  await campGroundNew.save();
  res.redirect(`/campgrounds/${campGroundNew._id}`);
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campGroundEdit = await campGround.findById(id);
  res.render("campgrounds/edit", { campGroundEdit });
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campGroundEditPut = await campGround.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campGroundEditPut._id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await campGround.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campGroundShow = await campGround.findById(id);
  res.render("campgrounds/show", { campGroundShow });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
