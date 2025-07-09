const express = require("express");
const router = express.Router();

const { generateProducts, getProducts, reduceAllStocks, increaseEvenStocks } = require("../controllers/product.controller");

router.post("/generate", generateProducts);
router.get("/", getProducts);
router.put("/decrease", reduceAllStocks);
router.put("/increase-even", increaseEvenStocks);

module.exports = router;