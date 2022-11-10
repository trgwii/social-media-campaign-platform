const express = require("express");
const userRouter = express.Router();
const UserService = require("../services/user.services");

const { registerUser, top10Winners, allUsers, getAUserbyReferralCode } =
  require("../controller/user.controller")(UserService);

userRouter.route("/signup").post(registerUser);
userRouter.route("/participants").get(allUsers);
userRouter.route("/winners").get(top10Winners);
userRouter.route("/participants/:referral_code").get(getAUserbyReferralCode);


module.exports = userRouter;
