const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require('socket.io');
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes")

const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "20kb", extended: true}));
app.use(cookieParser());
app.use(express.static("public"))

app.get("/", (req, res)=> {
    res.sendFile("../public/index.html")
})


io.on('connection', (socket) => {
//   console.log('a user connected');


socket.on("chat message", (msg)=> {
    console.log("message : ", `${socket.id} : ${msg}`);

    io.emit("chat message", `${socket.id} : ${msg}`)
    
})

// socket.on("myMessage", (msg) => {
//     console.log("message :", msg);

//     // io.emit("mfrombackend", "hehhehehhehhhe")
    
// })


});

// routes
app.use("/api/v1/users", userRoutes)


module.exports = server;