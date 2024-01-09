module.exports = function (req, res, next) {
  //set flash
  res.locals.flash = {
    error: req.flash("error"),
    success: req.flash("success"),
  };
  return next();
};