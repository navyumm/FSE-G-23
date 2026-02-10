const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "20kb", extended: true}));
app.use(cookieParser());
app.use(express.static("public"))



module.exports = app;