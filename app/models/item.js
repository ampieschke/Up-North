const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for pack item",
  },
  done: {
    type: Boolean,
    default: false,
  },
  temp: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
