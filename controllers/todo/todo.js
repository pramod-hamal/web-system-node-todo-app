const Joi = require("joi");

const getToDoPage = async (req, res, next) => {
  try {
    const todos = await TODO_DB.Todo.findAll({
      where: {
        user: req.loggedInUser.id,
      },
    });
    res.locals.todos = todos;
    res.render("todo/todo");
  } catch (err) {
    console.log("here is the error", err);
  }
};

const addTodo = async (req, res, next) => {
  const data = req.body;

  const schema = Joi.object({
    title: Joi.string().required(),
  });
  const validationResult = schema.validate(data, {
    abortEarly: false,
  });

  try {
    if (validationResult && validationResult.error) {
      console.log(validationResult.error);
      throw "Title is required.";
    }
    let created = await TODO_DB.Todo.create({
      title: data.title,
      isFinished: false,
      user: req.loggedInUser.id,
    });
    // req.flash("success", "User register successfully.");
    res.redirect("/todo");
  } catch (err) {
    console.log("here is the error", err);
    req.flash("error", err.message);
    res.redirect("/auth/register");
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    let todo = await TODO_DB.Todo.findOne({
      where: {
        id: req.params.id,
        user: req.loggedInUser.id,
      },
    });
    await todo.destroy();
    res.redirect("/todo");
  } catch (err) {
    console.log("here is the error", err);
    res.redirect("/todo");
  }
};

const updateTodo = async (req, res, next) => {
  try {
    let todo = await TODO_DB.Todo.findOne({
      where: {
        id: req.params.id,
        user: req.loggedInUser.id,
      },
    });
    todo.isFinished = !todo.isFinished;
    await todo.save();
    res.redirect("/todo");
  } catch (err) {
    console.log("here is the error", err);
    res.redirect("/todo");
  }
};

const getTodos = async (req, res, next) => {};

module.exports = {
  getToDoPage,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
};
