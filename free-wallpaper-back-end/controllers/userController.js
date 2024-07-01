const { UserService } = require("../services");

const signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(422).json({
        status: res.statusCode,
        message: "Missing parameter(s)",
      });
    } else {
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: res.statusCode,
          message: "Invalid confirm password",
        });
      } else {
        const serviceResponse = await UserService.signUpService(req.body);
        return res.status(serviceResponse.status).json(serviceResponse);
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: "Internal Server Error",
    });
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(422).json({
        status: res.statusCode,
        message: "Missing input(s)",
      });
    } else {
      const serviceResponse = await UserService.signInService(req.body);
      res.cookie("jwt", serviceResponse.token, { httpOnly: true, maxAge: 60 * 1000 * 60 * 24 });
      return res.status(200).json(serviceResponse);
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: "Internal Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      status: res.statusCode,
      message: "Logged out!",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: "Internal Server Error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const serviceResponse = await UserService.getAllUsersService();
    return res.status(serviceResponse.status).json(serviceResponse.data);
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: "Internal Server Error",
    });
  }
};

const blockUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const isActive = req.body.isActive;

    const serviceResponse = await UserService.blockUserService(userId, isActive);
    return res.status(serviceResponse.status).json(serviceResponse);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  signUp,
  signIn,
  logout,
  getAllUsers,
  blockUser,
};
