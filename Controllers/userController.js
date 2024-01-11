const jwt = require("jsonwebtoken");
const db = require("../Models/dbModel");
let { sendRegistrationEmail } = require('./nodeMailer');
let User = db.users;
const SECRET_KEY = "vaibhav"; // Change this to your secret key

let responseFormate = {
  status: 400,
  message: "invalid data",
  error: [],
  data: [],
};

// validate registration form

let validateCredentials = (e) => {
  //message
  responseFormate.error = [];
  responseFormate.data = [];
  if (e.errors) {
    let isChecked = false;
    e.errors.forEach((error) => {
      // console.log(error.path);

      const emailAttribute = User.rawAttributes.email;
      // console.log(emailAttribute);

      if (!isChecked) {
        if (emailAttribute.unique && error.validatorKey === 'not_unique') {
          responseFormate.error.push({
            field: 'Email',
            message: emailAttribute.unique.msg,
          });
          isChecked = true;
        }
      }
      if (error.validatorKey === "isEmail") {
        responseFormate.error.push({
          field: error.path,
          messege: error.message,
        });
      }

      if (error.validatorKey === "notEmpty") {
        responseFormate.error.push({
          field: error.path,
          message: error.message,
        });
      }

      if (error.validatorKey === "isStrongPassword") {
        responseFormate.error.push({
          field: error.path,
          message: error.message,
        });
      }
     
    });
  }
  // console.log(e.errors);
  return responseFormate;
};

//for rendering registration form
let renderForm = async (req, res) => {
  res.render("register");
};

//for rendering login form
let loginForm = async (req, res) => {
  res.render("login");
};

const register = async (req, res) => {
  const data = { ...req.body };

  try {
    const user = await User.create(data);

    //sending mail with node mailer
    sendRegistrationEmail(user.name, user.email);


    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "User registered successfully.",

      // token : token,
      Data: [
        {
          id: user.id,
          name: user.name,
          email: user.email,
          // ...user
        },
      ],
    });
  } catch (err) {
    res.status(400).json(validateCredentials(err));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      //   return res.status(401).send('Invalid username or password');
      throw new Error("Incorrect Email/Password");
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY); //
    res.status(200).json({
      responseCode: 200,
      responseStatus: "Success",
      message: "Logged in Successfully",
      response: {
        token: token,
        data: [
          {
            ID: user.id,
            Email: email,
            Name: user.name,
          },
        ],
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      responseCode: 500,
      responseStatus: "Server Error",
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  renderForm,
  loginForm,
};
