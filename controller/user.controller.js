const userHandler = (UserService) => {
  //Register a new user
  const registerUser = (req, res) => {
    try {
      const newUser = UserService.createUser(req, res);

      return newUser;
    } catch (error) {
      console.log(error);
      // ErrorHandler(error, res)
    }
  };

  //get a user by referral Code
  const getAUserbyReferralCode = (req, res) => {
    const user = UserService.getAUserbyReferralCode(req, res);
    return user
  };

  //list all registered user
  const allUsers = (req, res) => {
    const users = UserService.allUsers(req, res);
    return users;
  };

  //Show to 10 winners
  const top10Winners = (req, res) => {
    const top10Winners = UserService.top10Winners(req, res);

    return top10Winners;
  };

  //===========   TO-DOS    ===========

  //modifies a user's profile
  const updateUserProfileById = async (req, res) => {};

  //list all registered user
  const deleteAUserById = async (req, res) => {};

  return {
    registerUser,
    getAUserbyReferralCode,
    allUsers,
    top10Winners,
    updateUserProfileById,
    deleteAUserById,
  };
};

module.exports = userHandler;
