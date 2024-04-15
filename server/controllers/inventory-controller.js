const Item = require("../models/item");
const Image = require("../models/image");
const mongoose = require("mongoose");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error: error });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error: error });
  }
};

exports.getItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving item", error: error });
  }
};

exports.addItem = async (req, res) => {
  const { name, quantity, imageUrl, key, extension } = req.body;

  if (!name || !quantity || !imageUrl || !key || !extension) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newItem = new Item({
      name,
      quantity,
      imageUrl,
    });

    const savedItem = await newItem.save({ session });

    const newImage = new Image({
      item: savedItem._id,
      key,
      extension,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
    });

    const savedImage = await newImage.save({ session });

    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "Item and image added successfully", item: savedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to add item", error: error });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, quantity } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error: error });
  }
};
