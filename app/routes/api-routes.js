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

router.put("/api/pack/:id", (req, res) => {
  Item.updateOne({ _id: req.params.id }, { $set: { done: true } })
    .then(console.log("Packed!"))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/unpack/:id", (req, res) => {
  Item.updateOne(
    {
      _id: req.params.id,
    },
    { $set: { done: false } }
  )
    .then(console.log("unPacked!"))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/unpack", (req, res) => {
  Item.updateMany({}, { $set: { done: false } })
    .then(console.log("unPacked it all!"))
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
  })
    .then(console.log("DELETED!"))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
