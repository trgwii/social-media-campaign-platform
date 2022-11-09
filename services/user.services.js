const userModel = require("../model/user.model");
const argon2 = require("argon2");
const { ReferalCode } = require("./../utils/referralCodeGenerator");

console.log(ReferalCode(5));

const createUser = async (user, referal) => {
  const { first_name, last_name, mobile_number, password, email } = user;
  const { referal_code } = referal;

  if (!(first_name && last_name && email))
    return res.status(422).json({
      status: "fail",
      message: `Please confirm that [ first_name, last_name and email ] are provided`,
    });

  const userExist = await userModel.findOne({ email: email });

  if (userExist)
    return res.status(422).json({
      status: "fail",
      message: `The email with [ ${email} ] is already registered`,
    });

    //check if there is referal code

    //increment the owner of the referral code entry by 1

    //generate a new referral code for the new user

  const hash = await argon2.hash(password);

  const user = new userModel({
    first_name,
    last_name,
    mobile_number,
    password: hash,
    email,
    referral_code,
  });

   await user.save()

   return user
};
