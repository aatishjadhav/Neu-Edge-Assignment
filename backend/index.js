const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

initializeDatabase();
const PORT = process.env.PORT || 4000;

const productRoutes = require("./routes/product.routes");

app.use("/api/products", productRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
