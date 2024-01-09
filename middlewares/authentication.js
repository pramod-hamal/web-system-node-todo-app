const authentication = async (req, res, next) => {
  try {
    // get user from session
    let user = req.session.user;
    if (!user) {
      throw { message: "Please login to continue." };
    }
    const loggedInUser = await TODO_DB.User.findOne({
      where: { id: user.id },
    });

    if(!loggedInUser) {
      throw {message: "No such user."}
    }
    req.loggedInUser = res.locals.loggedInUser = loggedInUser;
    return next();
  } catch (err) {
    // req.flash("error", err.message);
    console.log("error is ", err)
    res.redirect("/auth/login")
    // req.session.destroy();
  }
};

module.exports = authentication;
