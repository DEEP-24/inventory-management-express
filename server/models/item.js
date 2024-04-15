const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Item", itemSchema);
