const Joi = require("joi");
const bcrypt = require("bcrypt");
const hash = require("../../helpers/hashPassword");
const saveSession = require("../../helpers/sessionHelper")
const getLoginPage = async (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      return res.redirect("/todo");
    }
    res.render("auth/login");
  } catch (err) {
    console.log("err ", err);
  }
};
const getRegistrationPage = async (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/todo");
  }
  res.render("auth/register");
};

const registerUser = async (req, res, next) => {
  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  const validationResult = schema.validate(data, {
    abortEarly: false,
  });

  try {
    if (validationResult && validationResult.error) {
      console.log(validationResult.error);
      throw "Invalid email/password";
    }
    let oldUser = await TODO_DB.User.findOne({
      where: { email: data.email },
    });

    if (oldUser) {
      throw { message: "User with same email already exists." };
    }
    await TODO_DB.User.create({
      email: req.body.email,
      password: hash(req.body.password),
      role: "user",
    });

    // req.flash("success", "User register successfully.");
    res.redirect("/auth/login");
  } catch (err) {
    console.log("error is ", err);
    // req.flash("error", err.message);
    res.redirect("/auth/register");
  }
};
const loginUser = async (req, res, next) => {
  console.log("this is called");
  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  const validationResult = schema.validate(data, {
    abortEarly: false,
  });

  try {
    if (validationResult && validationResult.error) {
      console.log("this", validationResult.error);
      throw { message: "Invalid email/password" };
    }
    //Check User
    const user = await TODO_DB.User.findOne({
      where: { email: data.email },
    });

    if (!user || !user.email) {
      throw { message: "Invalid email/password" };
    }

    if (
      user &&
      user.password &&
      !bcrypt.compareSync(data.password, user.password)
    ) {
      throw { message: "Invalid email/password" };
    }
    // set session
    req.session.user = { id: user.id };
    await saveSession(req);
    res.redirect("/todo");
  } catch (err) {
    console.log("this is ther error", err);
    req.flash("error", err.message);
    req.session.user = null;
    res.redirect("/auth/login");
  }
};

// LOGOUT USER
const logOutUser = async function (req, res, next) {
  try {
    let sessionuser = req.session.user;
    if (sessionuser) {
      const user = {};
      req.loggedInUser = user;
    }
    // req.session.destroy();

    res.redirect("/auth/login");
  } catch (err) {
    console.log("error", err);
    // req.session.destroy();

    res.redirect("/auth/register");
  }
};

module.exports = {
  loginUser,
  logOutUser,
  getLoginPage,
  getRegistrationPage,
  registerUser,
};
