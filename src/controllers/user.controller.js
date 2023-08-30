const httpStatus = require("http-status");
const config = require("./../config/config");
const userModel = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register =  async (req, res) => {
  const response = {
    status: httpStatus.OK,
    data: null,
    error: null,
  };
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      throw new Error("All input fields are required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      throw new Error("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await userModel.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      config.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    response.data = user;
  } catch (err) {
    console.log(err);
    response.status = httpStatus.INTERNAL_SERVER_ERROR;
    response.error = err.message;
    response.data = null;
  }
  return res.send(response);
}

const login = async (req, res) => {
  const response = {
    status: httpStatus.OK,
    data: null,
    error: null,
  };
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      throw new Error("All input is required");
    }
    // Validate if user exist in our database
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        config.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      response.data = user;
    }else{
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    response.status = httpStatus.INTERNAL_SERVER_ERROR;
    response.error = err.message;
    response.data = null;
  }

  // Our register logic ends here
  return res.send(response);
}

module.exports = {
  register,
  login
};
