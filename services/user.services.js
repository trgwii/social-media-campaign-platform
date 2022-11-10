const userModel = require("../model/user.model");
const argon2 = require("argon2");
const { ReferalCode } = require("./../utils/referralCodeGenerator");

exports.createUser = async (req, res) => {
  //get users details
  const { first_name, last_name, mobile_number, password, email } = req.body;

  //get referal code
  const { refg } = req.query;

  //check required fields
  if (!(first_name && last_name && email && password))
    return res.status(422).json({
      status: "fail",
      message: `Please confirm that [ first_name, last_name and email ] are provided`,
    });

  //check user exist
  const userExist = await userModel.findOne({ email: email });

  if (userExist)
    return res.status(422).json({
      status: "fail",
      message: `The email with [ ${email} ] is already registered`,
    });

  //check if there is referal code
  //increment the competition entry for the owner of the referral code entry by 1
  const referralCodeOwner = await userModel.findOne({ referral_code: refg });
  const opt = {
    $inc: { competition_entry: 1 },
  };
  console.log(referralCodeOwner);
  if (referralCodeOwner) {
    await userModel.updateOne({ _id: referralCodeOwner._id }, opt);
  }

  //generate a new referral code for the new user
  const referalcode = ReferalCode(5);
  const hash = await argon2.hash(password);

  const user = new userModel({
    first_name,
    last_name,
    mobile_number,
    password: hash,
    email,
    referral_code: referalcode,
  });

  await user.save();

  let urlPath = req.originalUrl;

  if (urlPath.includes("?")) {
    urlPath = urlPath.slice(0, urlPath.indexOf("?"));
  }

  const signupLink = `${req.get("host")}${urlPath}?refg=${user.referral_code}`;

  res.status(201).json({ signupLink });
};
