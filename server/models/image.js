const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  key: { type: String, required: true },
  extension: { type: String, required: true },
  bucket: { type: String, required: true },
  region: { type: String, required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
});

module.exports = mongoose.model("Image", imageSchema);
