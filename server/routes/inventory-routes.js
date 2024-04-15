const express = require("express");
const { getAllItems } = require("../controllers/inventory-controller");
const router = express.Router();

router.get("/getAllItems", getAllItems);

module.exports = router;
