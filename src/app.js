const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes = require("./routes/user.routes")


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "20kb", extended: true}));
app.use(cookieParser());
app.use(express.static("public"))

// routes
app.use("/api/v1/users", userRoutes)


module.exports = app;