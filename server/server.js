require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const socketIo = require('socket.io');

// Routes
const userRoute = require("./routers/userRoutes")
const quizzRoute = require("./routers/quizRoutes")



const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5000;



mongoose.connect("mongodb+srv://oula:94yrEyVqKA0V1k3g@firstcluster.woitwky.mongodb.net/quizapp")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));




app.use("/user", userRoute)
app.use("/quizz", quizzRoute)


app.get('/', function (req, res) {
  res.send('Hello World')
})











server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
