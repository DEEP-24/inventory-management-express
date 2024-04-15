const express = require("express");
const { getAllItems, addItem } = require("../controllers/inventory-controller");
const { deleteItem } = require("../controllers/inventory-controller");
const router = express.Router();

router.get("/getAllItems", getAllItems);

router.post("/deleteItem/:id", deleteItem);

router.post("/addItem", addItem);

module.exports = router;
