const userModel = require("../model/user.model");

//Generate Referral code
exports.ReferalCode = (length) => {
  let result = "";
  let characters = "abcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//================= TO-DO ==================

//Check if referral code exist
//if it exist, generate another one

// const referalcode = ReferalCode(5);

// const checkReferralCodeExist = (code) => {

// const referalcodeExist = userModel.findOne({ referral_code: code });

// };


// if (referalcodeExist) {
//   referalcode = ReferalCode(5);
// }
