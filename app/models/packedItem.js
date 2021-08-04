const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackedItemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for pack item",
  },
  done: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PackedItem = mongoose.model("PackedItem", PackedItemSchema);

module.exports = PackedItem;
