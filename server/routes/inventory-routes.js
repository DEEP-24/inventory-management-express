const express = require("express");
const { getAllItems } = require("../controllers/inventory-controller");
const { deleteItem } = require("../controllers/inventory-controller");
const router = express.Router();

router.get("/getAllItems", getAllItems);

router.post("/deleteItem/:id", deleteItem);

module.exports = router;
