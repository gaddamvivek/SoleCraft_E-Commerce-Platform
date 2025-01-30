// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: {type: String, required: true},
  type: {type: String, required: true},
  image: { type: String }, // Optional
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
