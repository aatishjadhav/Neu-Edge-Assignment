const { ProductModel } = require("../models/products");

const generateProducts = async (req, res) => {
  try {
    await ProductModel.deleteMany();
    const products = [];
    for (let i = 1; i <= 50; i++) {
      const name = `Item ${i}`;
      const stock = Math.floor(Math.random() * 31) + 20;
      products.push({ productName: name, stockOnHand: stock, itemNumber: i });
    }

    await ProductModel.insertMany(products);
    res.status(201).json({ message: "Products created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "productName",
    order = "asc",
  } = req.query;
  const sortOrder = order === "asc" ? 1 : -1;

  try {
    const products = await ProductModel.find()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await ProductModel.countDocuments();
    res.json({ products, totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const reduceAllStocks = async (req, res) => {
  try {
    await ProductModel.updateMany({}, { $inc: { stockOnHand: -2 } });
    res.json({ message: "Stock decreased by 2" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const increaseEvenStocks = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();

    for (let product of allProducts) {
      const parts = product.productName.split(" ");
      const number = parseInt(parts[1]);

      if (number % 2 === 0) {
        await ProductModel.updateOne(
          { _id: product._id },
          { $inc: { stockOnHand: 2 } }
        );
      }
    }

    res.json({ message: "Stock increased by 2 for even-numbered items." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateProducts,
  getProducts,
  reduceAllStocks,
  increaseEvenStocks,
};
