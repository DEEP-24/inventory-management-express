const Item = require("../models/item");

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
  try {
    const { name, quantity, imageUrl } = req.body;
    const newItem = new Item({ name, quantity, imageUrl });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
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
