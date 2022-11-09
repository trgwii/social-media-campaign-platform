//Basic Import
require("dotenv").config();
// const router = require("./src/routes/api");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const app = express();

//Security Middleware

// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// const xss = require("xss-clean");
// const hpp = require("hpp");
const cors = require("cors");


// Security Middleware Implement

app.use(cors());
app.use(helmet());
// app.use(xss());
// app.use(hpp());

// Logging Middleware
app.use(morgan("dev"))

// Body-Parser Implement

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Request Rate Limit

// const Limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 3000,
// });

// app.use(Limiter);


//Routing Implement
// app.use("/api/v1", router);

//Undefined Route

app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", message: "Not Found" });
});

module.exports = app;
