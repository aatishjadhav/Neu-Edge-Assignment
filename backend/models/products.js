const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: { type: String},
  stockOnHand: { type: Number, default: 0 },
  itemNumber: { type: Number },
});

const ProductModel = mongoose.model("Neuproducts", ProductSchema);
module.exports = { ProductModel };
