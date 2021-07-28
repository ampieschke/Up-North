const express = require("express");
const todo = require("../app/models/todo.js");
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/api/all", (req, res) => {
  todo.selectAll().then((result) => res.json(result));
});

router.put("/api/checklist/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  todo.updateOne(
    {
      done: req.body.done,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete("/api/checklist/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  todo.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
