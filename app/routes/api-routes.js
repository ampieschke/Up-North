const router = require("express").Router();
const Item = require("../models/item.js");

router.post("/api/item", ({ body }, res) => {
  Item.create(body)
    .then((dbItem) => {
      res.json(dbItem);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/item/bulk", ({ body }, res) => {
  Item.insertMany(body)
    .then((dbItem) => {
      res.json(dbItem);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/item", (req, res) => {
  Item.find({})
    .sort({ date: -1 })
    .then((dbItem) => {
      res.json(dbItem);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/api/:id", (req, res) => {
  Item.deleteOne({
    _id: req.params.id,
  }).then(console.log("3"));
});

module.exports = router;
