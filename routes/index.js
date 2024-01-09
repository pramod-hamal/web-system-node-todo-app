const authentication = require("../middlewares/authentication.js");

module.exports = function (app) { 
  
  app.use("/auth", require("./authentication.js"));
  app.use("/todo",authentication, require("./todo.js"))
  app.use("/logout", function(req, res) {
    req.session.destroy(function(err) {

      res.redirect("/auth/login")
    });
  })
};
 