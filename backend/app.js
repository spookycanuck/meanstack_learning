const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts")

const app = express();

mongoose
  .connect(
    "mongodb://test:testpassword123@meanstack-shard-00-00.ej768.mongodb.net:27017,meanstack-shard-00-01.ej768.mongodb.net:27017,meanstack-shard-00-02.ej768.mongodb.net:27017/meanstack?ssl=true&replicaSet=atlas-erm6yf-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!\n" + err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);


module.exports = app;
