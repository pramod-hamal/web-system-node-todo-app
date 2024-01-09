const express = require("express");
const router = express.Router();

// router.get("/logout");

router
  .route("/login")
  .get(require("../controllers/auth/auth").getLoginPage)
  .post(require("../controllers/auth/auth").loginUser);
router
  .route("/register")
  .get(require("../controllers/auth/auth").getRegistrationPage)
  .post(require("../controllers/auth/auth").registerUser);
module.exports = router;
