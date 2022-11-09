const userHandler = (userModel) => {
  //Registers a new user
  const registerUser = (req, res) => {
    try {
      const newUser  = userService.createUser(req.body, req.query)

      res.json({newUser})
      
    } catch (error) {
      ErrorHandler(error, res)
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
