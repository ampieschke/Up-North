const Todo = require("../models/todo.js");

// Routes
module.exports = (app) => {
  // Search for Specific Character (or all characters) then provides JSON
  app.get("/api/:todos?", (req, res) => {
    if (req.params.todos) {
      // Display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      Todo.findOne({
        where: {
          routeName: req.params.todos,
        },
      }).then((result) => res.json(result));
    } else {
      Todo.selectAll().then((result) => res.json(result));
    }
  });

  app.post("/api/checklist", (req, res) => {
    todo.insertOne(["todo_name", "done"], [req.body.todo, 0], (result) => {
      res.json({ id: result.insertId });
    });
  });
};
