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

  //get a user by userId
  const getAUserbyId = (req, res) => {};

  //list all registered user
  const listUsers = (req, res) => {};

  //modifies a user's profile
  const updateUserProfileById = async (req, res) => {};

  //list all registered user
  const deleteAUserById = async (req, res) => {};

  return {
    registerUser,
    getAUserbyId,
    listUsers,
    updateUserProfileById,
    deleteAUserById,
  };
};

module.exports = userHandler;
