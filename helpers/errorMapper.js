module.exports = function (req, errors) {
    console.log("errorssss", errors);
    if (!errors) {
      return;
    }
    if (errors && errors.length < 0) {
      return;
    }
    console.log("errors", errors);
    errors.forEach(function (msgObj) {
      // req.flash("error", msgObj.message);
    });
  };
  