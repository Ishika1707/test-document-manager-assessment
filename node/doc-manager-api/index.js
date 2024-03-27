require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express"),
  cors = require("cors");

const fileRouter = require("./src/api/routes.js");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ==== Server status API ==== //
app.get("/api", (req, res) => {
  res.send("Server is running ...!");
});

app.use(cors(corsOptions));

// ==== CORS Policy ==== //
var whitelist = ["http://localhost:3000", "http://localhost:3001"];

var corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined) return callback(null, true);

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// ==== Defining Routes ==== //
app.use("/api", fileRouter);

// ==== Start Server on PORT 5000 ==== //
app.listen(PORT, () => console.log(`Server Started on PORT => ${PORT}`));

module.exports = app;
