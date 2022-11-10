const userModel = require("../model/user.model");
const { ReferalCode } = require("./../utils/referralCodeGenerator");

exports.createUser = async (req, res) => {
  //get users details
  const { first_name, last_name, mobile_number, email } = req.body;

  //get referal code
  const { refg } = req.query;

  //check required fields
  if (!(first_name && last_name && email))
    return res.status(422).json({
      status: "fail",
      message: `Please confirm that [ first_name, last_name and email ] are provided`,
    });

  try {
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

    if (referralCodeOwner) {
      await userModel.updateOne({ _id: referralCodeOwner._id }, opt);
    }

    //generate a new referral code for the new user
    const referalcode = ReferalCode(5);

    const user = new userModel({
      first_name,
      last_name,
      mobile_number,
      email,
      referral_code: referalcode,
    });

    await user.save();

    let urlPath = req.originalUrl;

    if (urlPath.includes("?")) {
      urlPath = urlPath.slice(0, urlPath.indexOf("?"));
    }

    const signupLink = `${req.get("host")}${urlPath}?refg=${
      user.referral_code
    }`;

    res.status(201).json({ signupLink });
  } catch (error) {
    console.log(error);
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("first_name last_name competition_entry referral_code");

    const usersCount = await userModel.countDocuments();

    if (usersCount < 1)
      return res.status(200).json({
        status: "success",
        message: "No registered participant yet",
      });

    res.status(200).json({
      meta_data: {
        "Total Participants": usersCount,
      },
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAUserbyReferralCode = async (req, res) => {
  try {
    const { referral_code } = req.params;

    const user = await userModel
      .findOne({ referral_code })
      .select("first_name last_name competition_entry referral_code");

    if (!user)
      return res.status(422).json({
        status: "fail",
        message: `No user with the code [ ${referral_code} ]`,
      });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.top10Winners = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .sort({ competition_entry: -1 })
      .limit(10)
      .select("first_name last_name competition_entry referral_code");

    const usersCount = await userModel.countDocuments();

    if (usersCount < 1)
      return res.status(200).json({
        status: "success",
        message: "No registered participant yet",
      });

    res.status(200).json({
      meta_data: {
        "Total Participants": usersCount,
      },
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
