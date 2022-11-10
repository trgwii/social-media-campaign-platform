const express = require("express");
const userRouter = express.Router();
const UserService = require("../services/user.services");

const { registerUser } = require("../controller/user.controller")(UserService);

userRouter.route("/signup").post(registerUser);

module.exports = userRouter;
