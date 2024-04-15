const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const inventoryRoutes = require("./routes/inventory-routes");
const connectDB = require("./db/setup");

const app = express();
PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/inventory", inventoryRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
