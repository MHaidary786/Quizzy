require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
require('dotenv').config(); 


// Routes
const userRoute = require("./routers/userRoutes");
const quizzRoute = require("./routers/quizRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT;


app.use(express.json());


app.use(cors({
  origin: '*',
}));



mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/user", userRoute);
app.use("/quiz", quizzRoute);

app.get("/", function (req, res) {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
