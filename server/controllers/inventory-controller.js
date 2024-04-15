const Item = require("../models/item");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error: error });
  }
};
