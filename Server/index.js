const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const pRoute = require("./routes/posts");
const cRoute = require("./routes/conversations");
const mRoute = require("./routes/messages");
const app = express();
const multer = require("multer");
const path = require("path");

dotenv.config();
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected with db");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/", (req, res) => {
  res.send("hey");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//MiddleWares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uplaoded");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", pRoute);
app.use("/api/conversations", cRoute);
app.use("/api/messages", mRoute);

app.listen(5000, () => {
  console.log("server started");
});
