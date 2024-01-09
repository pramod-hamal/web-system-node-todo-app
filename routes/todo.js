const express = require("express");
const authentication = require("../middlewares/authentication");
const router = express.Router();

// router.get("/logout");
router
  .route("/")
  .get(require("../controllers/todo/todo").getToDoPage)
router
  .route("/add")
  .post(require("../controllers/todo/todo").addTodo);
router
  .route("/update/:id")
  .post(require("../controllers/todo/todo").updateTodo);
router
  .route("/delete/:id")
  .post(require("../controllers/todo/todo").deleteTodo);
module.exports = router;
