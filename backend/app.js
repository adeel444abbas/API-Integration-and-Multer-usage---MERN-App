const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userModel = require("./models/userModel");
const app = express();
const port = 3000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middleware
app.use(express.json());
// For joining frontend and backend
app.use(cors());
// Connecting Db
mongoose.connect("mongodb://localhost:27017/usersDB");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post API
app.post("/uploadImage", upload.single("image"), (req, res) => {
  userModel.create({ name: req.body.name, image: req.file.filename });
  return res.status(200).json({
    message: "success",
    name: req.body.name,
    image: req.file.filename,
  });
});

// Get PAI
app.get("/registeredUsers", async (req, res) => {
  let data = await userModel.find();
  res.send(data);
});

// Delete Api
app.delete("/registeredUsers/:id", async (req, res) => {
  let result = await userModel.deleteOne();
  res.status(200).send("user deleted successfully");
});

app.listen(port, () => {
  console.log(`The app listening on port http://localhost:${port}`);
});
