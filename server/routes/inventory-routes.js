const express = require("express");
const {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  getItem,
} = require("../controllers/inventory-controller");
const router = express.Router();

router.get("/getAllItems", getAllItems);

router.post("/deleteItem/:id", deleteItem);

router.post("/addItem", addItem);

router.get("/getItem/:id", getItem);

router.put("/updateItem/:id", updateItem);

module.exports = router;
