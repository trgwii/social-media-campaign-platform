//Basic Import
require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const app = express();

//Security Middleware
const helmet = require("helmet");
const cors = require("cors");


// Security Middleware Implement
app.use(cors());
app.use(helmet());

// Logging Middleware
app.use(morgan("dev"))

// Body-Parser Implement
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routing Implement
app.use("/api/v1", require('./route/user.route'));

//Undefined Route
app.use((req, res) => {
  res.status(404).json({ status: "failed", message: "Not Found" });
});

module.exports = app;
